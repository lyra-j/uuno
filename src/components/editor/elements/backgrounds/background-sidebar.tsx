'use client';

import React, { useState } from 'react';
import { useEditorStore } from '@/store/editor.store';
import dynamic from 'next/dynamic';

const SketchPicker = dynamic(
  () => import('react-color').then((mod) => mod.SketchPicker),
  { ssr: false }
);

const presetColors = [
  '#000000',
  '#4B4B4B',
  '#808080',
  '#D3D3D3',
  '#FFFFFF',
  '#FF0000',
  '#FFA500',
  '#FFFF00',
  '#00FF00',
  '#00FFFF',
  '#0000FF',
  '#800080',
  '#A52A2A',
  '#8B4513',
];

const BackgroundSidebar = () => {
  const setBackgroundColor = useEditorStore(
    (state) => state.setBackgroundColor
  );
  const backgroundColor = useEditorStore((state) => state.backgroundColor);
  const [showColorPicker, setShowColorPicker] = useState(false);

  return (
    <div className='w-full space-y-6 p-4'>
      {/* 색상 추가 */}
      <div>
        <div className='mb-2 font-semibold'>색상 추가</div>
        <button
          onClick={() => setShowColorPicker((prev) => !prev)}
          className='h-10 w-10 rounded border bg-white text-xl'
        >
          +
        </button>
        {showColorPicker && (
          <div className='mt-2'>
            <SketchPicker
              color={backgroundColor || '#ffffff'}
              onChangeComplete={(color) => setBackgroundColor(color.hex)}
            />
          </div>
        )}
      </div>

      {/* 기본 색상 */}
      <div>
        <div className='mb-2 font-semibold'>기본 색상</div>
        <div className='grid grid-cols-5 gap-2'>
          {presetColors.map((color) => (
            <div
              key={color}
              className='h-6 w-6 cursor-pointer rounded border'
              style={{ backgroundColor: color }}
              onClick={() => setBackgroundColor(color)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BackgroundSidebar;
