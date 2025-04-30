'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import clsx from 'clsx';
import { createPortal } from 'react-dom';
import { toastWarning } from '@/lib/toast-util';

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
  const [showEyedropperModal, setShowEyedropperModal] = useState(false);
  const [capturedCanvas, setCapturedCanvas] =
    useState<HTMLCanvasElement | null>(null);
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
    // 네이티브 EyeDropper API 지원 확인
    if (typeof window !== 'undefined' && window.EyeDropper) {
      try {
        const eyeDropper = new window.EyeDropper();
        const result = await eyeDropper.open();
        onColorChange(result.sRGBHex);
      } catch (e) {
        console.error('스포이드 취소됨 or 에러 발생:', e);
      }
    } else {
      // html2canvas를 사용한 간단한 스포이드 구현
      try {
        // 지연 로딩으로 html2canvas 불러오기
        const html2canvas = (await import('html2canvas')).default;

        const viewportElement = document.documentElement;
        const canvas = await html2canvas(viewportElement, {
          logging: false,
          backgroundColor: null,
          scale: 1,
          useCORS: true,
          allowTaint: true,
          foreignObjectRendering: false,
          width: window.innerWidth,
          height: window.innerHeight,
          x: window.scrollX,
          y: window.scrollY,
          windowWidth: window.innerWidth,
          windowHeight: window.innerHeight,
          ignoreElements: (element) => {
            // 이미지, iframe 등 외부 리소스 포함 요소 무시
            return (
              element.tagName === 'IMG' ||
              element.tagName === 'IFRAME' ||
              element.tagName === 'VIDEO' ||
              (element as HTMLElement).style.backgroundImage !== ''
            );
          },
        });

        setCapturedCanvas(canvas);
        setShowEyedropperModal(true);
      } catch (error) {
        console.error('화면 캡처 오류:', error);
        toastWarning(
          '스포이드 기능 오류',
          '화면을 캡처하는 중 오류가 발생했습니다.'
        );
      }
    }
  };

  // 캔버스 클릭 핸들러
  const handleCanvasClick = (event: React.MouseEvent) => {
    try {
      if (!capturedCanvas) return;

      const ctx = capturedCanvas.getContext('2d');
      if (ctx) {
        // 직접 마우스 위치 사용 (스크롤 오프셋 고려)
        const x = event.clientX;
        const y = event.clientY;

        // 캔버스 영역 내에 있는지 확인
        if (
          x >= 0 &&
          x < capturedCanvas.width &&
          y >= 0 &&
          y < capturedCanvas.height
        ) {
          const imageData = ctx.getImageData(x, y, 1, 1);
          const r = imageData.data[0];
          const g = imageData.data[1];
          const b = imageData.data[2];
          const color = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
          onColorChange(color);
        } else {
          console.warn('클릭한 위치가 캔버스 범위를 벗어났습니다.');
        }
      }
    } catch (e) {
      console.error('색상 추출 중 오류:', e);
      toastWarning(
        '스포이드 기능 오류',
        '색상을 캡처하는 중 오류가 발생했습니다.'
      );
    }

    // 모달 닫기
    setShowEyedropperModal(false);
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
          <div
            className='cursor-pointer'
            onClick={handlePickColor}
            title='화면에서 색상 선택하기'
          >
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

      {/* 스포이드 모달 */}
      {showEyedropperModal &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className='fixed inset-0 z-[9999] flex cursor-crosshair flex-col items-center justify-center bg-black/50'
            onClick={handleCanvasClick}
          >
            <div
              className='mb-5 cursor-default rounded-lg bg-white p-5'
              onClick={(e) => e.stopPropagation()}
            >
              화면 어디든 클릭하여 색상을 선택하세요.
            </div>
            <button
              className='cursor-pointer rounded bg-red-500 px-4 py-2 text-white'
              onClick={(e) => {
                e.stopPropagation();
                setShowEyedropperModal(false);
              }}
            >
              취소
            </button>
          </div>,
          document.body
        )}
    </div>
  );
};

export default ColorPicker;
