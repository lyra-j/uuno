'use client';
import React, { forwardRef, useEffect } from 'react';
import { Image as KonvaImage } from 'react-konva';
import Konva from 'konva';
import { UploadElement } from '@/store/editor.store';
import { useImage } from 'react-konva-utils';

interface UploadImageElementProps {
  element: UploadElement;
  onDragEnd: (id: string, node: Konva.Node) => void;
  onTransformEnd: (id: string, e: Konva.KonvaEventObject<Event>) => void;
  onSelect: (id: string, node: Konva.Node) => void;
}

const UploadImageElement = forwardRef<Konva.Image, UploadImageElementProps>(
  ({ element, onDragEnd, onSelect, onTransformEnd }, ref) => {
    const [image, status] = useImage(element.previewUrl);

    // 이미지 로딩 실패 시 처리
    useEffect(() => {
      if (status === 'failed') {
        console.error(`Failed to load image: ${element.previewUrl}`);
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
        onDragEnd={(e) => onDragEnd(element.id, e.target as Konva.Image)}
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
