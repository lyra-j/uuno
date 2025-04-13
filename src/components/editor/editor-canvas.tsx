'use client';

import {
  TextElement,
  UploadElement,
  useEditorStore,
} from '@/store/editor.store';
import Konva from 'konva';
import { useEffect, useMemo, useRef } from 'react';
import { Layer, Stage, Transformer } from 'react-konva';
import TextEditContent from './elements/text/text-edit-content';
import { Html } from 'react-konva-utils';
import TextCanvasElement from './elements/text/element-text-canvas';
import UploadImageElement from './elements/uploads/element-upload-canvas';
import { ElEMENT_TYPE } from '@/constants/editor.constant';
import { sideBarStore } from '@/store/editor.sidebar.store';

const EditorCanvas = () => {
  const canvasElements = useEditorStore((state) => state.canvasElements);
  const selectedElementId = useEditorStore((state) => state.selectedElementId);
  const editingElementId = useEditorStore((state) => state.editingElementId);
  const updateElement = useEditorStore((state) => state.updateElement);
  const removeElement = useEditorStore((state) => state.removeElement);
  const setSelectedElementId = useEditorStore(
    (state) => state.setSelectedElementId
  );
  const setEditingElementId = useEditorStore(
    (state) => state.setEditingElementId
  );
  const toolbar = useEditorStore((state) => state.toolbar);
  const setToolbar = useEditorStore((state) => state.setToolbar);
  const setSelectedElementType = useEditorStore(
    (state) => state.setSelectedElementType
  );

  //ref
  const transformerRef = useRef<Konva.Transformer | null>(null);
  const shapeRefs = useRef<Record<string, Konva.Node>>({});

  //memoized element
  const editingTextElement = useMemo(() => {
    return canvasElements.find(
      (el) => el.id === editingElementId && el.type === ElEMENT_TYPE.TEXT
    ) as TextElement | undefined;
  }, [canvasElements, editingElementId]);

  const selectedElement = useMemo(() => {
    if (!selectedElementId) return null;
    return canvasElements.find((el) => el.id === selectedElementId) || null;
  }, [canvasElements, selectedElementId]);

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
   * node의 절대 위치에서 toolbar 좌표 업데이트
   */
  const handleUpdateToolbarNode = (node: Konva.Node) => {
    requestAnimationFrame(() => {
      const rect = node.getClientRect();
      setToolbar({
        x: rect.x + rect.width - 10,
        y: rect.y - 30,
      });
    });
  };

  /**
   * 변환 종료 시 업데이트
   */
  const handleTransformEnd = (
    id: string,
    e: Konva.KonvaEventObject<Event>
  ): void => {
    const node = e.target;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    node.scaleX(1);
    node.scaleY(1);

    updateElement(id, {
      x: node.x(),
      y: node.y(),
      width: Math.max(10, node.width() * scaleX),
      height: Math.max(10, node.height() * scaleY),
      rotation: node.rotation(),
    });

    handleUpdateToolbarNode(node);
  };

  /**
   * 더블 클릭 시 편집 모드 실행 핸들러
   * @param id 요소 id
   */
  const handleTextDoubleClick = (id: string) => {
    setSelectedElementId(id);
    setEditingElementId(id);
  };

  // 인라인 편집 완료 후 텍스트 업데이트
  const handleTextEditSubmit = (newText: string) => {
    if (!selectedElementId) return;
    const editingEl = canvasElements.find(
      (el) => el.id === selectedElementId && el.type === ElEMENT_TYPE.TEXT
    ) as TextElement | undefined;
    if (!editingEl) return;
    updateElement(selectedElementId, { text: newText });
    setEditingElementId(null);
  };

  console.log(canvasElements);

  return (
    <div className='relative'>
      <Stage
        width={600}
        height={400}
        onMouseDown={(e) => {
          if (e.target === e.target.getStage()) {
            setSelectedElementId(null);
            setEditingElementId(null);
            setSelectedElementType(null);
          }
        }}
        className='bg-white'
      >
        <Layer>
          {canvasElements.map((el) => {
            if (el.type === ElEMENT_TYPE.TEXT) {
              return (
                <TextCanvasElement
                  key={el.id}
                  element={el as TextElement}
                  onDragEnd={(id, node) => {
                    updateElement(id, { x: node.x(), y: node.y() });
                    handleUpdateToolbarNode(node);
                  }}
                  onTransformEnd={handleTransformEnd}
                  onDoubleClick={handleTextDoubleClick}
                  onSelect={(id, node) => {
                    setSelectedElementId(id);
                    handleUpdateToolbarNode(node);
                    setSelectedElementType(el.type);
                  }}
                  editing={editingElementId === el.id}
                  ref={(node: Konva.Text | null) => {
                    if (node) {
                      shapeRefs.current[el.id] = node;
                    }
                  }}
                />
              );
            } else if (el.type === ElEMENT_TYPE.UPLOAD) {
              return (
                <UploadImageElement
                  key={el.id}
                  element={el as UploadElement}
                  onDragEnd={(id, node) => {
                    updateElement(id, { x: node.x(), y: node.y() });
                    handleUpdateToolbarNode(node);
                  }}
                  onSelect={(id, node) => {
                    setSelectedElementId(id);
                    handleUpdateToolbarNode(node);
                    setSelectedElementType(el.type);
                  }}
                  ref={(node: Konva.Image | null) => {
                    if (node) {
                      shapeRefs.current[el.id] = node;
                    }
                  }}
                />
              );
            }
            return null;
          })}
          <Transformer
            ref={transformerRef}
            enabledAnchors={
              selectedElement?.type === ElEMENT_TYPE.TEXT
                ? ['middle-left', 'middle-right']
                : [
                    'top-left',
                    'top-center',
                    'top-right',
                    'middle-left',
                    'middle-right',
                    'bottom-left',
                    'bottom-center',
                    'bottom-right',
                  ]
            }
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
          {editingElementId &&
            shapeRefs.current[editingElementId] &&
            editingTextElement && (
              <TextEditContent
                textNode={shapeRefs.current[editingElementId] as Konva.Text}
                initialText={editingTextElement.text}
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
                  removeElement(selectedElementId);
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
