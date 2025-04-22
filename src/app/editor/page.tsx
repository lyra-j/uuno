'use client';

import EditorContainer from '@/components/editor/editor-container';
import EditorBottomTab from '@/components/editor/editor-ui/bottomTab/editor-bottom-tab';
import EditorSideBar from '@/components/editor/editor-ui/sidebar/editor-sidebar';
import EditorTopbar from '@/components/editor/editor-ui/topbar/editor-topbar';
import CanvasSelectModal from '@/components/editor/modal/editor-vt-hr-select-modal';
import { useCardContent } from '@/hooks/queries/use-card-interaction';
import { useEditorStore } from '@/store/editor.store';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

const EditPage = () => {
  const params = useSearchParams();
  const slug = params.get('slug') || '';

  const containerRef = useRef<HTMLDivElement>(null);
  const redo = useEditorStore((state) => state.redo);
  const undo = useEditorStore((state) => state.undo);

  const setCanvasElements = useEditorStore((state) => state.setCanvasElements);
  const setBackgroundColor = useEditorStore(
    (state) => state.setBackgroundColor
  );
  const setCanvasBackElements = useEditorStore(
    (state) => state.setCanvasBackElements
  );
  const setBackgroundColorBack = useEditorStore(
    (state) => state.setBackgroundColorBack
  );
  const setTitle = useEditorStore((state) => state.setTitle);

  const { data, isPending, isError } = useCardContent(slug);

  useEffect(() => {
    if (!data) return;
    const { content, title, id } = data;
    setTitle(title);
    setCanvasElements(content.canvasElements);
    setBackgroundColor(content.backgroundColor);
    setCanvasBackElements(content.canvasBackElements);
    setBackgroundColorBack(content.backgroundColorBack);
  }, [
    data,
    setTitle,
    setCanvasElements,
    setBackgroundColor,
    setCanvasBackElements,
    setBackgroundColorBack,
  ]);

  useEffect(() => {
    console.log(data);
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

  if (isPending)
    return (
      <div className='flex flex-1 items-center justify-center'> 로딩중</div>
    );
  if (isError || !data)
    return (
      <div className='text-center text-red-500'>
        명함을 불러오는 중 오류가 발생했습니다.
      </div>
    );

  return (
    <div className='flex h-[calc(100vh-64px)] flex-row overflow-hidden'>
      <CanvasSelectModal />
      <EditorSideBar />
      <div ref={containerRef} className='flex flex-1 flex-col bg-gray-5'>
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
