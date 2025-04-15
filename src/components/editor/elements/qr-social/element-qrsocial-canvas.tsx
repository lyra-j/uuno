/* eslint-disable no-unused-vars */
'use client';
import React, { forwardRef, useEffect } from 'react';
import { Image as KonvaImage } from 'react-konva';
import Konva from 'konva';
import { QrElement } from '@/store/editor.store';
import { useImage } from 'react-konva-utils';

interface QrsocialElementProps {
  element: QrElement;
  onDragEnd: (id: string, node: Konva.Node) => void;
  onTransformEnd: (id: string, e: Konva.KonvaEventObject<Event>) => void;
  onSelect: (id: string, node: Konva.Node) => void;
}

const QrsocialElement = forwardRef<Konva.Image, QrsocialElementProps>(
  ({ element, onDragEnd, onTransformEnd, onSelect }, ref) => {
    const [image, status] = useImage(element.previewUrl);

    useEffect(() => {
      if (status === 'failed') {
        console.error(`QR 이미지 로딩 실패: ${element.previewUrl}`);
      }
    }, [status, element.previewUrl]);

    return (
      <KonvaImage
        ref={ref}
        image={image}
        x={element.x}
        y={element.y}
        rotation={element.rotation}
        width={element.width}
        height={element.height}
        draggable
        onDragEnd={(e) => onDragEnd(element.id, e.target)}
        onTransformEnd={(e) => onTransformEnd(element.id, e)}
        onMouseDown={(e) => onSelect(element.id, e.target)}
        onClick={(e) => onSelect(element.id, e.target)}
        onTap={(e) => onSelect(element.id, e.target)}
      />
    );
  }
);

QrsocialElement.displayName = 'QrsocialElement';

export default QrsocialElement;
