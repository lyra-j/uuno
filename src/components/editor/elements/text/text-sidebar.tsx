'use client';
import { TextElement, useEditorStore } from '@/store/editor.store';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { sideBarStore } from '@/store/editor.sidebar.store';
import { TOOLBAR_WIDTH } from '@/constants/editor.constant';

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
    fixedWidth: 180,
    options: {},
  },
  BODY: {
    content: '본문 텍스트를 입력하세요.',
    fontSize: 12,
    fixedWidth: 150,
    options: {},
  },
  COMMON: {
    content: '텍스트를 입력하세요.',
    fontSize: 16,
    fixedWidth: 180,
    options: {},
  },
  COMMON: {
    content: '텍스트를 입력하세요.',
    fontSize: 16,
    fixedWidth: 180,
    options: {},
  },
};

const TextSidebar = () => {
  const setSelectedElementType = useEditorStore(
    (state) => state.setSelectedElementType
  );
  const addText = useEditorStore((state) => state.addElement);
  const setSelectedElementId = useEditorStore(
    (state) => state.setSelectedElementId
  );
  const setToolbar = useEditorStore((state) => state.setToolbar);
  const setSidebarStatus = sideBarStore((status) => status.setSideBarStatus);

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
    const newId: string = uuidv4();

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
    setSelectedElementId(newText.id);
    setSelectedElementType('text');
    setSidebarStatus(true);
    setToolbar({
      x: newText.x + newText.width / 2 - TOOLBAR_WIDTH / 2,
      y: newText.y + fontSize + 8,
    });
  };

  return (
    <div className='w-full space-y-4 p-[18px]'>
      <h2>텍스트 추가</h2>
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

      <button
        className='w-full bg-primary-40 px-4 py-2 text-white'
        onClick={() => {
          const { content, fontSize, fixedWidth, options } =
            TEXT_PRESETS.COMMON;
          handleAddText(content, fontSize, fixedWidth, options);
        }}
      >
        텍스트 추가
      </button>
    </div>
  );
};

export default TextSidebar;
