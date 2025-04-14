'use client';

import EditorCanvas from '@/components/editor/editor-canvas';
import EditorBottomTab from '@/components/editor/editor-ui/bottomTab/editor-bottom-tab';
import EditorSideBar from '@/components/editor/editor-ui/sidebar/editor-sidebar';
import EditorTopbar from '@/components/editor/editor-ui/topbar/editor-topbar';
import { useRef } from 'react';

const EditPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className='flex h-[calc(100vh-64px)] flex-row overflow-hidden'>
      <EditorSideBar />
      <div
        ref={containerRef}
        className='flex flex-1 flex-col bg-slate-400 transition-all duration-300 ease-in-out'
      >
        <EditorTopbar />
        <div className='flex h-full w-full items-center justify-center'>
          <EditorCanvas />
        </div>
        <EditorBottomTab />
      </div>
    </div>
  );
};

export default EditPage;
