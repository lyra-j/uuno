'use client';
import React, { forwardRef } from 'react';
import { Image as KonvaImage } from 'react-konva';
import { useImage } from 'react-konva-utils';
import Konva from 'konva';
import { ImageElement } from '@/types/editor.type';

interface UnsplashImageElementProps {
  element: ImageElement;
  onDragEnd: (_id: string, _node: Konva.Node) => void;
  onDragMove: (_node: Konva.Node) => void;
  onTransformEnd: (_id: string, _e: Konva.KonvaEventObject<Event>) => void;
  onSelect: (_id: string, _node: Konva.Node) => void;
}

const UnsplashImageElement = forwardRef<Konva.Image, UnsplashImageElementProps>(
  ({ element, onDragEnd, onSelect, onTransformEnd, onDragMove }, ref) => {
    const [image] = useImage(element.previewUrl);

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
        onDragMove={(e) => onDragMove?.(e.target)}
        onTransformEnd={(e) => onTransformEnd(element.id, e)}
        onMouseDown={(e) => onSelect(element.id, e.target)}
        onClick={(e) => onSelect(element.id, e.target)}
        onTap={(e) => onSelect(element.id, e.target)}
      />
    );
  }
);

UnsplashImageElement.displayName = 'UnsplashImageElement';

export default UnsplashImageElement;
