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

  const styleButtons = [
    { prop: 'isBold', label: '텍스트 굵게', Icon: TextBoldIcon },
    { prop: 'isItalic', label: '텍스트 기울임', Icon: TextItalicIcon },
    { prop: 'isUnderline', label: '텍스트 밑줄', Icon: TextUnderLineIcon },
    { prop: 'isStrike', label: '텍스트 취소선', Icon: TextStrikeIcon },
  ] as const;

  return (
    <div className='flex w-full justify-between'>
      <div className='flex h-10 w-[77px] flex-row items-center justify-center rounded border'>
        <TextMinusIcon
          onClick={handleDecrementFontSize}
          className='cursor-pointer'
          aria-label='폰트 크기 감소'
        />
        <span className='mx-0.5 border-x px-[6px] py-[5px] text-caption-regular'>
          {selectedTextElement?.fontSize}
        </span>
        <TextPlusIcon
          onClick={handleIncrementFontSize}
          className='cursor-pointer'
          aria-label='폰트 크기 증가'
        />
      </div>

      {/* 4가지 스타일 옵션  */}
      <div className='flex h-10 w-[118px] items-center justify-center rounded border'>
        {styleButtons.map(({ prop, label, Icon }) => (
          <button
            key={prop}
            onClick={() => handleToggleStyle(prop)}
            aria-label={label}
            className={`flex h-full w-8 items-center justify-center px-[6px] py-[6px] ${
              selectedTextElement[prop] ? 'bg-gray-200' : ''
            }`}
          >
            <Icon />
          </button>
        ))}
      </div>
    </div>
  );
};

export default TextStyleOptionsAndSize;
