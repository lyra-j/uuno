'use client';
import React from 'react';
import { Image as KonvaImage } from 'react-konva';
import { UploadElement } from '@/store/editor.store';
import { useImage } from 'react-konva-utils';
import Konva from 'konva';

interface UploadImageElementProps {
  element: UploadElement;
  onDragEnd: (id: string, node: Konva.Node) => void;
  onSelect: (id: string, node: Konva.Node) => void;
}

const UploadImageElement = ({
  element,
  onDragEnd,
  onSelect,
}: UploadImageElementProps) => {
  const [image] = useImage(element.previewUrl);

  return (
    <KonvaImage
      key={element.id}
      image={image}
      x={element.x}
      y={element.y}
      rotation={element.rotation}
      width={element.width}
      height={element.height}
      draggable
      onDragEnd={(e) => onDragEnd(element.id, e.target as Konva.Image)}
      onMouseDown={(e) => onSelect(element.id, e.target)}
      onClick={(e) => onSelect(element.id, e.target)}
      onTap={(e) => onSelect(element.id, e.target)}
    />
  );
};

export default UploadImageElement;
