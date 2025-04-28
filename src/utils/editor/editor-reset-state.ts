import { sideBarStore } from '@/store/editor.sidebar.store';
import { useEditorStore } from '@/store/editor.store';

export const resetEditorState = () => {
  const editorState = useEditorStore.getState();
  const sidebarState = sideBarStore.getState();

  //editorStore 초기화
  editorState.reset();

  editorState.setToolbar(null);
  editorState.setSlug(null);
  editorState.setCanvasFront(true);
  editorState.setTemplate(null);

  //editorSidebarStore 초기화
  sidebarState.setSideBarStatus(false);
  sidebarState.setZoom(1.5);
  sidebarState.setIsSocialEditing(true);
  sidebarState.setIsHorizontal(true);
};
