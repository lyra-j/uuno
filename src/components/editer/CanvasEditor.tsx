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

  // --- 위치변환
  // Transformer 컴포넌트에 대한 ref (드래그, 변환 UI 관리)
  const transformerRef = useRef<Konva.Transformer | null>(null);

  // 각 텍스트 노드에 대한 ref를 저장하는 객체
  const shapeRefs = useRef<Record<string, Konva.Text>>({});

  /**
   * 선택된 요소가 변경될 때 Transformer의 노드를 업데이트
   */
  useEffect(() => {
    const transformer = transformerRef.current;
    if (!transformer) return;
    if (selectedId) {
      const selectedNode = shapeRefs.current[selectedId];
      if (selectedNode) {
        transformer.nodes([selectedNode]);
        transformer.getLayer()?.batchDraw();
      }
    } else {
      transformer.nodes([]);
      transformer.getLayer()?.batchDraw();
    }
  }, [selectedId]);

  //---

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

  //---- 위치 변환

  /**
   * 요소의 변환(드래그, 리사이즈, 회전) 종료 시 호출되는 이벤트 핸들러
   * 요소의 새로운 위치, 크기 및 회전 값을 상태에 업데이트
   *
   * @param {string} id - 변환된 요소의 id.
   * @param {Konva.KonvaEventObject<Event>} e - 변환 종료 이벤트 객체
   */
  const handleTransformEnd = (
    id: string,
    e: Konva.KonvaEventObject<Event>
  ): void => {
    const node = e.target;
    const scaleX = node.scaleX();
    // scale 값을 리셋
    node.scaleX(1);
    node.scaleY(1);
    // 업데이트된 속성을 상태에 반영
    setElements((prev) =>
      prev.map((el) =>
        el.id === id
          ? {
              ...el,
              x: node.x(),
              y: node.y(),
              fontSize: Math.max(5, el.fontSize * scaleX),
              rotation: node.rotation(),
            }
          : el
      )
    );
  };

  // ---

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
                    onTransformEnd={(e) => handleTransformEnd(el.id, e)}
                    ref={(node) => {
                      if (node) {
                        shapeRefs.current[el.id] = node;
                      }
                    }}
                  />
                ) : null
              )}
              <Transformer ref={transformerRef} rotateEnabled={true} />
            </Layer>
          </Stage>
        </div>
      </div>
    </div>
  );
};

export default CanvasEditor;
