'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import clsx from 'clsx';
import sweetAlertUtil from '@/utils/common/sweet-alert-util';

// 지연 로딩으로 SketchPicker 불러오기
const SketchPicker = dynamic(
  () => import('react-color').then((mod) => mod.SketchPicker),
  { ssr: false }
);

// 기본 색상 배열
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

interface ColorPickerProps {
  selectedColor: string | null;
  onColorChange: (color: string) => void;
  title?: string;
}

const ColorPicker = ({
  selectedColor,
  onColorChange,
  title = '배경 색상',
}: ColorPickerProps) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  // 색상 피커 외부 클릭 시 닫기
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

  // 스포이드 기능 처리
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
      onColorChange(result.sRGBHex);
    } catch (e) {
      console.error('스포이드 취소됨 or 에러 발생:', e);
    }
  };

  return (
    <div className='w-full space-y-4'>
      {/* 타이틀 */}
      <div>
        <div className='mb-[14px] text-label2-medium'>{title}</div>
        <div className='grid grid-cols-6 gap-2'>
          {presetColors.map((color) => (
            <div
              key={color}
              className={clsx(
                'relative h-[28px] w-[28px] cursor-pointer rounded border',
                selectedColor === color
                  ? 'border-primary-40'
                  : 'border-gray-300'
              )}
              style={{
                backgroundColor: color === 'transparent' ? '#FFF' : color,
              }}
              onClick={() => onColorChange(color)}
            >
              {color === 'transparent' && (
                <div className='absolute left-1/2 top-1/2 h-px w-[40px] -translate-x-1/2 -translate-y-1/2 rotate-[135deg] bg-[#F00]' />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 구분선 */}
      <div className='my-[14px] h-[1px] w-full bg-gray-20' />

      {/* 색상 추가 */}
      <div className='relative'>
        <div className='flex justify-between'>
          <div
            onClick={() => setShowColorPicker((prev) => !prev)}
            className='flex h-[32px] w-[104px] cursor-pointer items-center gap-1 rounded border border-gray-10 bg-white p-[6px] text-label2-regular'
          >
            {!selectedColor ? (
              <Image
                src='/icons/palette.svg'
                width={20}
                height={20}
                alt='palette'
              />
            ) : selectedColor === 'transparent' ? (
              <div className='relative h-[20px] w-[20px] rounded border border-gray-200 bg-white'>
                <div className='absolute left-1/2 top-1/2 h-px w-[28px] -translate-x-1/2 -translate-y-1/2 rotate-[135deg] bg-[#F00]' />
              </div>
            ) : (
              <div
                className='h-[20px] w-[20px] rounded border border-gray-200'
                style={{ backgroundColor: selectedColor }}
              />
            )}
            <span className='ml-1 truncate text-caption-regular'>
              {!selectedColor
                ? '선택'
                : selectedColor === 'transparent'
                  ? '없음'
                  : selectedColor}
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
            className='absolute top-0 z-10 origin-top-left scale-[0.91]'
          >
            <SketchPicker
              color={
                selectedColor === 'transparent'
                  ? '#ffffff'
                  : selectedColor || '#ffffff'
              }
              onChangeComplete={(color) => onColorChange(color.hex)}
              styles={{ default: { picker: { width: '200px' } } }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorPicker;
