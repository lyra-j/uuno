import { sideBarStore } from '@/store/editor.sidebar.store';
import { useEditorStore } from '@/store/editor.store';

export const resetEditorState = () => {
  const editorState = useEditorStore.getState();
  const sidebarState = sideBarStore.getState();

  editorState.setCanvasElements([]);
  editorState.setCanvasBackElements([]);
  editorState.setBackgroundColor('#ffffff');
  editorState.setBackgroundColorBack('#ffffff');
  editorState.setSelectedElementId(null);
  editorState.setEditingElementId(null);
  editorState.setSelectedElementType(null);
  editorState.setToolbar(null);
  editorState.setSlug(null);
  editorState.setTitle('');
  editorState.setCanvasFront(true);

  sidebarState.setSideBarStatus(false);
  // 추가로 필요한 값이 있으면 여기에 넣기
};
