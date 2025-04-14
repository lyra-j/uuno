import LinkIcon from '@/components/icons/editor/link-icon';
import TextBoldIcon from '@/components/icons/editor/text-bold-icon';
import TextItalicIcon from '@/components/icons/editor/text-italic-icon';
import TextMinusIcon from '@/components/icons/editor/text-minus-size';
import TextPlusIcon from '@/components/icons/editor/text-plus-size';
import TextStrikeIcon from '@/components/icons/editor/text-strike-icon';
import TextUnderLineIcon from '@/components/icons/editor/text-underline-icon';
import { TextElement, useEditorStore } from '@/store/editor.store';
import React, { ChangeEvent, useMemo } from 'react';

const TextStyleSidebar = () => {
  const canvasElements = useEditorStore((state) => state.canvasElements);
  const selectedElementId = useEditorStore((state) => state.selectedElementId);
  const updateElement = useEditorStore((state) => state.updateElement);

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

  return (
    <div className='space-y-2 px-[18px] py-[14px]'>
      <div className='mb-[14px] flex items-center justify-between'>
        <h3 className='text-xs'>텍스트 속성</h3>
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
        <div className='flex h-[40px] w-[77px] items-center justify-center rounded border'>
          <TextMinusIcon onClick={handleDecrementFontSize} />
          <span className='mx-1/2 border-x px-[6px] py-[5px] text-[12px]'>
            {selectedTextElement?.fontSize}
          </span>
          <TextPlusIcon onClick={handleIncrementFontSize} />
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

      <div>
        <input
          id='fill'
          type='color'
          name='fill'
          onChange={handleTextStyleChange}
          value={selectedTextElement?.fill || '#000000'}
        />
      </div>
    </div>
  );
};

export default TextStyleSidebar;
