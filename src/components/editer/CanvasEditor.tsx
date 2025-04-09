'use client';
import React, { useRef, useEffect, useState, ChangeEvent } from 'react';
import { Stage, Layer, Rect, Text, Transformer } from 'react-konva';
import Konva from 'konva';
import { v4 } from 'uuid';
import TextEditContent from './TextEditContent';

/**
 * 캔버스에 추가할 텍스트 요소
 */
export interface TextElement {
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
  const [elements, setElements] = useState<TextElement[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Transformer 컴포넌트에 대한 ref (드래그, 변환 UI 관리)
  const transformerRef = useRef<Konva.Transformer | null>(null);
  // 각 텍스트 노드에 대한 ref를 저장
  const shapeRefs = useRef<Record<string, Konva.Text>>({});

  const containerRef = useRef<HTMLDivElement>(null);

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
   * 텍스트를 추가하는 핸들러  (추 후 상수화 처리해야됨)
   * @param textContent - 버튼 별로 다른 텍스트 내용
   * @param fontSize - 버튼 별로 다른 폰트 크기
   */
  const handleAddText = (textContent: string, fontSize: number): void => {
    const newId: string = v4();
    const newText: TextElement = {
      id: newId,
      type: 'text',
      text: textContent,
      x: 0,
      y: 0,
      rotation: 0,
      fontSize: fontSize,
      fill: '#000000',
      fontFamily: 'Arial',
    };

    setElements((prev) => [...prev, newText]);
    setSelectedId(newId);
    setTimeout(() => {
      setEditingId(newId);
    }, 0);
  };

  /**
   * 텍스트 스타일 변경 핸들러
   */
  const handleStyleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    if (!selectedId) return;
    const { name, value } = e.target;

    setElements((prev) =>
      prev.map((el) => (el.id === selectedId ? { ...el, [name]: value } : el))
    );
  };

  /**
   * 폰트 크기를 -1 해주는 버튼 핸들러
   */
  const handleDecrementFontSize = () => {
    if (!selectedId) return;
    setElements((prev) =>
      prev.map((el) =>
        el.id === selectedId
          ? {
              ...el,
              fontSize: Math.max(5, el.fontSize - 1),
            }
          : el
      )
    );
  };

  /**
   * 폰트 크기를 +1 해주는 버튼 핸들러
   */
  const handleIncrementFontSize = () => {
    if (!selectedId) return;
    setElements((prev) =>
      prev.map((el) =>
        el.id === selectedId ? { ...el, fontSize: el.fontSize + 1 } : el
      )
    );
  };

  /**
   * 현재 선택된 텍스트 요소 가져오기
   */
  const getSelectedElement = (): TextElement | undefined => {
    return elements.find((el) => el.id === selectedId);
  };

  /**
   * 텍스트 변환 종료 시 업데이트
   *
   * @param  id - 변환된 요소의 id.
   * @param  e - 변환 종료 이벤트 객체
   */
  const handleTransformEnd = (
    id: string,
    e: Konva.KonvaEventObject<Event>
  ): void => {
    const node = e.target;
    const scaleX = node.scaleX();
    node.scaleX(1);
    node.scaleY(1);
    setElements((prev) =>
      prev.map((el) =>
        el.id === id
          ? {
              ...el,
              x: node.x(),
              y: node.y(),
              width: Math.max(10, node.width() * scaleX),
              rotation: node.rotation(),
            }
          : el
      )
    );
  };

  // 더블 클릭 시 인라인 편집 모드 전환
  const handleTextDblClick = (id: string) => {
    setSelectedId(id);
    setEditingId(id);
  };

  // 인라인 편집 완료 후 텍스트 업데이트
  const handleTextEditSubmit = (newText: string) => {
    setElements((prev) =>
      prev.map((el) => (el.id === editingId ? { ...el, text: newText } : el))
    );
    setEditingId(null);
  };

  return (
    <div className='flex h-[calc(100vh-64px)] w-full flex-col'>
      <div className='flex flex-1 flex-row'>
        {/* 왼쪽 사이드바 */}
        <div className='w-64 space-y-4 bg-gray-100 p-4'>
          {/* 제목 텍스트 추가 버튼 */}
          <button
            className='w-full rounded bg-blue-500 px-4 py-2 text-white'
            onClick={() => handleAddText('제목 텍스트를 입력하세요.', 16)}
          >
            제목 텍스트 추가
          </button>

          {/* 부제목 텍스트 추가 버튼 */}
          <button
            className='w-full rounded bg-blue-500 px-4 py-2 text-white'
            onClick={() => handleAddText('부제목 텍스트를 입력하세요.', 12)}
          >
            부제목 텍스트 추가
          </button>

          {/* 본문 텍스트 추가 버튼 */}
          <button
            className='w-full rounded bg-blue-500 px-4 py-2 text-white'
            onClick={() => handleAddText('본문 텍스트를 입력하세요.', 10)}
          >
            본문 텍스트 추가
          </button>

          {/* 선택된 텍스트가 있을 때만 보이도록 */}
          {selectedId && (
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
                    onChange={handleStyleChange}
                    value={getSelectedElement()?.fill || '#000000'}
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
                    <span>{getSelectedElement()?.fontSize}</span>
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
                    onChange={handleStyleChange}
                    className='border px-2 py-1'
                    value={getSelectedElement()?.fontFamily || 'Arial'}
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
        <div
          ref={containerRef}
          className='relative flex flex-1 items-center justify-center bg-white'
        >
          <Stage width={800} height={600} className='border-2'>
            <Layer>
              <Rect
                x={0}
                y={0}
                fill='#f9f9f9'
                onMouseDown={() => {
                  setSelectedId(null);
                  setEditingId(null);
                }}
              />
              {elements.map((el) =>
                el.type === 'text' ? (
                  <Text
                    key={el.id}
                    {...el}
                    draggable
                    onClick={() => setSelectedId(el.id)}
                    onTap={() => setSelectedId(el.id)}
                    onDblClick={() => handleTextDblClick(el.id)}
                    onDblTap={() => handleTextDblClick(el.id)}
                    onTransformEnd={(e) => handleTransformEnd(el.id, e)}
                    ref={(node) => {
                      if (node) {
                        shapeRefs.current[el.id] = node;
                      }
                    }}
                  />
                ) : null
              )}
              <Transformer
                ref={transformerRef}
                enabledAnchors={['middle-left', 'middle-right']}
                rotateEnabled={true}
              />
              {/* 인라인 편집 모드인 경우 InlineTextEditor 렌더링 */}
              {editingId && shapeRefs.current[editingId] && (
                <TextEditContent
                  containerRef={containerRef}
                  textNode={shapeRefs.current[editingId]}
                  initialText={
                    elements.find((el) => el.id === editingId)?.text || ''
                  }
                  onChange={handleTextEditSubmit}
                  onClose={() => setEditingId(null)}
                />
              )}
            </Layer>
          </Stage>
        </div>
      </div>
    </div>
  );
};

export default CanvasEditor;
