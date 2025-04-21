'use client';

import {
  ImageElement,
  QrElement,
  SocialElement,
  TextElement,
  UploadElement,
} from '@/types/editor.type';
import Konva from 'konva';
import { useEffect, useMemo, useRef } from 'react';
import { Layer, Rect, Stage, Transformer } from 'react-konva';
import {
  BASE_CONTAINER_HEIGHT,
  BASE_CONTAINER_WIDTH,
  BASE_STAGE_HEIGHT,
  BASE_STAGE_WIDTH,
  ElEMENT_TYPE,
  TOOLBAR_WIDTH,
} from '@/constants/editor.constant';
import { sideBarStore } from '@/store/editor.sidebar.store';
import ElementToolbar from './editor-ui/element-toolbar/editor-element-toolbar';
import UnsplashImageElement from './elements/images/element-image-canvas';
import QrCanvasElement from './elements/qr-social/element-qr-canvas';
import TextCanvasElement from './elements/text/element-text-canvas';
import UploadImageElement from './elements/uploads/element-upload-canvas';
import TextEditContent from './elements/text/text-edit-content';
import { SwitchCase } from '../common/switch-case';
import { handleWheel } from '@/utils/editor/editor-scale-event.util';
import SocialCanvasElement from './elements/qr-social/element-social-canvas';
import { useEditorStore } from '@/store/editor.store';
import { useStageRefStore } from '@/store/editor.stage.store';
import { useShallow } from 'zustand/react/shallow';

const ENABLEDANCHORS = {
  TEXT: ['middle-left', 'middle-right'],
  IMAGE: [
    'top-left',
    'top-center',
    'top-right',
    'middle-left',
    'middle-right',
    'bottom-left',
    'bottom-center',
    'bottom-right',
  ],
};

