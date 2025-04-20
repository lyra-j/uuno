// hooks/useSluggedSaveCard.ts
import { useCallback } from 'react';
import sweetAlertUtil from '@/utils/common/sweet-alert-util';
import { createClient } from '@/utils/supabase/client';
import { useCardSave } from '@/hooks/mutations/use-card-save';
import { useEditorStore } from '@/store/editor.store';
import { sideBarStore } from '@/store/editor.sidebar.store';
import { Json, TablesInsert } from '@/types/supabase';

export const useSluggedSaveCard = () => {
  const { mutate: saveCard, isPending } = useCardSave();
  const slug = useEditorStore((s) => s.slug);
  const setSlug = useEditorStore((s) => s.setSlug);

  const checkSlug = useCallback(async (): Promise<string | null> => {
    const input = await sweetAlertUtil.input({
      title: '저장할 URL 슬러그 입력',
      text: '고유한 슬러그를 입력해주세요.',
      inputPlaceholder: '예: my-unique-slug',
    });
    if (!input) {
      await sweetAlertUtil.error(
        '저장 취소',
        '슬러그를 입력하지 않아 저장이 취소되었습니다.'
      );
      return null;
    }
    const cleaned = input.trim().replace(/^\/+/, '');
    setSlug(cleaned);
    return cleaned;
  }, [setSlug]);

  const doSave = useCallback(
    (userId: string, lastSlug: string) => {
      // 필요한 값들을 한 번만 꺼내서 사용
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
        frontImgURL: null,
        backImgURL: null,
        isHorizontal,
      };

      saveCard(card, {
        onSuccess: () =>
          sweetAlertUtil.success(
            '저장 성공',
            '명함이 성공적으로 저장되었습니다.'
          ),
        onError: async (e) => {
          const isDup = e.message.includes(
            'duplicate key value violates unique constraint'
          );
          if (isDup) {
            await sweetAlertUtil.error(
              '저장 실패',
              '이미 사용 중인 슬러그입니다. 다른 슬러그를 입력해주세요.'
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
    [saveCard, checkSlug]
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

    doSave(user.id, lastSlug);
  }, [slug, checkSlug, doSave]);

  return { handleSave, isPending };
};
