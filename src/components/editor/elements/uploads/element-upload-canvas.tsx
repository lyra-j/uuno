'use client';
import React, { forwardRef, useEffect } from 'react';
import { Image as KonvaImage } from 'react-konva';
import Konva from 'konva';
import { useImage } from 'react-konva-utils';
import { UploadElement } from '@/types/editor.type';

interface UploadImageElementProps {
  element: UploadElement;
  onDragEnd: (_id: string, _node: Konva.Node) => void;
  onDragMove?: (_node: Konva.Node) => void;
  onTransformEnd: (_id: string, _e: Konva.KonvaEventObject<Event>) => void;
  onSelect: (_id: string, _node: Konva.Node) => void;
  previewMode?: boolean;
}

const UploadImageElement = forwardRef<Konva.Image, UploadImageElementProps>(
  (
    { element, onDragEnd, onSelect, onTransformEnd, onDragMove, previewMode },
    ref
  ) => {
    const [image, status] = useImage(element.previewUrl);

    // 이미지 로딩 실패 시 처리
    useEffect(() => {
      if (status === 'failed') {
        console.error(`이미지 로드 에러: ${element.previewUrl}`);
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
        onDragEnd={(e) => onDragEnd(element.id, e.target as Konva.Image)}
        onDragMove={(e) => onDragMove?.(e.target)}
        onTransformEnd={(e) => onTransformEnd(element.id, e)}
        onMouseDown={(e) => onSelect(element.id, e.target)}
        onClick={(e) => onSelect(element.id, e.target)}
        onTap={(e) => onSelect(element.id, e.target)}
      />
    );
  }
);

UploadImageElement.displayName = 'UploadImageElement';

export default UploadImageElement;