const EditorContainer = () => {
  const {
    isCanvasFront: isFront,
    canvasElements,
    canvasBackElements,
    selectedElementId,
    editingElementId,
    backgroundColor,
    backgroundColorBack,
    updateElement,
    setToolbar,
    setSelectedElementId,
    setEditingElementId,
    setSelectedElementType,
  } = useEditorStore(
    useShallow((state) => ({
      isCanvasFront: state.isCanvasFront,
      canvasElements: state.canvasElements,
      canvasBackElements: state.canvasBackElements,
      selectedElementId: state.selectedElementId,
      editingElementId: state.editingElementId,
      backgroundColor: state.backgroundColor,
      backgroundColorBack: state.backgroundColorBack,
      updateElement: state.updateElement,
      setToolbar: state.setToolbar,
      setSelectedElementId: state.setSelectedElementId,
      setEditingElementId: state.setEditingElementId,
      setSelectedElementType: state.setSelectedElementType,
    }))
  );
  const { zoom, isHorizontal, setSideBarStatus } = sideBarStore(
    useShallow((state) => ({
      zoom: state.zoom,
      isHorizontal: state.isHorizontal,
      setSideBarStatus: state.setSideBarStatus,
    }))
  );
  const { setFrontStageRef, setBackStageRef } = useStageRefStore(
    useShallow((state) => ({
      setFrontStageRef: state.setFrontStageRef,
      setBackStageRef: state.setBackStageRef,
    }))
  );

  //ref
  const transformerRef = useRef<Konva.Transformer | null>(null);
  const shapeRefs = useRef<Record<string, Konva.Node>>({});

  const visibleRef = useRef<Konva.Stage>(null);
  const frontRef = useRef<Konva.Stage>(null);
  const backRef = useRef<Konva.Stage>(null);

  useEffect(() => {
    setFrontStageRef(frontRef);
    setBackStageRef(backRef);
  }, [setFrontStageRef, setBackStageRef]);

  //앞면 뒷면
  const currentCanvasElements = isFront ? canvasElements : canvasBackElements;
  // 앞면 배경 뒷면 배경
  const currentBackgroundColor = isFront
    ? backgroundColor
    : backgroundColorBack;

  //memoized element
  const editingTextElement = useMemo(() => {
    return currentCanvasElements.find(
      (el) => el.id === editingElementId && el.type === ElEMENT_TYPE.TEXT
    ) as TextElement | undefined;
  }, [currentCanvasElements, editingElementId]);

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
        x: rect.x + rect.width / 2 - (TOOLBAR_WIDTH * zoom) / 2,
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
    const editingEl = currentCanvasElements.find(
      (el) => el.id === selectedElementId && el.type === ElEMENT_TYPE.TEXT
    ) as TextElement | undefined;
    if (!editingEl) return;
    updateElement(selectedElementId, { text: newText });
    setEditingElementId(null);
  };

  const stageWidth = BASE_STAGE_WIDTH * zoom;
  const stageHeight = BASE_STAGE_HEIGHT * zoom;

  const containerWidth = BASE_CONTAINER_WIDTH * zoom;
  const containerHeight = BASE_CONTAINER_HEIGHT * zoom;

  const currentStageWidth = isHorizontal ? stageWidth : stageHeight;
  const currentStageHeight = isHorizontal ? stageHeight : stageWidth;

  const currentRectWidth = isHorizontal ? BASE_STAGE_WIDTH : BASE_STAGE_HEIGHT;
  const currentRectHeight = isHorizontal ? BASE_STAGE_HEIGHT : BASE_STAGE_WIDTH;

  const currentContainerWidth = isHorizontal ? containerWidth : containerHeight;
  const currentContainerHeight = isHorizontal
    ? containerHeight
    : containerWidth;

  return (
    <div
      className={`flex flex-col items-center justify-center bg-white p-[18px]`}
      style={{
        boxShadow: '1px 1px 4px 1px rgba(0, 0, 0, 0.25)',
        width: `${currentContainerWidth}px`,
        height: `${currentContainerHeight}px`,
      }}
    >
      <Stage
        ref={isFront ? frontRef : backRef}
        style={{ border: '1px dashed var(--Gray-60, #878A93)' }}
        width={currentStageWidth}
        height={currentStageHeight}
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
            width={currentRectWidth}
            height={currentRectHeight}
            fill={currentBackgroundColor || '#ffffff'}
            listening={false}
          />

          {currentCanvasElements.map((el) => {
            // 공통 Props
            const commonProps = {
              onDragEnd: (id: string, node: Konva.Node) => {
                updateElement(id, { x: node.x(), y: node.y() });
                handleUpdateToolbarNode(node);
              },
              onDragMove: (node: Konva.Node) => {
                handleUpdateToolbarNode(node);
              },
              onTransformEnd: handleTransformEnd,
              onSelect: (id: string, node: Konva.Node) => {
                setSelectedElementId(id);
                handleUpdateToolbarNode(node);
                setSelectedElementType(el.type);
                setSideBarStatus(true);
              },
              ref: (node: Konva.Node | null) => {
                if (node) shapeRefs.current[el.id] = node;
              },
            };

            return (
              <SwitchCase
                key={el.id}
                value={el.type}
                cases={{
                  [ElEMENT_TYPE.TEXT]: (
                    <TextCanvasElement
                      element={el as TextElement}
                      {...commonProps}
                      onDoubleClick={handleTextDoubleClick}
                      editing={editingElementId === el.id}
                    />
                  ),
                  [ElEMENT_TYPE.UPLOAD]: (
                    <UploadImageElement
                      element={el as UploadElement}
                      {...commonProps}
                    />
                  ),
                  [ElEMENT_TYPE.IMAGE]: (
                    <UnsplashImageElement
                      element={el as ImageElement}
                      {...commonProps}
                    />
                  ),
                  [ElEMENT_TYPE.QR]: (
                    <QrCanvasElement
                      element={el as QrElement}
                      {...commonProps}
                    />
                  ),
                  [ElEMENT_TYPE.SOCIAL]: (
                    <SocialCanvasElement
                      element={el as SocialElement}
                      {...commonProps}
                    />
                  ),
                }}
                default={<></>}
              />
            );
          })}
          <Transformer
            ref={transformerRef}
            enabledAnchors={
              selectedElement?.type === ElEMENT_TYPE.TEXT
                ? ENABLEDANCHORS.TEXT
                : ENABLEDANCHORS.IMAGE
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
