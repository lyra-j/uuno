import { sideBarStore } from '@/store/editor.sidebar.store';
import { useEditorStore } from '@/store/editor.store';
import { Json, TablesInsert } from '@/types/supabase';

/**
 * 카드 DB 저장용 객체 생성
 */
export const createCardInsertPayload = (
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
