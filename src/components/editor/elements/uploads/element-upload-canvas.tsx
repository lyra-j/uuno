'use client';
import React from 'react';
import { Image as KonvaImage } from 'react-konva';

import { UploadElement } from '@/store/editor.store';
import { useImage } from 'react-konva-utils';

interface UploadImageElementProps {
  element: UploadElement;
}

const UploadImageElement = ({ element }: UploadImageElementProps) => {
  const [image] = useImage(element.previewUrl);
  return (
    <KonvaImage
      image={image}
      x={element.x}
      y={element.y}
      rotation={element.rotation}
      width={element.width}
      height={element.height}
      draggable
      // 필요한 이벤트 핸들러(예: onDragEnd, onTransformEnd 등) 추가 가능
    />
  );
};

export default UploadImageElement;
