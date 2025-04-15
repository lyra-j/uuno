'use client';

import EditorContainer from '@/components/editor/editor-container';
import EditorBottomTab from '@/components/editor/editor-ui/bottomTab/editor-bottom-tab';
import EditorSideBar from '@/components/editor/editor-ui/sidebar/editor-sidebar';
import EditorTopbar from '@/components/editor/editor-ui/topbar/editor-topbar';
import { useEditorStore } from '@/store/editor.store';
import { useEffect, useRef } from 'react';

const EditPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const redo = useEditorStore((state) => state.redo);
  const undo = useEditorStore((state) => state.undo);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
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

  return (
    <div className='flex h-[calc(100vh-64px)] flex-row overflow-hidden'>
      <EditorSideBar />
      <div ref={containerRef} className='flex flex-1 flex-col bg-[#F4F4F5]'>
        <EditorTopbar />
        <div className='flex h-full w-full items-center justify-center overflow-auto'>
          <EditorContainer />
        </div>
        <EditorBottomTab />
      </div>
    </div>
  );
};

export default EditPage;
