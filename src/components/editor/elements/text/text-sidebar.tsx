'use client';
import { useEditorStore } from '@/store/editor.store';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { sideBarStore } from '@/store/editor.sidebar.store';
import { calculateToolbarPosition } from '@/utils/editor/editor-calculate-toolbar-position';
import TextAddIcon from '@/components/icons/editor/text/text-add';
import { TextElement } from '@/types/editor.type';
import { DEFAULT_COLOR, DEFAULT_FONT } from '@/constants/editor.constant';

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
};

const TextSidebar = () => {
  const setSelectedElementType = useEditorStore(
    (state) => state.setSelectedElementType
  );
  const addElement = useEditorStore((state) => state.addElement);
  const setSelectedElementId = useEditorStore(
    (state) => state.setSelectedElementId
  );
  const setToolbar = useEditorStore((state) => state.setToolbar);
  const setSidebarStatus = sideBarStore((status) => status.setSideBarStatus);
  const isHorizontal = sideBarStore((state) => state.isHorizontal);

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
      x: isHorizontal ? 145 : 50,
      y: isHorizontal ? 100 : 150,
      rotation: 0,
      width: fixedWidth,
      fontSize: fontSize,
      fill: DEFAULT_COLOR,
      fontFamily: DEFAULT_FONT,
      padding: 2,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowBlur: 0,
      shadowOpacity: 0,
      shadowColor: DEFAULT_COLOR,
      opacity: 1,
      ...options,
    };

    addElement(newText);
    setSelectedElementId(newText.id);
    setSelectedElementType('text');
    setSidebarStatus(true);
    const zoom = sideBarStore.getState().zoom;

    console.log(newText);
    setToolbar(
      calculateToolbarPosition({
        x: newText.x,
        y: newText.y,
        width: newText.width,
        height: fontSize + newText.padding,
        zoom,
      })
    );
  };

  return (
    <div className='mt-[14px] w-full space-y-[14px] px-[18px]'>
      <h2 className='text-caption-medium'>텍스트 추가</h2>

      <div className='space-y-[6px]'>
        <button
          className='flex w-full items-center justify-between self-stretch rounded bg-gray-5 px-[10px] py-[6px] text-body-bold'
          onClick={() => {
            const { content, fontSize, fixedWidth, options } =
              TEXT_PRESETS.TITLE;
            handleAddText(content, fontSize, fixedWidth, options);
          }}
        >
          <span>제목 텍스트 추가</span>
          <TextAddIcon />
        </button>

        <button
          className='flex w-full items-center justify-between self-stretch rounded bg-gray-5 px-[10px] py-[6px] text-label2-medium'
          onClick={() => {
            const { content, fontSize, fixedWidth, options } =
              TEXT_PRESETS.SUBTITLE;
            handleAddText(content, fontSize, fixedWidth, options);
          }}
        >
          <span>부제목 텍스트 추가</span>
          <TextAddIcon />
        </button>
        <button
          className='flex w-full items-center justify-between self-stretch rounded bg-gray-5 px-[10px] py-[6px] text-caption-regular'
          onClick={() => {
            const { content, fontSize, fixedWidth, options } =
              TEXT_PRESETS.BODY;
            handleAddText(content, fontSize, fixedWidth, options);
          }}
        >
          <span>본문 제목 텍스트 추가</span>
          <TextAddIcon />
        </button>
      </div>

      <button
        className='w-full rounded-[6px] border bg-primary-40 px-4 py-2 text-white'
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
