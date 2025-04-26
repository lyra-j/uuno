'use client';

import LinkIcon from '@/components/icons/editor/link-icon';
import TextAlignBottomIcon from '@/components/icons/editor/text/text-align-bottom';
import TextAlignTopIcon from '@/components/icons/editor/text/text-align-top';
import TextAlignVerticalIcon from '@/components/icons/editor/text/text-align-vertical';
import TextBoldIcon from '@/components/icons/editor/text/text-bold-icon';
import TextItalicIcon from '@/components/icons/editor/text/text-italic-icon';
import TextMinusIcon from '@/components/icons/editor/text/text-minus-size';
import TextPlusIcon from '@/components/icons/editor/text/text-plus-size';
import TextStateAlignBothIcon from '@/components/icons/editor/text/text-state-align-both';
import TextStateAlignCenterIcon from '@/components/icons/editor/text/text-state-align-center';
import TextStateAlignLeftIcon from '@/components/icons/editor/text/text-state-align-left';
import TextStateAlignRightIcon from '@/components/icons/editor/text/text-state-align-right';
import TextStrikeIcon from '@/components/icons/editor/text/text-strike-icon';
import TextUnderLineIcon from '@/components/icons/editor/text/text-underline-icon';
import { useEditorStore } from '@/store/editor.store';
import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { TextElement } from '@/types/editor.type';
import { sweetComingSoonAlert } from '@/utils/common/sweet-coming-soon-alert';
import ColorPicker from '@/components/editor/editor-ui/color-picker';
import { ALIGN_TYPES, VERTICAL_ALIGN_TYPES } from '@/constants/editor.constant';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from '@/components/ui/select';
import { useStageRefStore } from '@/store/editor.stage.store';

const ALIGN_ICONS = {
  left: <TextStateAlignLeftIcon />,
  center: <TextStateAlignCenterIcon />,
  right: <TextStateAlignRightIcon />,
  both: <TextStateAlignBothIcon />,
};

const VERTICAL_ALIGN_ICONS = {
  top: <TextAlignTopIcon className='h-5 w-5' />,
  middle: <TextAlignVerticalIcon className='h-5 w-5' />,
  bottom: <TextAlignBottomIcon className='h-5 w-5' />,
};

