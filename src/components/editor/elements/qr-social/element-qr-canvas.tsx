'use client';
import React, { forwardRef, useEffect } from 'react';
import { Image as KonvaImage } from 'react-konva';
import Konva from 'konva';
import { useImage } from 'react-konva-utils';
import { QrElement } from '@/types/editor.type';

interface QrCanvasElementProps {
  element: QrElement;
  onDragEnd: (_id: string, _node: Konva.Node) => void;
  onDragStart: (_id: string, _node: Konva.Node) => void;
  onDragMove: (_node: Konva.Node) => void;
  onTransformEnd: (_id: string, _e: Konva.KonvaEventObject<Event>) => void;
  onSelect: (_id: string, _node: Konva.Node) => void;
  previewMode?: boolean;
}

const QrCanvasElement = forwardRef<Konva.Image, QrCanvasElementProps>(
  (
    {
      element,
      onDragEnd,
      onDragStart,
      onTransformEnd,
      onSelect,
      onDragMove,
      previewMode,
    },
    ref
  ) => {
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
        draggable={!previewMode}
        onDragEnd={(e) => onDragEnd(element.id, e.target)}
        onDragStart={(e) => onDragStart(element.id, e.target as Konva.Image)}
        onDragMove={(e) => onDragMove?.(e.target)}
        onTransformEnd={(e) => onTransformEnd(element.id, e)}
        onMouseDown={(e) => onSelect(element.id, e.target)}
        onClick={(e) => onSelect(element.id, e.target)}
        onTap={(e) => onSelect(element.id, e.target)}
      />
    );
  }
);

QrCanvasElement.displayName = 'QrCanvasElement';

export default QrCanvasElement;
