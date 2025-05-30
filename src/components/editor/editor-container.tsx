'use client';

import { ElementsElement, TextElement } from '@/types/editor.type';
import Konva from 'konva';
import { useEffect, useMemo, useRef } from 'react';
import { Group, Layer, Rect, Stage, Transformer } from 'react-konva';
import {
  BASE_STAGE_HEIGHT,
  BASE_STAGE_WIDTH,
  ElEMENT_TYPE,
} from '@/constants/editor.constant';
import { sideBarStore } from '@/store/editor.sidebar.store';
import ElementToolbar from './editor-ui/element-toolbar/editor-element-toolbar';
import TextEditContent from './elements/text/text-edit-content';
import { handleWheel } from '@/utils/editor/editor-scale-event.util';
import { useEditorStore } from '@/store/editor.store';
import { useStageRefStore } from '@/store/editor.stage.store';
import { useShallow } from 'zustand/react/shallow';
import CanvasElementsRender from './canvas-elements-render';

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
      setSelectedElementId: state.setSelectedElementId,
      setEditingElementId: state.setEditingElementId,
      setSelectedElementType: state.setSelectedElementType,
    }))
  );
  const { zoom, isHorizontal } = sideBarStore(
    useShallow((state) => ({
      zoom: state.zoom,
      isHorizontal: state.isHorizontal,
    }))
  );
  const setStageRef = useStageRefStore((state) => state.setStageRef);

  //ref
  const transformerRef = useRef<Konva.Transformer | null>(null);
  const shapeRefs = useRef<Record<string, Konva.Node>>({});

  const stageRef = useRef<Konva.Stage>(null);

  useEffect(() => {
    if (stageRef.current) {
      setStageRef(stageRef);
    }
  }, [stageRef, setStageRef]);

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

  const currentStageWidth = isHorizontal ? stageWidth : stageHeight;
  const currentStageHeight = isHorizontal ? stageHeight : stageWidth;

  const currentRectWidth = isHorizontal ? BASE_STAGE_WIDTH : BASE_STAGE_HEIGHT;
  const currentRectHeight = isHorizontal ? BASE_STAGE_HEIGHT : BASE_STAGE_WIDTH;

  return (
    <Stage
      ref={stageRef}
      style={{ boxShadow: '1px 1px 4px 1px rgba(0, 0, 0, 0.25)' }}
      width={currentStageWidth}
      height={currentStageHeight}
      scale={{ x: zoom, y: zoom }}
      onWheel={handleWheel}
      onClick={(e) => {
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
        <Group>
          <CanvasElementsRender
            elements={currentCanvasElements}
            editingElementId={editingElementId}
            shapeRefs={shapeRefs}
            transformerRef={transformerRef}
          />
        </Group>
        <Transformer
          ref={transformerRef}
          enabledAnchors={
            // TEXT , 화살표는 양 쪽 끝만 앵커 나오게
            selectedElement?.type === ElEMENT_TYPE.TEXT ||
            (selectedElement?.type === ElEMENT_TYPE.ELEMENT &&
              (selectedElement as ElementsElement).elementType === 'line')
              ? ENABLEDANCHORS.TEXT
              : ENABLEDANCHORS.IMAGE
          }
          rotationSnaps={[0, 90, 180, 270]}
          // UT 적용 자동보정 임시 제거
          // rotationSnapTolerance={30}
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
        <ElementToolbar shapeRefs={shapeRefs} />
      </Layer>
    </Stage>
  );
};

export default EditorContainer;
