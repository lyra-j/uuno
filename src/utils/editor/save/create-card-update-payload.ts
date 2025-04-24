import { sideBarStore } from '@/store/editor.sidebar.store';
import { useEditorStore } from '@/store/editor.store';
import { Json, TablesUpdate } from '@/types/supabase';

export const createCardUpdatePayload = (
  slug: string,
  urls: Record<'front' | 'back', string>
): TablesUpdate<'cards'> => {
  const {
    title,
    canvasElements,
    canvasBackElements,
    backgroundColor,
    backgroundColorBack,
  } = useEditorStore.getState();
  const isHorizontal = sideBarStore.getState().isHorizontal;

  return {
    title: title || '제목 없음',
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
