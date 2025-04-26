'use client';

declare global {
  interface Window {
    EyeDropper?: {
      new (): {
        open: () => Promise<{ sRGBHex: string }>;
      };
    };
  }
}

import React, { useEffect, useRef, useState } from 'react';
import { useEditorStore } from '@/store/editor.store';
import ColorPicker from '@/components/editor/editor-ui/color-picker';

const BackgroundSidebar = () => {
  const isFront = useEditorStore((state) => state.isCanvasFront);
  const setBackgroundColor = useEditorStore(
    (state) => state.setBackgroundColor
  );
  const setBackgroundColorBack = useEditorStore(
    (state) => state.setBackgroundColorBack
  );
  const backgroundColor = useEditorStore((state) =>
    isFront ? state.backgroundColor : state.backgroundColorBack
  );
  const [showColorPicker, setShowColorPicker] = useState(false);
  const handleColorChange = (color: string) => {
    if (isFront) {
      setBackgroundColor(color);
    } else {
      setBackgroundColorBack(color);
    }
  };
  const pickerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setShowColorPicker(false);
      }
    }

    if (showColorPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showColorPicker]);

  return (
    <div className='w-full space-y-4 px-[20px] py-[14px]'>
      <ColorPicker
        selectedColor={backgroundColor}
        onColorChange={handleColorChange}
        title='배경 색상'
      />
    </div>
  );
};

export default BackgroundSidebar;
