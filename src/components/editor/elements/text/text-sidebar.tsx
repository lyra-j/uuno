'use client';
import { TextElement, useEditorStore } from '@/store/editor.store';
import React, { ChangeEvent, useMemo } from 'react';
import { v4 } from 'uuid';

const TEXT_PRESETS = {
  TITLE: {
    content: '제목 텍스트를 입력하세요.',
    fontSize: 18,
    fixedWidth: 200,
    options: { isBold: true },
  },
  SUBTITLE: {
    content: '부제목 텍스트를 입력하세요.',
    fontSize: 14,
    fixedWidth: 150,
    options: {},
  },
  BODY: {
    content: '본문 텍스트를 입력하세요.',
    fontSize: 12,
    fixedWidth: 120,
    options: {},
  },
};

const TextSidebar = () => {
  const textElements = useEditorStore((state) => state.textElements);
  const selectedElementId = useEditorStore((state) => state.selectedElementId);
  const addText = useEditorStore((state) => state.addText);
  const updateText = useEditorStore((state) => state.updateText);
  const setSelectedElementId = useEditorStore(
    (state) => state.setSelectedElementId
  );
  const setToolbar = useEditorStore((state) => state.setToolbar);

  /**
   * 현재 선택된 텍스트 요소 가져오기
   */
  const selectedTextElement = useMemo((): TextElement | undefined => {
    return textElements.find((el) => el.id === selectedElementId);
  }, [textElements, selectedElementId]);

  /**
   *  텍스트를 추가하는 핸들러  (추 후 상수화 처리해야됨)
   * @param textContent  - 버튼 별로 다른 텍스트 내용
   * @param fontSize - 버튼 별로 다른 폰트 크기
   * @param fixedWidth - 버튼 별로 각각의 길이
   * @param options - 현재 bold 처리 추가 (추 후 추가 가능)
   */
  const handleAddText = (
    textContent: string,
    fontSize: number,
    fixedWidth: number,
    options?: Partial<TextElement>
  ): void => {
    const newId: string = v4();

    const newText: TextElement = {
      id: newId,
      type: 'text',
      text: textContent,
      x: 150,
      y: 150,
      rotation: 0,
      width: fixedWidth,
      fontSize: fontSize,
      fill: '#000000',
      fontFamily: 'Arial',
      ...options,
    };

    addText(newText);
    setSelectedElementId(newId);
    setToolbar({
      x: newText.x,
      y: newText.y - 40,
    });
  };

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
    <div className='flex flex-col items-center justify-center space-y-4 p-4'>
      <h1>텍스트 속성</h1>
      <button
        className='w-full bg-gray-50 px-4 py-2 text-white'
        onClick={() => {
          const { content, fontSize, fixedWidth, options } = TEXT_PRESETS.TITLE;
          handleAddText(content, fontSize, fixedWidth, options);
        }}
      >
        제목 텍스트 추가 +
      </button>

      <button
        className='w-full bg-gray-50 px-4 py-2 text-white'
        onClick={() => {
          const { content, fontSize, fixedWidth, options } =
            TEXT_PRESETS.SUBTITLE;
          handleAddText(content, fontSize, fixedWidth, options);
        }}
      >
        부제목 텍스트 추가 +
      </button>

      <button
        className='w-full bg-gray-50 px-4 py-2 text-white'
        onClick={() => {
          const { content, fontSize, fixedWidth, options } = TEXT_PRESETS.BODY;
          handleAddText(content, fontSize, fixedWidth, options);
        }}
      >
        본문 텍스트 추가 +
      </button>

      {/* 선택된 텍스트가 있을 때만 보이도록 추 후 요소들로 변경 */}
      {selectedElementId && (
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
      )}
    </div>
  );
};

export default TextSidebar;
