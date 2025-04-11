'use client';

import { useEditorStore } from '@/store/editor.store';
import Konva from 'konva';
import { useEffect, useRef } from 'react';
import { Layer, Stage, Text, Transformer } from 'react-konva';
import TextEditContent from './elements/text/text-edit-content';
import { sideBarStore } from '@/store/editor.sidebar.store';
import { Html } from 'react-konva-utils';

interface EditorCanvasProps {
  shapeRefs: React.MutableRefObject<Record<string, Konva.Text>>;
}

const EditorCanvas = ({ shapeRefs }: EditorCanvasProps) => {
  const textElements = useEditorStore((state) => state.showElements);
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
  const toolbar = useEditorStore((state) => state.toolbar);
  const setToolbar = useEditorStore((state) => state.setToolbar);

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
    const node = e.target as Konva.Text;
    const scaleX = node.scaleX();
    node.scaleX(1);
    node.scaleY(1);

    updateText(id, {
      x: node.x(),
      y: node.y(),
      width: Math.max(10, node.width() * scaleX),
      rotation: node.rotation(),
    });

    handleUpdateToolbarNode(node);
  };

  // node의 절대 위치에서 toolbar 좌표 업데이트
  const handleUpdateToolbarNode = (node: Konva.Text) => {
    requestAnimationFrame(() => {
      const rect = node.getClientRect();
      setToolbar({
        x: rect.x + rect.width - 10,
        y: rect.y - 30,
      });
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
   * 사이드바 열기
   */
  const handleOpenSidebar = (id: string) => {
    setSelectedElementId(id);
    if (sidebarStatus === false) setSidebarStatus(true);
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
                  const node = e.target as Konva.Text;
                  setSelectedElementId(el.id);
                  updateText(el.id, {
                    x: node.x(),
                    y: node.y(),
                  });
                  handleUpdateToolbarNode(node);
                }}
                fontStyle={
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
                onMouseDown={() => handleOpenSidebar(el.id)}
                onClick={() => handleOpenSidebar(el.id)}
                onTap={() => handleOpenSidebar(el.id)}
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
                  top: toolbar.y + 'px',
                  left: toolbar.x + 'px',
                  zIndex: 10,
                },
              }}
            >
              <button
                className='text-red-500'
                onClick={() => {
                  removeText(selectedElementId);
                  setSelectedElementId(null);
                  setEditingElementId(null);
                  setToolbar(null);
                }}
              >
                x
              </button>
            </Html>
          )}
        </Layer>
      </Stage>
    </div>
  );
};

export default EditorCanvas;
