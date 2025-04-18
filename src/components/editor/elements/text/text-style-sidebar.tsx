import LinkIcon from '@/components/icons/editor/link-icon';
import TextAlignBottomIcon from '@/components/icons/editor/text/text-align-bottom';
import TextAlignTopIcon from '@/components/icons/editor/text/text-align-top';
import TextAlignVerticalIcon from '@/components/icons/editor/text/text-align-vertical';
import TextBoldIcon from '@/components/icons/editor/text/text-bold-icon';
import TextItalicIcon from '@/components/icons/editor/text/text-italic-icon';
import TextLineHeightIcon from '@/components/icons/editor/text/text-line-height-icon';
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
import React, { ChangeEvent, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { TextElement } from '@/types/editor.type';

const SketchPicker = dynamic(
  () => import('react-color').then((mod) => mod.SketchPicker),
  { ssr: false }
);

const ALIGN_TYPES: Array<'left' | 'center' | 'right' | 'both'> = [
  'left',
  'center',
  'right',
  'both',
];

const ALIGN_ICONS = {
  left: <TextStateAlignLeftIcon />,
  center: <TextStateAlignCenterIcon />,
  right: <TextStateAlignRightIcon />,
  both: <TextStateAlignBothIcon />,
};

const VERTICAL_ALIGN_TYPES: Array<'top' | 'middle' | 'bottom'> = [
  'top',
  'middle',
  'bottom',
];

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
  const [showColorPicker, setShowColorPicker] = useState(false);

  /**
   * 현재 선택된 텍스트 요소 가져오기
   */
  const selectedTextElement = useMemo((): TextElement | undefined => {
    return canvasElements.find(
      (el) => el.id === selectedElementId && el.type === 'text'
    ) as TextElement | undefined;
  }, [canvasElements, selectedElementId]);

  /**
   * 텍스트 스타일 변경 핸들러
   */
  const handleTextStyleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    if (!selectedElementId) return;
    const { name, value } = e.target;

    updateElement(selectedElementId, { [name]: value });
  };

  /**
   * 텍스트 스타일 속성 토글 핸들러
   * @param property - 토글할 스타일 속성 이름
   */
  const handleToggleStyle = (
    property: 'isBold' | 'isItalic' | 'isUnderline' | 'isStrike'
  ) => {
    if (!selectedElementId || !selectedTextElement) return;
    updateElement(selectedElementId, {
      [property]: !selectedTextElement[property],
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
        <LinkIcon />
      </div>

      <select
        id='fontFamily'
        name='fontFamily'
        onChange={handleTextStyleChange}
        className='w-full rounded border px-2 py-1'
        value={selectedTextElement?.fontFamily || 'Arial'}
      >
        <option value='pretendard'>Pretendard</option>
        <option value='Arial'>Arial</option>
        <option value='Nanum Gothic'>나눔고딕</option>
      </select>

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

      <div className='mx-[6px] flex flex-row items-center justify-center space-x-3'>
        <button onClick={handleCycleAlign}>
          {ALIGN_ICONS[selectedTextElement?.align ?? 'left']}
        </button>

        <button onClick={handleCycleVerticalAlign}>
          {VERTICAL_ALIGN_ICONS[selectedTextElement?.verticalAlign ?? 'top']}
        </button>

        <TextLineHeightIcon className='h-[20px] w-[20px]' />
        <Icon icon='tdesign:list' width='20' height='20' />
        <div className='h-6 w-[1px] bg-gray-10'></div>
        <Icon
          icon='tdesign:textformat-color'
          width='20'
          height='20'
          onClick={() => setShowColorPicker((prev) => !prev)}
          className='cursor-pointer'
        />
        <Icon
          icon='tdesign:fill-color-filled'
          width='20'
          height='20'
          className='cursor-pointer'
        />
      </div>

      {showColorPicker && selectedTextElement && (
        <div>
          <SketchPicker
            color={selectedTextElement.fill || '#000000'}
            onChangeComplete={(color) => {
              updateElement(selectedTextElement.id, { fill: color.hex });
            }}
          />
        </div>
      )}
    </div>
  );
};

export default TextStyleSidebar;
