import { TextElement, useEditorStore } from '@/store/editor.store';
import React, { ChangeEvent, useMemo } from 'react';

const TextStylePanel = () => {
  const textElements = useEditorStore((state) => state.showElements);
  const selectedElementId = useEditorStore((state) => state.selectedElementId);
  const updateText = useEditorStore((state) => state.updateText);

  /**
   * 현재 선택된 텍스트 요소 가져오기
   */
  const selectedTextElement = useMemo((): TextElement | undefined => {
    return textElements.find((el) => el.id === selectedElementId);
  }, [textElements, selectedElementId]);

  /**
   * 텍스트 스타일 변경 핸들러
   */
  const handleTextStyleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    if (!selectedElementId) return;
    const { name, value } = e.target;

    updateText(selectedElementId, { [name]: value });
  };

  /**
   * 폰트 크기를 -1 해주는 버튼 핸들러
   */
  const handleDecrementFontSize = () => {
    if (!selectedElementId || !selectedTextElement) return;
    updateText(selectedElementId, {
      fontSize: Math.max(5, selectedTextElement.fontSize - 1),
    });
  };

  /**
   * 폰트 크기를 +1 해주는 버튼 핸들러
   */
  const handleIncrementFontSize = () => {
    if (!selectedElementId || !selectedTextElement) return;
    updateText(selectedElementId, {
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
    updateText(selectedElementId, {
      [property]: !selectedTextElement[property],
    });
  };

  return (
    <div className='bg-white p-4'>
      <h3 className='mb-4 text-lg font-bold'>텍스트 스타일</h3>
      <div className='grid gap-4'>
        <div className='grid grid-cols-2 items-center'>
          <label>색상</label>
          <input
            id='fill'
            type='color'
            name='fill'
            onChange={handleTextStyleChange}
            value={selectedTextElement?.fill || '#000000'}
          />
        </div>

        <div className='grid grid-cols-2 items-center'>
          <label>폰트 크기</label>
          <div className='flex items-center space-x-2'>
            <button
              className='rounded bg-gray-200 px-2 py-1'
              onClick={handleDecrementFontSize}
            >
              -
            </button>
            <span>{selectedTextElement?.fontSize}</span>
            <button
              className='rounded bg-gray-200 px-2 py-1'
              onClick={handleIncrementFontSize}
            >
              +
            </button>
          </div>
        </div>

        <div className='grid grid-cols-2 items-center'>
          <label>폰트</label>
          <select
            id='fontFamily'
            name='fontFamily'
            onChange={handleTextStyleChange}
            className='border px-2 py-1'
            value={selectedTextElement?.fontFamily || 'Arial'}
          >
            <option value='Arial'>Arial</option>
            <option value='Nanum Gothic'>나눔고딕</option>
          </select>
        </div>
        <div aria-label='토글버튼'>
          <button
            onClick={() => handleToggleStyle('isBold')}
            className={`border px-2 py-1 ${selectedTextElement?.isBold && 'bg-gray-30'}`}
          >
            B
          </button>

          <button
            onClick={() => handleToggleStyle('isItalic')}
            className={`border px-2 py-1 ${selectedTextElement?.isItalic && 'bg-gray-30'}`}
          >
            I
          </button>

          <button
            onClick={() => handleToggleStyle('isUnderline')}
            className={`border px-2 py-1 ${selectedTextElement?.isUnderline && 'bg-gray-30'}`}
          >
            U
          </button>

          <button
            onClick={() => handleToggleStyle('isStrike')}
            className={`border px-2 py-1 ${selectedTextElement?.isStrike && 'bg-gray-30'}`}
          >
            S
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextStylePanel;
