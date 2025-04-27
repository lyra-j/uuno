import React from 'react';
import TextMinusIcon from '@/components/icons/editor/text/text-minus-size';
import TextPlusIcon from '@/components/icons/editor/text/text-plus-size';
import TextBoldIcon from '@/components/icons/editor/text/text-bold-icon';
import TextItalicIcon from '@/components/icons/editor/text/text-italic-icon';
import TextUnderLineIcon from '@/components/icons/editor/text/text-underline-icon';
import TextStrikeIcon from '@/components/icons/editor/text/text-strike-icon';
import { TextElement } from '@/types/editor.type';
import { useEditorStore } from '@/store/editor.store';

interface TextStyleOptionsAndSizeProps {
  selectedTextElement: TextElement;
}

const TextStyleOptionsAndSize = ({
  selectedTextElement,
}: TextStyleOptionsAndSizeProps) => {
  const selectedElementId = useEditorStore((state) => state.selectedElementId);
  const updateElement = useEditorStore((state) => state.updateElement);

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

  return (
    <div className='flex w-full flex-row gap-2'>
      <div className='flex h-[40px] w-[77px] flex-row items-center justify-center rounded border'>
        <TextMinusIcon
          onClick={handleDecrementFontSize}
          className='cursor-pointer'
          aria-label='폰트 크기 감소'
        />
        <span className='mx-0.5 border-x px-[6px] py-[5px] text-[12px]'>
          {selectedTextElement?.fontSize}
        </span>
        <TextPlusIcon
          onClick={handleIncrementFontSize}
          className='cursor-pointer'
          aria-label='폰트 크기 증가'
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
  );
};

export default TextStyleOptionsAndSize;
