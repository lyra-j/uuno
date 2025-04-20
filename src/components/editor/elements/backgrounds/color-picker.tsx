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

        // 클릭 이벤트 핸들러 설정
        const handleCanvasClick = (event: MouseEvent) => {
          try {
            const ctx = canvas.getContext('2d');
            if (ctx) {
              // 직접 마우스 위치 사용 (스크롤 오프셋 고려)
              const x = event.clientX;
              const y = event.clientY;

              // 캔버스 영역 내에 있는지 확인
              if (x >= 0 && x < canvas.width && y >= 0 && y < canvas.height) {
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
            sweetAlertUtil.error(
              '스포이드 기능 오류',
              '색상을 추출하는 중 오류가 발생했습니다.'
            );
          }

          // 이벤트 리스너 제거 및 모달 닫기
          document.removeEventListener('click', handleCanvasClick);
          document.body.removeChild(modalDiv);
        };

        // 간단한 모달 만들기
        const modalDiv = document.createElement('div');
        modalDiv.style.position = 'fixed';
        modalDiv.style.top = '0';
        modalDiv.style.left = '0';
        modalDiv.style.width = '100%';
        modalDiv.style.height = '100%';
        modalDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        modalDiv.style.zIndex = '9999';
        modalDiv.style.display = 'flex';
        modalDiv.style.flexDirection = 'column';
        modalDiv.style.alignItems = 'center';
        modalDiv.style.justifyContent = 'center';

        // 메시지 추가
        const messageDiv = document.createElement('div');
        messageDiv.style.backgroundColor = 'white';
        messageDiv.style.padding = '20px';
        messageDiv.style.borderRadius = '8px';
        messageDiv.style.marginBottom = '20px';
        messageDiv.textContent = '화면 어디든 클릭하여 색상을 선택하세요.';
        modalDiv.appendChild(messageDiv);

        // 취소 버튼 추가
        const cancelButton = document.createElement('button');
        cancelButton.style.padding = '8px 16px';
        cancelButton.style.backgroundColor = '#f44336';
        cancelButton.style.color = 'white';
        cancelButton.style.border = 'none';
        cancelButton.style.borderRadius = '4px';
        cancelButton.style.cursor = 'pointer';
        cancelButton.textContent = '취소';
        cancelButton.onclick = (e) => {
          e.stopPropagation(); // 이벤트 전파 중지
          document.removeEventListener('click', handleCanvasClick);
          document.body.removeChild(modalDiv);
        };
        modalDiv.appendChild(cancelButton);

        // 모달 클릭 이벤트 전파 중지
        messageDiv.onclick = (e) => e.stopPropagation();
        cancelButton.onclick = (e) => {
          e.stopPropagation();
          document.removeEventListener('click', handleCanvasClick);
          document.body.removeChild(modalDiv);
        };

        // 모달을 body에 추가
        document.body.appendChild(modalDiv);

        // 클릭 이벤트 리스너 등록 (약간의 지연을 줘서 모달 자체 클릭과 충돌 방지)
        setTimeout(() => {
          document.addEventListener('click', handleCanvasClick);
        }, 100);
      } catch (error) {
        console.error('화면 캡처 오류:', error);
        sweetAlertUtil.error(
          '스포이드 기능 오류',
          '화면을 캡처하는 중 오류가 발생했습니다.'
        );
      }
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
    </div>
  );
};

export default ColorPicker;
