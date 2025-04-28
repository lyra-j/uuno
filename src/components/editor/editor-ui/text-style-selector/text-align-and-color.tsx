import React from 'react';

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import {
  ALIGN_TYPES,
  VERTICAL_ALIGN_TYPES,
  DEFAULT_COLOR,
} from '@/constants/editor.constant';
import { Icon } from '@iconify/react';
import ColorPicker from '@/components/editor/editor-ui/color-picker';
import { TextElement } from '@/types/editor.type';
import { sweetComingSoonAlert } from '@/utils/common/sweet-coming-soon-alert';
import TextStateAlignLeftIcon from '@/components/icons/editor/text/text-state-align-left';
import TextStateAlignCenterIcon from '@/components/icons/editor/text/text-state-align-center';
import TextStateAlignRightIcon from '@/components/icons/editor/text/text-state-align-right';
import TextStateAlignBothIcon from '@/components/icons/editor/text/text-state-align-both';
import TextAlignTopIcon from '@/components/icons/editor/text/text-align-top';
import TextAlignVerticalIcon from '@/components/icons/editor/text/text-align-vertical';
import TextAlignBottomIcon from '@/components/icons/editor/text/text-align-bottom';
import { useEditorStore } from '@/store/editor.store';
import TextLineHeightIcon from '@/components/icons/editor/text/text-line-height-icon';

const ALIGN_ICONS = {
  left: <TextStateAlignLeftIcon />,
  center: <TextStateAlignCenterIcon />,
  right: <TextStateAlignRightIcon />,
  justify: <TextStateAlignBothIcon />,
};

const VERTICAL_ALIGN_ICONS = {
  top: <TextAlignTopIcon className='h-5 w-5' />,
  middle: <TextAlignVerticalIcon className='h-5 w-5' />,
  bottom: <TextAlignBottomIcon className='h-5 w-5' />,
};

const numberPattern = /^\s*\d+\.\s*/;

interface TextAlignAndColorProps {
  selectedTextElement: TextElement;
}

const TextAlignAndColor = ({ selectedTextElement }: TextAlignAndColorProps) => {
  const selectedElementId = useEditorStore((state) => state.selectedElementId);
  const updateElement = useEditorStore((state) => state.updateElement);

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
    const hasNumbers = lines.every((line) => numberPattern.test(line));

    const newText = lines
      .map((line, index) =>
        hasNumbers
          ? line.replace(numberPattern, '')
          : `${index + 1}. ${line.replace(numberPattern, '')}`
      )
      .join('\n');

    updateElement(selectedElementId, { text: newText });
  };

  return (
    <div className='mx-[6px] flex flex-row items-center justify-center space-x-[14px]'>
      <button onClick={handleCycleAlign}>
        {ALIGN_ICONS[selectedTextElement?.align ?? 'left']}
      </button>

      {/* @TODO 높이조절 생기면 다시 살리기 */}
      {/* <button onClick={handleCycleVerticalAlign}>
        {VERTICAL_ALIGN_ICONS[selectedTextElement?.verticalAlign ?? 'top']}
      </button> */}
      <button onClick={sweetComingSoonAlert}>
        {VERTICAL_ALIGN_ICONS[selectedTextElement?.verticalAlign ?? 'top']}
      </button>

      <TextLineHeightIcon
        onClick={sweetComingSoonAlert}
        className='h-[20px] w-[20px] cursor-pointer'
      />
      <Icon
        icon='tdesign:list'
        width='20'
        height='20'
        className='cursor-pointer'
        onClick={handleToggleOrderedList}
      />

      <div className='h-6 w-[1px] bg-gray-10' />
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
        <PopoverContent className='z-[10] w-auto p-2'>
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
  );
};

export default TextAlignAndColor;
