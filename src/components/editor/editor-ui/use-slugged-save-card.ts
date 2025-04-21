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
import Konva from 'konva';

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
   * 캔버스 앞/뒷면 이미지 업로드 후 URL 반환
   */
  const getStageImageUrls = async (
    stage: Konva.Stage,
    userId: string,
    slug: string,
    setCanvasFront: (isFront: boolean) => void
  ): Promise<Record<'front' | 'back', string>> => {
    const originalSide = useEditorStore.getState().isCanvasFront;
    const urls: Record<'front' | 'back', string> = { front: '', back: '' };

    for (const side of ['front', 'back'] as const) {
      setCanvasFront(side === 'front');
      await new Promise((res) => setTimeout(res, 0));
      urls[side] = await uploadStageImage(stage, userId, slug, side);
    }

    setCanvasFront(originalSide);
    return urls;
  };

  /**
   * 카드 DB 저장용 객체 생성
   */
  const createCardInsertPayload = (
    userId: string,
    slug: string,
    urls: Record<'front' | 'back', string>
  ): TablesInsert<'cards'> => {
    const {
      title,
      canvasElements,
      canvasBackElements,
      backgroundColor,
      backgroundColorBack,
    } = useEditorStore.getState();
    const isHorizontal = sideBarStore.getState().isHorizontal;

    return {
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
      slug,
      frontImgURL: urls.front,
      backImgURL: urls.back,
      isHorizontal,
    };
  };

  /**
   * 실제 저장 실행 함수
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

      setSelectedElementId(null);
      setEditingElementId(null);

      const urls = await getStageImageUrls(
        stage,
        userId,
        lastSlug,
        setCanvasFront
      );
      const card = createCardInsertPayload(userId, lastSlug, urls);

      saveCard(card, {
        onSuccess: () => {
          sweetAlertUtil.success(
            '저장 성공',
            '명함이 성공적으로 저장되었습니다.'
          );
          router.push(ROUTES.HOME);
        },
        onError: async (e) => {
          const isDup = e.message?.includes('duplicate key value');
          if (isDup) {
            await sweetAlertUtil.error(
              '저장 실패',
              '이미 사용 중인 주소입니다. 다른 주소를 입력해주세요.'
            );
            const newSlug = await checkSlug();
            if (newSlug) doSave(userId, newSlug);
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
