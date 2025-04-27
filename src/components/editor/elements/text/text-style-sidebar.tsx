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
import {
  ALIGN_TYPES,
  DEFAULT_COLOR,
  DEFAULT_FONT,
  VERTICAL_ALIGN_TYPES,
} from '@/constants/editor.constant';
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
import { Slider } from '@/components/ui/slider';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { useStageRefStore } from '@/store/editor.stage.store';
import Konva from 'konva';

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
  const setEditingElementId = useEditorStore(
    (state) => state.setEditingElementId
  );
  const updateElement = useEditorStore((state) => state.updateElement);

  const stageRef = useStageRefStore((state) => state.stageRef);
  const [fonts, setFonts] = useState<string[]>([]);

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
    return fonts.map((family) => (
      <SelectItem key={family} value={family}>
        <span style={{ fontFamily: family }}>{family}</span>
      </SelectItem>
    ));
  }, [fonts]);

  /**
   * 폰트 변경 핸들러
   */
  const handleFontChange = (fontFamily: string) => {
    if (!selectedElementId) return;

    const refreshKonvaCache = () => {
      const stage = stageRef?.current;
      if (!stage) return;
      const node = stage.findOne(`#${selectedElementId}`);
      if (node?.getClassName() === 'Text') {
        const textnode = node as Konva.Text;
        const old = textnode.text();
        textnode.text('');
        textnode.text(old);
      }
      stage.batchDraw();
    };

    const loadFont = () => {
      // 폰트 로드
      if (!loadedFonts.current.has(fontFamily)) {
        import('webfontloader')
          .then((WebFont) => {
            WebFont.load({
              google: { families: [fontFamily] },
              active: () => {
                loadedFonts.current.add(fontFamily);
                refreshKonvaCache();
              },
            });
          })
          .catch(console.error);
      } else {
        requestAnimationFrame(() => {
          refreshKonvaCache(); // 중복 제거
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

  /**
   * 글머리 추가
   */
  const handleToggleOrderedList = () => {
    if (!selectedElementId || !selectedTextElement) return;

    const lines = selectedTextElement.text.split('\n');
    const hasNumbers = lines.every((line) => /^\s*\d+\.\s*/.test(line));

    const newText = lines
      .map((line, index) =>
        hasNumbers
          ? line.replace(/^\s*\d+\.\s*/, '')
          : `${index + 1}. ${line.replace(/^\s*\d+\.\s*/, '')}`
      )
      .join('\n');

    updateElement(selectedElementId, { text: newText });
  };

  const handleShadowOpacityChange = (value: number[]) => {
    if (!selectedElementId || !selectedTextElement) return;
    updateElement(selectedElementId, {
      shadowOpacity: value[0] / 100,
    });
  };

  const handleShadowBlurChange = (value: number[]) => {
    if (!selectedElementId || !selectedTextElement) return;
    updateElement(selectedElementId, {
      shadowBlur: value[0],
    });
  };

  const handleShadowOffsetXChange = (value: number[]) => {
    if (!selectedElementId || !selectedTextElement) return;
    updateElement(selectedElementId, {
      shadowOffsetX: value[0],
    });
  };

  const handleShadowOffsetYChange = (value: number[]) => {
    if (!selectedElementId || !selectedTextElement) return;
    updateElement(selectedElementId, {
      shadowOffsetY: value[0],
    });
  };

  const handleShadowColorChange = (color: string) => {
    if (!selectedElementId || !selectedTextElement) return;
    updateElement(selectedElementId, { shadowColor: color });
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
          <SelectContent className='max-h-60 overflow-auto'>
            <SelectGroup>
              <SelectItem value={DEFAULT_FONT}>
                <span style={{ fontFamily: DEFAULT_FONT }}>Pretendard</span>
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
          onClick={handleToggleOrderedList}
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
                  backgroundColor: selectedTextElement?.fill || DEFAULT_COLOR,
                  borderColor:
                    selectedTextElement?.fill === 'transparent'
                      ? '#ccc'
                      : selectedTextElement?.fill,
                }}
              />
            </div>
          </PopoverTrigger>
          <PopoverContent className='z-[50] w-auto p-2'>
            <ColorPicker
              selectedColor={selectedTextElement?.fill || DEFAULT_COLOR}
              onColorChange={(color) => {
                if (!selectedTextElement || !selectedElementId) return;
                updateElement(selectedElementId, { fill: color });
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

      {/* 그림자 조절 */}
      <Accordion type='single' collapsible>
        <AccordionItem value='shadow'>
          <AccordionTrigger>그림자</AccordionTrigger>
          <AccordionContent>
            {/* 색상 Popover */}
            <div className='mb-2 flex items-center gap-2'>
              <span className='text-sm text-gray-500'>색상</span>
              <Popover>
                <PopoverTrigger asChild>
                  <div className='flex cursor-pointer flex-col items-center'>
                    <div
                      className='h-6 w-6 rounded border'
                      style={{
                        backgroundColor:
                          selectedTextElement?.shadowColor || '#000000',
                        borderColor:
                          selectedTextElement?.shadowColor === 'transparent'
                            ? '#ccc'
                            : selectedTextElement?.shadowColor || '#000000',
                      }}
                    />
                  </div>
                </PopoverTrigger>
                <PopoverContent className='z-[50] w-auto p-2'>
                  <ColorPicker
                    selectedColor={
                      selectedTextElement?.shadowColor || '#000000'
                    }
                    onColorChange={handleShadowColorChange}
                    title='그림자 색상'
                  />
                </PopoverContent>
              </Popover>
            </div>
            {/* X offset */}
            <div className='mb-2 flex items-center gap-2'>
              <span className='text-sm text-gray-500'>X</span>
              <input
                type='number'
                value={selectedTextElement?.shadowOffsetX || 0}
                onChange={(e) => handleShadowOffsetXChange([+e.target.value])}
                className='w-12 rounded border px-1 text-center'
              />
              <Slider
                value={[selectedTextElement?.shadowOffsetX || 0]}
                min={-50}
                max={50}
                step={1}
                onValueChange={handleShadowOffsetXChange}
                className='w-32'
              />
            </div>

            {/* Y offset */}
            <div className='mb-2 flex items-center gap-2'>
              <span className='text-sm text-gray-500'>Y</span>
              <input
                type='number'
                value={selectedTextElement?.shadowOffsetY || 0}
                onChange={(e) => handleShadowOffsetYChange([+e.target.value])}
                className='w-12 rounded border px-1 text-center'
              />
              <Slider
                value={[selectedTextElement?.shadowOffsetY || 0]}
                min={-50}
                max={50}
                step={1}
                onValueChange={handleShadowOffsetYChange}
                className='w-32'
              />
            </div>
            {/* 흐림 */}
            <div className='mb-2 flex items-center gap-2'>
              <span className='text-sm text-gray-500'>흐림</span>
              <input
                type='number'
                value={selectedTextElement?.shadowBlur || 0}
                onChange={(e) =>
                  handleShadowBlurChange([Number(e.target.value)])
                }
                className='w-12 rounded border px-1 text-center'
              />
              <Slider
                value={[selectedTextElement?.shadowBlur || 0]}
                max={50}
                step={1}
                onValueChange={handleShadowBlurChange}
                className='w-32'
              />
            </div>
            {/* 투명도 */}
            <div className='flex items-center gap-2'>
              <span className='text-sm text-gray-500'>투명도</span>
              <input
                type='number'
                value={Math.round(
                  (selectedTextElement?.shadowOpacity || 0) * 100
                )}
                onChange={(e) =>
                  handleShadowOpacityChange([Number(e.target.value)])
                }
                className='w-12 rounded border px-1 text-center'
              />
              <span className='text-sm text-gray-500'>%</span>
              <Slider
                value={[(selectedTextElement?.shadowOpacity || 0) * 100]}
                max={100}
                step={1}
                onValueChange={handleShadowOpacityChange}
                className='w-32'
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default TextStyleSidebar;
