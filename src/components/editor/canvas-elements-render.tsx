'use client';

import {
  CanvasElements,
  ImageElement,
  QrElement,
  SocialElement,
  TextElement,
  UploadElement,
} from '@/types/editor.type';
import Konva from 'konva';
import { useEditorStore } from '@/store/editor.store';
import { sideBarStore } from '@/store/editor.sidebar.store';
import TextCanvasElement from '@/components/editor/elements/text/element-text-canvas';
import UploadImageElement from '@/components/editor/elements/uploads/element-upload-canvas';
import UnsplashImageElement from '@/components/editor/elements/images/element-image-canvas';
import QrCanvasElement from '@/components/editor/elements/qr-social/element-qr-canvas';
import SocialCanvasElement from '@/components/editor/elements/qr-social/element-social-canvas';
import { SwitchCase } from '../common/switch-case';
import { ElEMENT_TYPE, TOOLBAR_WIDTH } from '@/constants/editor.constant';
import { useCallback, useEffect } from 'react';

interface CanvasElementsRenderProps {
  elements: CanvasElements[];
  editingElementId: string | null;
  shapeRefs: React.MutableRefObject<Record<string, Konva.Node>>;
}

const CanvasElementsRender = ({
  elements,
  editingElementId,
  shapeRefs,
}: CanvasElementsRenderProps) => {
  const updateElement = useEditorStore((state) => state.updateElement);
  const setSelectedElementId = useEditorStore(
    (state) => state.setSelectedElementId
  );
  const setEditingElementId = useEditorStore(
    (state) => state.setEditingElementId
  );
  const setSelectedElementType = useEditorStore(
    (state) => state.setSelectedElementType
  );
  const setToolbar = useEditorStore((state) => state.setToolbar);
  const setSideBarStatus = sideBarStore((state) => state.setSideBarStatus);
  const zoom = sideBarStore((state) => state.zoom);

  //zoom 변경 시 툴바 위치 고정
  useEffect(() => {
    const selectedElementId = useEditorStore.getState().selectedElementId;
    if (selectedElementId && shapeRefs.current[selectedElementId]) {
      handleUpdateToolbarNode(shapeRefs.current[selectedElementId]);
    }
  }, [zoom]);

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
  const handleTransformEnd = useCallback(
    (id: string, e: Konva.KonvaEventObject<Event>): void => {
      const node = e.target;
      if (!node) return;
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
    },
    [updateElement, handleUpdateToolbarNode]
  );

  /**
   * 더블 클릭 시 편집 모드 실행 핸들러
   * @param id 요소 id
   */
  const handleTextDoubleClick = (id: string) => {
    setSelectedElementId(id);
    setEditingElementId(id);
  };

  return elements.map((el) => {
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
            <QrCanvasElement element={el as QrElement} {...commonProps} />
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
  });
};

export default CanvasElementsRender;
