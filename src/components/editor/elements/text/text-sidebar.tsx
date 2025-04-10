'use client';
import { TextElement, useEditorStore } from '@/store/editor.store';
import React, { ChangeEvent } from 'react';
import { v4 } from 'uuid';

const TextSidebar = () => {
  const textElements = useEditorStore((state) => state.textElements);
  const selectedElementId = useEditorStore((state) => state.selectedElementId);
  const addText = useEditorStore((state) => state.addText);
  const updateText = useEditorStore((state) => state.updateText);
  const setSelectedElementId = useEditorStore(
    (state) => state.setSelectedElementId
  );

  /**
   * 현재 선택된 텍스트 요소 가져오기
   */
  const getSelectedTextElement = (): TextElement | undefined => {
    return textElements.find((el) => el.id === selectedElementId);
  };

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
      x: 0,
      y: 0,
      rotation: 0,
      width: fixedWidth,
      fontSize: fontSize,
      fill: '#000000',
      fontFamily: 'Arial',
      ...options,
    };

    addText(newText);
    setSelectedElementId(newId);
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
    if (!selectedElementId) return;
    const selected = getSelectedTextElement();
    if (!selected) return;
    updateText(selectedElementId, {
      fontSize: Math.max(5, selected.fontSize - 1),
    });
  };

  /**
   * 폰트 크기를 +1 해주는 버튼 핸들러
   */
  const handleIncrementFontSize = () => {
    if (!selectedElementId) return;
    const selected = getSelectedTextElement();
    if (!selected) return;
    updateText(selectedElementId, {
      fontSize: Math.max(5, selected.fontSize + 1),
    });
  };

  /**
   * 텍스트 굵기 조절
   */
  const handleToggleBold = () => {
    if (!selectedElementId) return;
    const selected = getSelectedTextElement();
    if (!selected) return;
    updateText(selectedElementId, { isBold: !selected.isBold });
  };

  /**
   * 텍스트 기울임 조절
   */
  const handleToggleItalic = () => {
    if (!selectedElementId) return;
    const selected = getSelectedTextElement();
    if (!selected) return;
    updateText(selectedElementId, { isItalic: !selected.isItalic });
  };

  /**
   * 텍스트 밑줄 토글
   */
  const handleToggleUnderline = () => {
    if (!selectedElementId) return;
    const selected = getSelectedTextElement();
    if (!selected) return;
    updateText(selectedElementId, { isUnderline: !selected.isUnderline });
  };

  /**
   * 텍스트 취소선 토글
   */
  const handleToggleStrike = () => {
    if (!selectedElementId) return;
    const selected = getSelectedTextElement();
    if (!selected) return;
    updateText(selectedElementId, { isStrike: !selected.isStrike });
  };

  return (
    <div className='w-64 space-y-4 bg-gray-100 p-4'>
      {/* 제목 텍스트 추가 버튼 */}
      <button
        className='w-full rounded bg-blue-500 px-4 py-2 text-white'
        onClick={() =>
          handleAddText('제목 텍스트를 입력하세요.', 16, 200, {
            isBold: true,
          })
        }
      >
        제목 텍스트 추가
      </button>

      {/* 부제목 텍스트 추가 버튼 */}
      <button
        className='w-full rounded bg-blue-500 px-4 py-2 text-white'
        onClick={() => handleAddText('부제목 텍스트를 입력하세요.', 12, 150)}
      >
        부제목 텍스트 추가
      </button>

      {/* 본문 텍스트 추가 버튼 */}
      <button
        className='w-full rounded bg-blue-500 px-4 py-2 text-white'
        onClick={() => handleAddText('본문 텍스트를 입력하세요.', 10, 120)}
      >
        본문 텍스트 추가
      </button>

      {/* 선택된 텍스트가 있을 때만 보이도록 추 후 요소들로 변경 */}
      {selectedElementId && (
        <div className='bg-white p-4'>
          <h3 className='mb-4 text-lg font-bold'>텍스트 스타일</h3>
          <div className='grid gap-4'>
            <div className='grid grid-cols-2 items-center'>
              {/*색상 설정*/}
              <label>색상</label>
              <input
                id='fill'
                type='color'
                name='fill'
                onChange={handleTextStyleChange}
                value={getSelectedTextElement()?.fill || '#000000'}
              />
            </div>

            <div className='grid grid-cols-2 items-center'>
              {/*폰트 크기 설정*/}
              <label>폰트 크기</label>
              <div className='flex items-center space-x-2'>
                <button
                  className='rounded bg-gray-200 px-2 py-1'
                  onClick={handleDecrementFontSize}
                >
                  -
                </button>
                <span>{getSelectedTextElement()?.fontSize}</span>
                <button
                  className='rounded bg-gray-200 px-2 py-1'
                  onClick={handleIncrementFontSize}
                >
                  +
                </button>
              </div>
            </div>

            <div className='grid grid-cols-2 items-center'>
              {/*폰트 종류 설정*/}
              <label>폰트</label>
              <select
                id='fontFamily'
                name='fontFamily'
                onChange={handleTextStyleChange}
                className='border px-2 py-1'
                value={getSelectedTextElement()?.fontFamily || 'Arial'}
              >
                <option value='Arial'>Arial</option>
                <option value='Nanum Gothic'>나눔고딕</option>
              </select>
            </div>
            <div className='flex space-x-2'>
              <button onClick={handleToggleBold} className='px-2 py-1'>
                B
              </button>
              <button onClick={handleToggleItalic} className='px-2 py-1'>
                I
              </button>
              <button onClick={handleToggleUnderline} className='px-2 py-1'>
                U
              </button>
              <button onClick={handleToggleStrike} className='px-2 py-1'>
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
