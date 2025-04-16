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
import dynamic from 'next/dynamic';
import Image from 'next/image';
import clsx from 'clsx';
import sweetAlertUtil from '@/utils/common/sweet-alert-util';
import ColorPicker from './color-picker';

const SketchPicker = dynamic(
  () => import('react-color').then((mod) => mod.SketchPicker),
  { ssr: false }
);

const presetColors = [
  'transparent',
  '#FFFFFF',
  '#DBDCDF',
  '#AEB0B6',
  '#5A5C63',
  '#000000',
  '#FEBEBE',
  '#FEEFC5',
  '#E4F0D5',
  '#B8E9FF',
  '#CCD2F0',
  '#E0BFE6',
  '#FD6969',
  '#FFCD4A',
  '#AFD485',
  '#58CCFF',
  '#9FA9D8',
  '#B96BC6',
  '#FC3030',
  '#FD9F28',
  '#7DB249',
  '#18A8F1',
  '#5D6DBE',
  '#9A30AE',
  '#D92525',
  '#FD6F22',
  '#568A35',
  '#1187CF',
  '#3A4CA8',
  '#692498',
  '#AE1E1E',
  '#CA591B',
  '#456E2A',
  '#0E6CA5',
  '#2E3D86',
  '#541D7A',
];

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

  const handlePickColor = async () => {
    if (!window.EyeDropper) {
      sweetAlertUtil.error(
        '현재 브라우저에서는 스포이드 기능을 사용할 수 없어요.',
        '원활한 사용을 위해 크롬, 엣지, 오페라 브라우저를 추천드려요.'
      );
      return;
    }

    try {
      // 크롬, 엣지, 오페라만 지원.. 파이어폭스, 사파리는 지원안함
      const eyeDropper = new window.EyeDropper();
      const result = await eyeDropper.open();
      handleColorChange(result.sRGBHex);
    } catch (e) {
      console.error('스포이드 취소됨 or 에러 발생:', e);
    }
  };
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
