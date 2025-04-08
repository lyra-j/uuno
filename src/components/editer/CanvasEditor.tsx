'use client';
import React, { useRef, useEffect, useState, ChangeEvent } from 'react';
import { Stage, Layer, Rect, Text, Transformer } from 'react-konva';
import Konva from 'konva';
import { v4 } from 'uuid';

/**
 * 인터페이스: TextElement
 * 캔버스에 추가할 텍스트 요소의 구조를 정의합니다.
 */
interface TextElement {
  id: string;
  type: 'text';
  text: string;
  x: number;
  y: number;
  rotation: number;
  fontSize: number;
  fill: string;
  fontFamily: string;
}
const CanvasEditor = () => {
  // 텍스트 요소들을 저장
  const [elements, setElements] = useState<TextElement[]>([]);

  // 선택된 요소의 id (선택된 요소가 없으면 null)
  const [selectedId, setSelectedId] = useState<string | null>(null);

  /**
   * 텍스트 요소를 추가하는 함수.
   *
   * @param {string} textContent - 새 텍스트의 초기 내용
   */
  const handleAddText = (textContent: string): void => {
    const newId: string = v4();
    const newText: TextElement = {
      id: newId,
      type: 'text',
      text: textContent,
      x: 100,
      y: 100,
      rotation: 0,
      fontSize: 20,
      fill: '#000000',
      fontFamily: 'Arial',
    };
    // 새 텍스트 요소를 상태에 추가
    setElements((prev) => [...prev, newText]);
  };

  /**
   * 텍스트 스타일을 변경하는 함수
   *
   * @param {ChangeEvent<HTMLInputElement | HTMLSelectElement>} e - 스타일 변경 이벤트
   */
  const handleStyleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    if (!selectedId) return;
    const { name, value } = e.target;

    setElements((prev) =>
      prev.map((el) =>
        el.id === selectedId
          ? { ...el, [name]: name === 'fontSize' ? parseInt(value) : value }
          : el
      )
    );
  };

  return (
    <div className='flex h-[calc(100vh-64px)] w-full flex-col'>
      <div className='flex flex-1 flex-row'>
        {/* 왼쪽 사이드바 */}
        <div className='w-64 space-y-8 bg-gray-100 p-4'>
          <button
            className='w-full rounded bg-blue-500 px-4 py-2 text-white'
            onClick={() => handleAddText('새 텍스트')}
          >
            텍스트 추가
          </button>

          {/* 선택된 텍스트가 있을 때만 보이는 스타일 변경 영역 */}
          {selectedId && (
            <div className='bg-white p-4'>
              <h3 className='mb-4 text-lg font-bold'>텍스트 스타일</h3>
              <div className='grid gap-4'>
                <div className='grid grid-cols-2 items-center'>
                  <label>색상</label>
                  <input
                    id='fill'
                    type='color'
                    name='fill'
                    onChange={handleStyleChange}
                  />
                </div>

                <div className='grid grid-cols-2 items-center'>
                  <label>폰트 크기</label>
                  <input
                    id='fontSize'
                    type='number'
                    name='fontSize'
                    min={10}
                    max={100}
                    onChange={handleStyleChange}
                    className='border-2'
                  />
                </div>

                <div className='grid grid-cols-2 items-center'>
                  <label>폰트</label>
                  <select
                    id='fontFamily'
                    name='fontFamily'
                    onChange={handleStyleChange}
                    className='border px-2 py-1'
                  >
                    <option value='Arial'>Arial</option>
                    <option value='Nanum Gothic'>나눔고딕</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 메인 캔버스 */}
        <div className='relative flex flex-1 items-center justify-center bg-white'>
          <Stage width={800} height={600} className='border-2'>
            <Layer>
              <Rect x={0} y={0} width={800} height={600} fill='#f9f9f9' />
              {elements.map((el) =>
                el.type === 'text' ? (
                  <Text
                    key={el.id}
                    {...el}
                    draggable
                    onClick={() => setSelectedId(el.id)}
                    onTap={() => setSelectedId(el.id)}
                  />
                ) : null
              )}
            </Layer>
          </Stage>
        </div>
      </div>
    </div>
  );
};

export default CanvasEditor;
