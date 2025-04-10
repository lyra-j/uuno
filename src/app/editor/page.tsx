'use client';

import EditorCanvas from '@/components/editor/editor-canvas';
import EditorBottomTab from '@/components/editor/editor-ui/bottomTab/editor-bottom-tab';
import EditorSideBar from '@/components/editor/editor-ui/sidebar/editor-sidebar';
import EditorTopbar from '@/components/editor/editor-ui/topbar/editor-topbar';
import { useEditorStore } from '@/store/editor.store';
import Konva from 'konva';
import { useRef } from 'react';

const EditPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textElements = useEditorStore((state) => state.textElements);
  const shapeRefs = useRef<Record<string, Konva.Text>>({});

  /**
   * DB에 저장할 데이터 생성 핸들러
   * 각 요소에 대해 현재 Konva 노드의 절대 좌표 반영
   */
  const handleSave = () => {
    try {
      const dataToSave = textElements.map((el) => {
        const node = shapeRefs.current[el.id];
        const absPos = node ? node.getAbsolutePosition() : { x: el.x, y: el.y };
        return {
          ...el,
          x: absPos.x,
          y: absPos.y,
        };
      });
      console.log('저장될 데이터:', dataToSave);
      // DB 저장 로직 추 후 추가
      // 저장 성공 시 사용자에게 알림
    } catch (error) {
      console.error('저장 중 오류 발생:', error);
      // 저장 실패 시 사용자에게 알림
    }
  };

  return (
    <div className='flex h-[calc(100vh-64px)] flex-row overflow-hidden'>
      <EditorSideBar />
      <div
        ref={containerRef}
        className='flex flex-1 flex-col bg-slate-400 transition-all duration-300 ease-in-out'
      >
        <EditorTopbar />
        <div className='flex h-full w-full items-center justify-center'>
          <EditorCanvas shapeRefs={shapeRefs} />
        </div>
        <EditorBottomTab />
      </div>
    </div>
  );
};

export default EditPage;
