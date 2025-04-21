import { useCallback } from 'react';
import sweetAlertUtil from '@/utils/common/sweet-alert-util';
import { createClient } from '@/utils/supabase/client';
import { useCardSave } from '@/hooks/mutations/use-card-save';
import { useEditorStore } from '@/store/editor.store';
import { sideBarStore } from '@/store/editor.sidebar.store';
import { Json, TablesInsert } from '@/types/supabase';
import { checkSlugExists } from '@/apis/check-slug-exists';

export const useSluggedSaveCard = () => {
  const { mutate: saveCard, isPending } = useCardSave();
  const slug = useEditorStore((state) => state.slug);
  const setSlug = useEditorStore((state) => state.setSlug);

  const checkSlug = useCallback(async (): Promise<string | null> => {
    const input = await sweetAlertUtil.input({
      title: '공유될 명함 주소를 입력하세요.',
      text: 'https://uuno.vercel.app/<여기에 들어갈 주소>',
      inputPlaceholder: '예: my-uuno',
    });
    if (!input) {
      await sweetAlertUtil.error('저장 취소', '저장이 취소되었습니다.');
      return null;
    }
    const cleaned = input.trim().replace(/^\/+/, '');
    const isValidSlug = /^[a-zA-Z0-9-]+$/.test(cleaned);
    if (!isValidSlug) {
      await sweetAlertUtil.error('유효하지 않은 주소', '다시 입력해 주세요.');
      return null;
    }
    setSlug(cleaned);
    return cleaned;
  }, [setSlug]);

  const doSave = useCallback(
    (userId: string, lastSlug: string) => {
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
