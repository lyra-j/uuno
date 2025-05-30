'use client';
import { useCallback } from 'react';
import { useCardSave } from '@/hooks/mutations/use-card-save';
import { useEditorStore } from '@/store/editor.store';
import { checkSlugExists } from '@/apis/check-slug-exists';
import { useStageRefStore } from '@/store/editor.stage.store';
import { ROUTES } from '@/constants/path.constant';
import { useRouter, useSearchParams } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import { useCardUpdate } from '@/hooks/mutations/use-card-update';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-key';
import { validateSlug } from '@/utils/editor/save/validate-slug';
import { resetEditorState } from '@/utils/editor/editor-reset-state';
import { createCardInsertPayload } from '@/utils/editor/save/create-card-insert-payload';
import { getStageImageUrls } from '@/utils/editor/save/get-state-image-url';
import { createCardUpdatePayload } from '@/utils/editor/save/create-card-update-payload';
import { getCardCount } from '@/apis/card-interaction';
import { MAX_CARDS_PER_USER } from '@/constants/editor.constant';
import { toastError, toastSuccess, toastWarning } from '@/lib/toast-util';

export const useSluggedSaveCard = () => {
  const queryClient = useQueryClient();
  const params = useSearchParams();
  const cardId = params.get('cardId') || '';
  const router = useRouter();
  const { mutate: insertCard, isPending: isInserting } = useCardSave();
  const { mutate: updateCard, isPending: isUpdating } = useCardUpdate();

  const slug = useEditorStore((state) => state.slug);
  const setSlug = useEditorStore((state) => state.setSlug);
  const setCanvasFront = useEditorStore((state) => state.setCanvasFront);
  const stageRef = useStageRefStore((state) => state.stageRef);
  const setSelectedElementId = useEditorStore(
    (state) => state.setSelectedElementId
  );
  const setEditingElementId = useEditorStore(
    (state) => state.setEditingElementId
  );

  const checkSlug = useCallback(() => validateSlug(setSlug), [setSlug]);

  /**
   *  저장 실행 함수
   */
  const doSave = useCallback(
    async (userId: string, lastSlug: string) => {
      const stage = stageRef?.current;
      if (!stage) {
        toastError('캔버스가 준비되지 않았습니다.');
        return;
      }
      // 편집 모드 해제
      setSelectedElementId(null);
      setEditingElementId(null);

      // 이미지 업로드하고 URL 받기
      const urls = await getStageImageUrls(
        stage,
        userId,
        lastSlug,
        setCanvasFront
      );

      if (cardId) {
        // — 수정 저장 —
        const payload = createCardUpdatePayload(lastSlug, urls);
        updateCard(
          { id: cardId, payload },
          {
            onSuccess: () => {
              queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.CARD, cardId],
              }),
                // 리스트도 무효화 필요
                queryClient.invalidateQueries({
                  queryKey: [QUERY_KEY.CARD_LIST, userId],
                }),
                // 상세페이지 제목 무효화
                queryClient.invalidateQueries({
                  queryKey: [QUERY_KEY.CARD_SELECT_LIST, userId],
                }),
                toastSuccess('명함이 수정되었습니다.');
              resetEditorState();
              router.refresh();
              router.push(ROUTES.DASHBOARD.MYCARDS);
            },
            onError: (e) => {
              toastError('수정에 실패했습니다', e.message);
            },
          }
        );
      } else {
        // — 신규 저장 —
        const payload = createCardInsertPayload(userId, lastSlug, urls);
        insertCard(payload, {
          onSuccess: () => {
            toastSuccess('명함이 성공적으로 저장되었습니다.');
            resetEditorState();
            router.push(ROUTES.DASHBOARD.MYCARDS);
          },
          onError: async (e) => {
            const isDup = e.message?.includes('duplicate key value');
            if (isDup) {
              toastWarning(
                '이미 사용 중인 주소입니다.',
                '다른 주소를 입력해주세요.'
              );
              const newSlug = await checkSlug();
              if (newSlug) doSave(userId, newSlug);
            } else {
              toastError(
                '저장에 실패했습니다.',
                e.message || '알 수 없는 오류'
              );
            }
          },
        });
      }
    },
    [
      cardId,
      insertCard,
      updateCard,
      checkSlug,
      stageRef,
      setCanvasFront,
      setSelectedElementId,
      setEditingElementId,
      router,
    ]
  );

  /**
   * 최종 저장 트리거 (슬러그/로그인 체크 포함)
   */
  const handleSave = useCallback(
    async (user: User) => {
      let lastSlug: string | null = slug?.trim() || '';
      if (!lastSlug && !cardId) {
        lastSlug = await checkSlug();
      }
      if (!lastSlug) return;

      //처음 명함 생성할 때
      if (!cardId) {
        //명함 3개 인지 확인
        try {
          const cardCount = await getCardCount(user.id);
          if (cardCount >= MAX_CARDS_PER_USER) {
            toastWarning(
              '명함 생성 제한',
              `최대 ${MAX_CARDS_PER_USER}개의 명함만 생성할 수 있습니다.`
            );
            return;
          }
        } catch {
          toastError('오류 발생', '명함 개수 확인 중 오류가 발생했습니다.');
          return;
        }
        //주소 확인
        try {
          const exists = await checkSlugExists(lastSlug);
          if (exists) {
            toastError(
              '이미 사용 중인 주소입니다.',
              '다른 주소를 입력해주세요.'
            );
            const newSlug = await checkSlug();
            if (newSlug) {
              doSave(user.id, newSlug);
            }
            return;
          }
        } catch {
          toastError('알 수 없는 오류', '잠시 후 다시 시도해주세요.');
          return;
        }
      }

      doSave(user.id, lastSlug);
    },
    [slug, cardId, checkSlug, doSave]
  );

  return { handleSave, isPending: isInserting || isUpdating };
};
