'use client';
import { useCallback } from 'react';
import sweetAlertUtil from '@/utils/common/sweet-alert-util';
import { useCardSave } from '@/hooks/mutations/use-card-save';
import { useEditorStore } from '@/store/editor.store';
import { checkSlugExists } from '@/apis/check-slug-exists';
import { useStageRefStore } from '@/store/editor.stage.store';
import { ROUTES } from '@/constants/path.constant';
import { useRouter, useSearchParams } from 'next/navigation';
import { validateSlug } from '@/utils/editor/save/validate-slug';
import { resetEditorState } from '@/utils/editor/editor-reset-state';
import { createCardInsertPayload } from '@/utils/editor/save/create-card-insert-payload';
import { getStageImageUrls } from '@/utils/editor/save/get-state-image-url';
import { User } from '@supabase/supabase-js';
import { createCardUpdatePayload } from '@/utils/editor/save/create-card-update-payload';
import { useCardUpdate } from '@/hooks/mutations/use-card-update';
import { useQueryClient } from '@tanstack/react-query';

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
        await sweetAlertUtil.error(
          '캔버스 오류',
          '캔버스가 준비되지 않았습니다.'
        );
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
                queryKey: ['card', cardId],
              });
              sweetAlertUtil.success('수정 성공', '명함이 수정되었습니다.');
              resetEditorState();
              router.refresh();
              router.push(ROUTES.DASHBOARD.MYCARDS);
            },
            onError: (e) => {
              sweetAlertUtil.error('수정 실패', e.message);
            },
          }
        );
      } else {
        // — 신규 저장 —
        const payload = createCardInsertPayload(userId, lastSlug, urls);
        insertCard(payload, {
          onSuccess: () => {
            sweetAlertUtil.success(
              '저장 성공',
              '명함이 성공적으로 저장되었습니다.'
            );
            resetEditorState();
            router.push(ROUTES.DASHBOARD.MYCARDS);
          },
          onError: async (e) => {
            const isDup = e.message?.includes('duplicate key value');
            if (isDup) {
              await sweetAlertUtil.error(
                '이미 사용 중인 주소입니다.',
                '다른 주소를 입력해주세요.'
              );
              const newSlug = await checkSlug();
              if (newSlug) doSave(userId, newSlug);
            } else {
              await sweetAlertUtil.error(
                '저장 실패',
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
      if (!cardId)
        try {
          const exists = await checkSlugExists(lastSlug);
          if (exists) {
            await sweetAlertUtil.error(
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
          await sweetAlertUtil.error('알 수 없는 오류가 발생했습니다.');
          return;
        }

      doSave(user.id, lastSlug);
    },
    [slug, cardId, checkSlug, doSave]
  );

  return { handleSave, isPending: isInserting || isUpdating };
};