const TextStyleSidebar = () => {
  const isFront = useEditorStore((state) => state.isCanvasFront);
  const canvasElements = useEditorStore((state) =>
    isFront ? state.canvasElements : state.canvasBackElements
  );
  const selectedElementId = useEditorStore((state) => state.selectedElementId);
  const updateElement = useEditorStore((state) => state.updateElement);
  const stageRef = useStageRefStore((state) => state.stageRef);

  const [fonts, setFonts] = useState<string[]>([]);
  const [visibleFontCount, setVisibleFontCount] = useState(30);
  const loadedFonts = useRef<Set<string>>(new Set(['Pretendard']));

  /**
   * 현재 선택된 텍스트 요소 가져오기
   */
  const selectedTextElement = useMemo((): TextElement | undefined => {
    return canvasElements.find(
      (el) => el.id === selectedElementId && el.type === 'text'
    ) as TextElement | undefined;
  }, [canvasElements, selectedElementId]);

  const currentFont = selectedTextElement?.fontFamily ?? 'Pretendard';

  // 초기 폰트 가져오기
  useEffect(() => {
    fetch('/api/google-font')
      .then((res) => res.json())
      .then((list: string[]) => setFonts(list))
      .catch(() => setFonts([]));
  }, []);

  //폰트 목록
  const fontItems = useMemo(() => {
    if (fonts.length === 0) return null;
    return fonts.slice(0, visibleFontCount).map((family) => (
      <SelectItem key={family} value={family}>
        <span style={{ fontFamily: family }}>{family}</span>
      </SelectItem>
    ));
  }, [fonts, visibleFontCount]);

  /**
   * 폰트 변경 핸들러
   */
  const handleFontChange = (fontFamily: string) => {
    if (!selectedElementId) return;

    const loadFont = () => {
      //폰트 로드
      if (!loadedFonts.current.has(fontFamily)) {
        import('webfontloader').then((WebFont) => {
          WebFont.load({
            google: { families: [fontFamily] },
            active: () => {
              loadedFonts.current.add(fontFamily);

              //konva 캐시 무효화
              const stage = stageRef?.current;
              if (stage) {
                const node = stage.findOne(`#${selectedElementId}`);
                if (node && node.getClassName() === 'Text') {
                  const old = (node as any).text();
                  (node as any).text('');
                  (node as any).text(old);
                }
              }

              stageRef?.current?.batchDraw();
            },
          });
        });
      } else {
        requestAnimationFrame(() => {
          const stage = stageRef?.current;
          if (stage) {
            const node = stage.findOne(`#${selectedElementId}`);
            if (node && node.getClassName() === 'Text') {
              const old = (node as any).text();
              (node as any).text('');
              (node as any).text(old);
            }
          }
          stageRef?.current?.batchDraw();
        });
      }
    };

    updateElement(selectedElementId, { fontFamily });
    loadFont();
  };

  /**
   * 텍스트 스타일 속성 토글 핸들러
   * @param prop - 토글할 스타일 속성 이름
   */
  const handleToggleStyle = (
    prop: 'isBold' | 'isItalic' | 'isUnderline' | 'isStrike'
  ) => {
    if (!selectedElementId || !selectedTextElement) return;
    updateElement(selectedElementId, {
      [prop]: !selectedTextElement[prop],
    });
  };

  /**
   * 폰트 크기를 -1 해주는 버튼 핸들러
   */
  const handleDecrementFontSize = () => {
    if (!selectedElementId || !selectedTextElement) return;
    updateElement(selectedElementId, {
      fontSize: Math.max(5, selectedTextElement.fontSize - 1),
    });
  };

  /**
   * 폰트 크기를 +1 해주는 버튼 핸들러
   */
  const handleIncrementFontSize = () => {
    if (!selectedElementId || !selectedTextElement) return;
    updateElement(selectedElementId, {
      fontSize: Math.max(5, selectedTextElement.fontSize + 1),
    });
  };

  /**
   * 텍스트 정렬 토글 핸들러
   */
  const handleCycleAlign = () => {
    if (!selectedElementId || !selectedTextElement) return;
    const currentIndex = ALIGN_TYPES.indexOf(
      selectedTextElement.align || 'left'
    );
    const nextAlign = ALIGN_TYPES[(currentIndex + 1) % ALIGN_TYPES.length];
    updateElement(selectedElementId, { align: nextAlign });
  };

  /**
   * 텍스트 수직 정렬 토글 핸들러
   */
  const handleCycleVerticalAlign = () => {
    if (!selectedElementId || !selectedTextElement) return;
    const currentIndex = VERTICAL_ALIGN_TYPES.indexOf(
      selectedTextElement.verticalAlign || 'top'
    );
    const next =
      VERTICAL_ALIGN_TYPES[(currentIndex + 1) % VERTICAL_ALIGN_TYPES.length];
    updateElement(selectedElementId, { verticalAlign: next });
  };

  return (
    <div className='mt-[14px] w-full space-y-4 px-[18px]'>
      <div className='flex items-center justify-between'>
        <h3 className='text-caption-medium'>텍스트 속성</h3>
        <LinkIcon onClick={sweetComingSoonAlert} />
      </div>

      {/* 폰트 */}
      {selectedTextElement && (
        <Select value={currentFont} onValueChange={handleFontChange}>
          <SelectTrigger className='w-full'>
            <SelectValue>{currentFont}</SelectValue>
          </SelectTrigger>
          <SelectContent
            className='max-h-60 overflow-auto'
            onScroll={(e) => {
              const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
              if (scrollTop + clientHeight >= scrollHeight - 10) {
                setVisibleFontCount((prev) => prev + 20);
              }
            }}
          >
            <SelectGroup>
              <SelectItem value='Pretendard'>
                <span style={{ fontFamily: 'Pretendard' }}>Pretendard</span>
              </SelectItem>
              {fontItems}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}

      {/* 크기 조절 */}
      <div className='flex w-full flex-row gap-2'>
        <div className='flex h-[40px] w-[77px] flex-row items-center justify-center rounded border'>
          <TextMinusIcon
            onClick={handleDecrementFontSize}
            className='cursor-pointer'
          />
          <span className='mx-0.5 border-x px-[6px] py-[5px] text-[12px]'>
            {selectedTextElement?.fontSize}
          </span>
          <TextPlusIcon
            onClick={handleIncrementFontSize}
            className='cursor-pointer'
          />
        </div>

        {/* 4가지 스타일 옵션 */}
        <div className='flex h-10 w-[118px] flex-row items-center justify-center rounded border'>
          <button
            onClick={() => handleToggleStyle('isBold')}
            className={`flex h-full w-8 items-center justify-center px-[6px] py-[6px] ${
              selectedTextElement?.isBold ? 'bg-gray-200' : ''
            }`}
          >
            <TextBoldIcon />
          </button>

          <button
            onClick={() => handleToggleStyle('isItalic')}
            className={`flex h-full w-8 items-center justify-center px-[6px] py-[6px] ${
              selectedTextElement?.isItalic ? 'bg-gray-200' : ''
            }`}
          >
            <TextItalicIcon />
          </button>

          <button
            onClick={() => handleToggleStyle('isUnderline')}
            className={`flex h-full w-8 items-center justify-center px-[6px] py-[6px] ${
              selectedTextElement?.isUnderline ? 'bg-gray-200' : ''
            }`}
          >
            <TextUnderLineIcon />
          </button>

          <button
            onClick={() => handleToggleStyle('isStrike')}
            className={`flex h-full w-8 items-center justify-center px-[6px] py-[6px] ${
              selectedTextElement?.isStrike ? 'bg-gray-200' : ''
            }`}
          >
            <TextStrikeIcon />
          </button>
        </div>
      </div>

      {/* 텍스트 위치 조절 */}
      <div className='mx-[6px] flex flex-row items-center justify-center space-x-[14px]'>
        <button onClick={handleCycleAlign}>
          {ALIGN_ICONS[selectedTextElement?.align ?? 'left']}
        </button>

        <button onClick={handleCycleVerticalAlign}>
          {VERTICAL_ALIGN_ICONS[selectedTextElement?.verticalAlign ?? 'top']}
        </button>

        <Icon
          icon='tdesign:list'
          width='20'
          height='20'
          className='cursor-pointer'
          onClick={sweetComingSoonAlert}
        />

        <div className='h-6 w-[1px] bg-gray-10'></div>
        {/* 글자색 */}
        <Popover>
          <PopoverTrigger asChild>
            <div className='flex cursor-pointer flex-col items-center'>
              <span className='text-base leading-none'>A</span>
              <div
                className='mt-[1px] h-[6px] w-[20px] rounded-sm border'
                style={{
                  backgroundColor: selectedTextElement?.fill || '#000000',
                  borderColor:
                    selectedTextElement?.fill === 'transparent'
                      ? '#ccc'
                      : selectedTextElement?.fill,
                }}
              />
            </div>
          </PopoverTrigger>
          <PopoverContent className='z-[9999] w-auto p-2'>
            <ColorPicker
              selectedColor={selectedTextElement?.fill || '#000000'}
              onColorChange={(color) => {
                updateElement(selectedTextElement!.id, { fill: color });
              }}
              title='글자 색상'
            />
          </PopoverContent>
        </Popover>

        {/* 글자 배경 */}
        <Icon
          icon='tdesign:fill-color-filled'
          width='20'
          height='20'
          className='cursor-pointer'
          onClick={sweetComingSoonAlert}
        />
      </div>
    </div>
  );
};

export default TextStyleSidebar;
