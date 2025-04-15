'use client';

import { ReactElement } from 'react';
import Konva from 'konva';
import { ElEMENT_TYPE } from '@/constants/editor.constant';
import {
  EditorElement,
  ImageElement,
  QrElement,
  TextElement,
  UploadElement,
} from '@/store/editor.store';
import { SwitchCase } from '@/components/common/switch-case';
import TextCanvasElement from '../elements/text/element-text-canvas';
import UploadImageElement from '../elements/uploads/element-upload-canvas';
import UnsplashImageElement from '../elements/images/element-image-canvas';
import QrCanvasElement from '../elements/qr-social/element-qr-canvas';

interface CanvasElementRenderProps {
  el: EditorElement;
  editingElementId: string | null;
  shapeRefs: React.MutableRefObject<Record<string, Konva.Node>>;
  handleUpdateToolbarNode: (node: Konva.Node) => void;
  updateElement: (id: string, values: Partial<EditorElement>) => void;
  handleTransformEnd: (id: string, e: Konva.KonvaEventObject<Event>) => void;
  handleTextDoubleClick: (id: string) => void;
  setSelectedElementId: (id: string) => void;
  setSelectedElementType: (type: string) => void;
  setSideBarStatus: (open: boolean) => void;
}

const CanvasElementRender = ({
  el,
  editingElementId,
  shapeRefs,
  handleUpdateToolbarNode,
  updateElement,
  handleTransformEnd,
  handleTextDoubleClick,
  setSelectedElementId,
  setSelectedElementType,
  setSideBarStatus,
}: CanvasElementRenderProps): ReactElement | null => {
  const commonProps = {
    key: el.id,
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
      if (node) {
        shapeRefs.current[el.id] = node;
      }
    },
  };

  return (
    <SwitchCase
      value={el.type}
      cases={{
        [ElEMENT_TYPE.TEXT]: (
          <TextCanvasElement
            {...commonProps}
            element={el as TextElement}
            editing={editingElementId === el.id}
            onDoubleClick={handleTextDoubleClick}
          />
        ),
        [ElEMENT_TYPE.UPLOAD]: (
          <UploadImageElement {...commonProps} element={el as UploadElement} />
        ),
        [ElEMENT_TYPE.IMAGE]: (
          <UnsplashImageElement {...commonProps} element={el as ImageElement} />
        ),
        [ElEMENT_TYPE.QR]: (
          <QrCanvasElement {...commonProps} element={el as QrElement} />
        ),
      }}
    />
  );
};

export default CanvasElementRender;
