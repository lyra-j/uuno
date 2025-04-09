'use client';
import React, { useRef } from 'react';
import TextSidebar from './text-sidebar';
import TextCanvasStage from './text-canvas-stage';
import { useEditorStore } from '@/store/editor.store';
import Konva from 'konva';

const TextEditor: React.FC = () => {
  const textElements = useEditorStore((state) => state.textElements);

  const shapeRefs = useRef<Record<string, Konva.Text>>({});

  /**
   * DB에 저장할 데이터 생성 핸들러
   * 각 요소에 대해 현재 Konva 노드의 절대 좌표 반영
   */
  const handleSave = () => {
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
  };

  return (
    <div className='flex h-[calc(100vh-64px)] w-full flex-col'>
      <button onClick={handleSave} className='bg-red-500 px-4 py-2 text-white'>
        저장하기
      </button>
      <div className='flex flex-1 flex-row'>
        <TextSidebar />
        <TextCanvasStage shapeRefs={shapeRefs} />
      </div>
    </div>
  );
};

export default TextEditor;
