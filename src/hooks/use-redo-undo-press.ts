import { useEditorStore } from '@/store/editor.store';
import { useEffect } from 'react';

export const useRedoUndoPress = () => {
  const redo = useEditorStore((state) => state.redo);
  const undo = useEditorStore((state) => state.undo);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.userAgent.match(/Mac|iPod|iPhone|iPad/i);
      const ctrlOrCmd = isMac ? e.metaKey : e.ctrlKey;

      if (ctrlOrCmd && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          // Ctrl+Shift+Z or Cmd+Shift+Z
          redo();
        } else {
          // Ctrl+Z or Cmd+Z
          undo();
        }
      }
      // Ctrl + y
      if (ctrlOrCmd && e.key.toLocaleLowerCase() === 'y') {
        e.preventDefault();
        redo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);
};
