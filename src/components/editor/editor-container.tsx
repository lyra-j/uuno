'use client';

import {
  ImageElement,
  QrElement,
  TextElement,
  UploadElement,
  useEditorStore,
} from '@/store/editor.store';
import Konva from 'konva';
import { useEffect, useMemo, useRef } from 'react';
import { Layer, Rect, Stage, Transformer } from 'react-konva';
import { ElEMENT_TYPE, TOOLBAR_WIDTH } from '@/constants/editor.constant';
import { sideBarStore } from '@/store/editor.sidebar.store';
import ElementToolbar from './editor-ui/element-toolbar/editor-element-toolbar';
import UnsplashImageElement from './elements/images/element-image-canvas';
import QrCanvasElement from './elements/qr-social/element-qr-canvas';
import TextCanvasElement from './elements/text/element-text-canvas';
import UploadImageElement from './elements/uploads/element-upload-canvas';
import TextEditContent from './elements/text/text-edit-content';
import { SwitchCase } from '../common/switch-case';

const EditorContainer = () => {
  const canvasElements = useEditorStore((state) => state.canvasElements);
  const selectedElementId = useEditorStore((state) => state.selectedElementId);
  const editingElementId = useEditorStore((state) => state.editingElementId);
  const updateElement = useEditorStore((state) => state.updateElement);
  const setSelectedElementId = useEditorStore(
    (state) => state.setSelectedElementId
  );
  const setEditingElementId = useEditorStore(
    (state) => state.setEditingElementId
  );
  const setToolbar = useEditorStore((state) => state.setToolbar);
  const setSelectedElementType = useEditorStore(
    (state) => state.setSelectedElementType
  );
  const backgroundColor = useEditorStore((state) => state.backgroundColor);
  const setSideBarStatus = sideBarStore((state) => state.setSideBarStatus);
  const zoom = sideBarStore((state) => state.zoom);
  const setZoom = sideBarStore((state) => state.setZoom);

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
        x: rect.x + rect.width / 2 - TOOLBAR_WIDTH / 2,
        y: rect.y + rect.height + 8,
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

  const handleWheel = (e: Konva.KonvaEventObject<WheelEvent>) => {
    if (!e.evt.ctrlKey) return;
    e.evt.preventDefault();

    const scaleBy = 1.1;
    const direction = e.evt.deltaY > 0 ? -1 : 1;
    const newZoom = zoom * (direction > 0 ? scaleBy : 1 / scaleBy);

    const clampedZoom = Math.min(Math.max(newZoom, 0.3), 3);
    setZoom(clampedZoom);
  };

  return (
    <div
      className={`flex flex-col items-center justify-center bg-white p-[18px]`}
      style={{
        boxShadow: '1px 1px 4px 1px rgba(0, 0, 0, 0.25)',
        width: `${642 * zoom}px`,
        height: `${362 * zoom}px`,
      }}
    >
      <Stage
        style={{ border: '1px dashed var(--Gray-60, #878A93)' }}
        width={606 * zoom}
        height={326 * zoom}
        scale={{ x: zoom, y: zoom }}
        onWheel={handleWheel}
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
          <Rect
            x={0}
            y={0}
            width={606}
            height={326}
            fill={backgroundColor || '#ffffff'}
            listening={false}
          />
          {canvasElements.map((el) => (
            <SwitchCase
              key={el.id}
              value={el.type}
              cases={{
                [ElEMENT_TYPE.TEXT]: (
                  <TextCanvasElement
                    element={el as TextElement}
                    onDragEnd={(id, node) => {
                      updateElement(id, { x: node.x(), y: node.y() });
                      handleUpdateToolbarNode(node);
                    }}
                    onDragMove={(node) => {
                      handleUpdateToolbarNode(node);
                    }}
                    onTransformEnd={handleTransformEnd}
                    onDoubleClick={handleTextDoubleClick}
                    onSelect={(id, node) => {
                      setSelectedElementId(id);
                      handleUpdateToolbarNode(node);
                      setSelectedElementType(el.type);
                      setSideBarStatus(true);
                    }}
                    editing={editingElementId === el.id}
                    ref={(node: Konva.Node | null) => {
                      if (node) {
                        shapeRefs.current[el.id] = node;
                      }
                    }}
                  />
                ),
                [ElEMENT_TYPE.UPLOAD]: (
                  <UploadImageElement
                    element={el as UploadElement}
                    onDragEnd={(id, node) => {
                      updateElement(id, { x: node.x(), y: node.y() });
                      handleUpdateToolbarNode(node);
                    }}
                    onDragMove={(node) => {
                      handleUpdateToolbarNode(node);
                    }}
                    onTransformEnd={handleTransformEnd}
                    onSelect={(id, node) => {
                      setSelectedElementId(id);
                      handleUpdateToolbarNode(node);
                      setSelectedElementType(el.type);
                      setSideBarStatus(true);
                    }}
                    ref={(node: Konva.Node | null) => {
                      if (node) {
                        shapeRefs.current[el.id] = node;
                      }
                    }}
                  />
                ),
                [ElEMENT_TYPE.IMAGE]: (
                  <UnsplashImageElement
                    element={el as ImageElement}
                    onDragEnd={(id, node) => {
                      updateElement(id, { x: node.x(), y: node.y() });
                      handleUpdateToolbarNode(node);
                    }}
                    onDragMove={(node) => {
                      handleUpdateToolbarNode(node);
                    }}
                    onTransformEnd={handleTransformEnd}
                    onSelect={(id, node) => {
                      setSelectedElementId(id);
                      handleUpdateToolbarNode(node);
                      setSelectedElementType(el.type);
                      setSideBarStatus(true);
                    }}
                    ref={(node: Konva.Node | null) => {
                      if (node) {
                        shapeRefs.current[el.id] = node;
                      }
                    }}
                  />
                ),
                [ElEMENT_TYPE.QR]: (
                  <QrCanvasElement
                    element={el as QrElement}
                    onDragEnd={(id, node) => {
                      updateElement(id, { x: node.x(), y: node.y() });
                      handleUpdateToolbarNode(node);
                    }}
                    onDragMove={(node) => {
                      handleUpdateToolbarNode(node);
                    }}
                    onTransformEnd={handleTransformEnd}
                    onSelect={(id, node) => {
                      setSelectedElementId(id);
                      handleUpdateToolbarNode(node);
                      setSelectedElementType(el.type);
                      setSideBarStatus(true);
                    }}
                    ref={(node: Konva.Node | null) => {
                      if (node) {
                        shapeRefs.current[el.id] = node;
                      }
                    }}
                  />
                ),
              }}
              default={<></>}
            />
          ))}
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
          <ElementToolbar />
        </Layer>
      </Stage>
    </div>
  );
};

export default EditorContainer;
