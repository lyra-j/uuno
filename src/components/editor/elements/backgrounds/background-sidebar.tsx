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
  const setBackgroundColor = useEditorStore(
    (state) => state.setBackgroundColor
  );
  const backgroundColor = useEditorStore((state) => state.backgroundColor);
  const [showColorPicker, setShowColorPicker] = useState(false);
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
      alert('스포이드를 지원하지 않는 브라우저입니다.');
      return;
    }

    try {
      // 크롬, 엣지, 오페라만 지원.. 파이어폭스, 사파리는 지원안함
      const eyeDropper = new window.EyeDropper();
      const result = await eyeDropper.open();
      setBackgroundColor(result.sRGBHex);
    } catch (e) {
      console.log('스포이드 취소됨 or 에러 발생:', e);
    }
  };

  return (
    <div className='w-full space-y-4 px-[20px] py-[14px]'>
      {/* 배경 색상 */}
      <div>
        <div className='mb-[14px] text-label2-medium'>배경 색상</div>
        <div className='grid grid-cols-6 gap-2'>
          {presetColors.map((color) => (
            <div
              key={color}
              className={clsx(
                'relative h-[28px] w-[28px] cursor-pointer rounded border',
                backgroundColor === color
                  ? 'border-primary-40'
                  : 'border-gray-300'
              )}
              style={{
                backgroundColor: color === 'transparent' ? '#FFF' : color,
              }}
              onClick={() => setBackgroundColor(color)}
            >
              {color === 'transparent' && (
                <div className='absolute left-1/2 top-1/2 h-px w-[40px] -translate-x-1/2 -translate-y-1/2 rotate-[135deg] bg-[#F00]' />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 구분선 */}
      <div className='my-[14] h-[1px] w-full bg-gray-20' />

      {/* 색상 추가 */}
      <div className='relative'>
        <div className='flex content-between'>
          <div
            onClick={() => setShowColorPicker((prev) => !prev)}
            className='flex h-[32px] w-[104px] cursor-pointer items-center gap-1 rounded border border-gray-10 bg-white p-[6px] text-label2-regular'
          >
            <Image
              src='/icons/palette.svg'
              width={20}
              height={20}
              alt='palette'
            />
            <span>
              {backgroundColor === 'transparent' ? '' : backgroundColor}
            </span>
          </div>
          <div className='cursor-pointer' onClick={handlePickColor}>
            <Image
              src='/icons/dropper.svg'
              width={32}
              height={32}
              alt='dropper'
            />
          </div>
        </div>
        {showColorPicker && (
          <div
            ref={pickerRef}
            className='absolute top-0 origin-top-left scale-[0.91]'
          >
            <SketchPicker
              color={backgroundColor || '#ffffff'}
              onChangeComplete={(color) => setBackgroundColor(color.hex)}
              styles={{ default: { picker: { width: '200px' } } }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BackgroundSidebar;
