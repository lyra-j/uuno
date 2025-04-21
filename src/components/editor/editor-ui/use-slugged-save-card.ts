'use client';
import { useCallback } from 'react';
import sweetAlertUtil from '@/utils/common/sweet-alert-util';
import { createClient } from '@/utils/supabase/client';
import { useCardSave } from '@/hooks/mutations/use-card-save';
import { useEditorStore } from '@/store/editor.store';
import { sideBarStore } from '@/store/editor.sidebar.store';
import { Json, TablesInsert } from '@/types/supabase';
import { checkSlugExists } from '@/apis/check-slug-exists';
import { uploadStageImage } from '@/utils/editor/editor-upload-stage-image';
import { useStageRefStore } from '@/store/editor.stage.store';
import { ROUTES } from '@/constants/path.constant';
import { useRouter } from 'next/navigation';
import { validateSlug } from '@/utils/editor/validate-slug';

export const useSluggedSaveCard = () => {
  const router = useRouter();
  const { mutate: saveCard, isPending } = useCardSave();
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
   * DB에 저장
   */
  const doSave = useCallback(
    async (userId: string, lastSlug: string) => {
      if (!stageRef?.current) {
        await sweetAlertUtil.error(
          '캔버스 오류',
          '캔버스가 준비되지 않았습니다.'
        );
        return;
      }

      //이미지 저장 전 선택 해제
      setSelectedElementId(null);
      setEditingElementId(null);

      const originalSide = useEditorStore.getState().isCanvasFront;
      const urls: Record<'front' | 'back', string> = { front: '', back: '' };

      // 앞면 저장 후 뒷면 저장
      for (const side of ['front', 'back'] as const) {
        setCanvasFront(side === 'front');
        await new Promise((res) => setTimeout(res, 0));
        urls[side] = await uploadStageImage(
          stageRef.current!,
          userId,
          lastSlug,
          side
        );
      }
      // 원래 상태로 복원
      setCanvasFront(originalSide);

      const {
        title,
        canvasElements,
        canvasBackElements,
        backgroundColor,
        backgroundColorBack,
      } = useEditorStore.getState();
      const isHorizontal = sideBarStore.getState().isHorizontal;

      const card: TablesInsert<'cards'> = {
        user_id: userId,
        title: title || '제목 없음',
        template_id: null,
        status: 'draft',
        content: {
          backgroundColor,
          canvasElements,
          canvasBackElements,
          backgroundColorBack,
        } as unknown as Json,
        slug: lastSlug,
        frontImgURL: urls.front,
        backImgURL: urls.back,
        isHorizontal,
      };

      saveCard(card, {
        onSuccess: () => {
          sweetAlertUtil.success(
            '저장 성공',
            '명함이 성공적으로 저장되었습니다.'
          );
          router.push(ROUTES.HOME);
        },
        onError: async (e) => {
          const isDup = e.message.includes(
            'duplicate key value violates unique constraint'
          );
          if (isDup) {
            await sweetAlertUtil.error(
              '저장 실패',
              '이미 사용 중인 주소입니다. 다른 주소를 입력해주세요.'
            );
            const newSlug = await checkSlug();
            if (newSlug) {
              doSave(userId, newSlug);
            }
          } else {
            await sweetAlertUtil.error(
              '저장 실패',
              e.message || '알 수 없는 오류가 발생했습니다.'
            );
          }
        },
      });
    },
    [
      saveCard,
      checkSlug,
      setCanvasFront,
      stageRef,
      setSelectedElementId,
      setEditingElementId,
      router,
    ]
  );

  const handleSave = useCallback(async () => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      await sweetAlertUtil.error('로그인 필요', '로그인이 필요합니다.');
      return;
    }

    const lastSlug = slug?.trim() ? slug : await checkSlug();
    if (!lastSlug) return;

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
    } catch (err) {
      await sweetAlertUtil.error('알 수 없는 오류가 발생했습니다.');
      return;
    }

    doSave(user.id, lastSlug);
  }, [slug, checkSlug, doSave]);
  return { handleSave, isPending };
};
