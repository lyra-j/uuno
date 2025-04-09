'use client';

import EditorCanvas from '@/components/editor/editor-canvas';
import EditorBottomTab from '@/components/editor/editor-ui/bottomTab/editor-bottom-tab';
import EditorSideBar from '@/components/editor/editor-ui/sidebar/editor-sidebar';
import EditorTopbar from '@/components/editor/editor-ui/topbar/editor-topbar';
import { sideBarStore } from '@/store/editor.sidebar.store';
import { useEffect, useRef, useState } from 'react';
const EditPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sidebarStatus = sideBarStore((state) => state.sidebarStatus);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setCanvasSize({ width, height });
      }
    };
    updateSize();

    window.addEventListener('resize', updateSize);

    return () => window.removeEventListener('resize', updateSize);
  }, [sidebarStatus]);

  return (
    <div className='flex h-[calc(100vh-64px)] flex-row overflow-hidden'>
      <EditorSideBar />
      <div
        ref={containerRef}
        className='flex flex-1 flex-col bg-slate-400 transition-all duration-300 ease-in-out'
      >
        <EditorTopbar />
        {canvasSize.width > 0 && canvasSize.height > 0 && (
          <EditorCanvas canvasSize={canvasSize} />
        )}
        <EditorBottomTab />
      </div>
    </div>
  );
};

export default EditPage;
