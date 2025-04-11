'use client';

import { useEditorStore } from '@/store/editor.store';
import Konva from 'konva';
import { useEffect, useRef, useState } from 'react';
import { Layer, Stage, Text, Transformer } from 'react-konva';
import TextEditContent from './elements/text/text-edit-content';
import { sideBarStore } from '@/store/editor.sidebar.store';
import { Html } from 'react-konva-utils';

interface EditorCanvasProps {
  shapeRefs: React.MutableRefObject<Record<string, Konva.Text>>;
}

const EditorCanvas = ({ shapeRefs }: EditorCanvasProps) => {
  const textElements = useEditorStore((state) => state.textElements);
  const selectedElementId = useEditorStore((state) => state.selectedElementId);
  const editingElementId = useEditorStore((state) => state.editingElementId);
  const updateText = useEditorStore((state) => state.updateText);
  const removeText = useEditorStore((state) => state.removeText);
  const setSelectedElementId = useEditorStore(
    (state) => state.setSelectedElementId
  );
  const setEditingElementId = useEditorStore(
    (state) => state.setEditingElementId
  );
  const sidebarStatus = sideBarStore((status) => status.sidebarStatus);
  const setSidebarStatus = sideBarStore((status) => status.setSideBarStatus);

  const [toolbar, setToolbar] = useState<{ x: number; y: number } | null>(null);

  // Transformer 컴포넌트에 대한 ref
  const transformerRef = useRef<Konva.Transformer | null>(null);

  /**
   * 선택된 요소가 변경될 때 Transformer의 노드를 업데이트
   */
  useEffect(() => {
    const transformer = transformerRef.current;
    if (!transformer) return;
    if (selectedElementId) {
      const selectedNode = shapeRefs.current[selectedElementId];
      if (selectedNode) {
        transformer.nodes([selectedNode]);
        transformer.getLayer()?.batchDraw();
      }
    } else {
      transformer.nodes([]);
      transformer.getLayer()?.batchDraw();
    }
  }, [selectedElementId, shapeRefs]);

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

    updateText(id, {
      x: node.x(),
      y: node.y(),
      width: Math.max(10, node.width() * scaleX),
      rotation: node.rotation(),
    });

    const absPosition = node.getAbsolutePosition();
    setToolbar({
      x: absPosition.x,
      y: absPosition.y - 40,
    });
  };

  /**
   * 더블 클릭 시 편집 모드 실행 핸들러
   * @param id
   */
  const handleTextDoubleClick = (id: string) => {
    setSelectedElementId(id);
    setEditingElementId(id);
  };

  // 인라인 편집 완료 후 텍스트 업데이트
  const handleTextEditSubmit = (newText: string) => {
    if (!selectedElementId) return;
    updateText(selectedElementId, { text: newText });
    setEditingElementId(null);
  };

  /**
   * 요소의 위치가 변경되었을 때 절대 위치값을 업데이트하는 함수
   */
  const handleElementClick = (id: string) => {
    setSelectedElementId(id);

    if (sidebarStatus === false) setSidebarStatus(true);
    const node = shapeRefs.current[id];
    if (node) {
      const absPosition = node.getAbsolutePosition();
      console.log('Absolute Position:', absPosition);
      setToolbar({
        x: absPosition.x,
        y: absPosition.y - 40, // 예: 텍스트보다 살짝 위쪽에 띄우기
      });
    }
  };

  return (
    <div className='relative'>
      <Stage
        width={600}
        height={400}
        onMouseDown={(e) => {
          if (e.target === e.target.getStage()) {
            setSelectedElementId(null);
            setEditingElementId(null);
          }
        }}
        className='bg-white'
      >
        <Layer>
          {textElements.map((el) =>
            el.type === 'text' ? (
              <Text
                key={el.id}
                text={el.text}
                x={el.x}
                y={el.y}
                rotation={el.rotation}
                fontSize={el.fontSize}
                fill={el.fill}
                fontFamily={el.fontFamily}
                width={el.width}
                draggable
                onDragEnd={(e) => {
                  const node = e.target;
                  const id = el.id;
                  if (!selectedElementId) return;
                  setSelectedElementId(id);
                  const absPosition = node.getAbsolutePosition();
                  updateText(selectedElementId, {
                    x: absPosition.x,
                    y: absPosition.y,
                  });
                  setToolbar({
                    x: absPosition.x,
                    y: absPosition.y - 40,
                  });
                }}
                fontStyle={
                  // 예: bold + italic => 'bold italic'
                  // 둘 다 false면 'normal'
                  (el.isBold ? 'bold ' : '') + (el.isItalic ? 'italic' : '') ||
                  'normal'
                }
                textDecoration={[
                  el.isUnderline ? 'underline' : '',
                  el.isStrike ? 'line-through' : '',
                ]
                  .join(' ')
                  .trim()}
                visible={editingElementId !== el.id}
                onMouseDown={() => handleElementClick(el.id)}
                onClick={() => handleElementClick(el.id)}
                onTap={() => handleElementClick(el.id)}
                onDblClick={() => handleTextDoubleClick(el.id)}
                onDblTap={() => handleTextDoubleClick(el.id)}
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
            rotationSnaps={[0, 90, 180, 270]}
            rotationSnapTolerance={30}
            rotateEnabled={true}
            anchorStyleFunc={(anchor) => {
              anchor.scale({ x: 2 / 3, y: 2 / 3 });
              if (anchor.hasName('rotater')) {
                anchor.cornerRadius(50);
              }
            }}
          />
          {editingElementId && shapeRefs.current[editingElementId] && (
            <TextEditContent
              textNode={shapeRefs.current[editingElementId]}
              initialText={
                textElements.find((el) => el.id === editingElementId)?.text ||
                ''
              }
              onChange={handleTextEditSubmit}
              onClose={() => setEditingElementId(null)}
            />
          )}
          {selectedElementId && toolbar && (
            <Html
              divProps={{
                style: {
                  position: 'absolute',
                  top: toolbar.y,
                  left: toolbar.x,
                  zIndex: 10,
                },
              }}
            >
              <button
                onClick={() => {
                  removeText(selectedElementId);
                  setSelectedElementId(null);
                  setEditingElementId(null);
                  setToolbar(null);
                }}
              >
                삭제
              </button>
            </Html>
          )}
        </Layer>
      </Stage>
    </div>
  );
};

export default EditorCanvas;
