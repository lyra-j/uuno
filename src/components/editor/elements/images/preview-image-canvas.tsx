'use client';
import React, { forwardRef } from 'react';
import { Image as KonvaImage } from 'react-konva';
import { useImage } from 'react-konva-utils';
import Konva from 'konva';
import { ImageElement } from '@/types/editor.type';

interface PreviewImageCanvasProps {
  element: ImageElement;
}

const PreviewImageCanvas = forwardRef<Konva.Image, PreviewImageCanvasProps>(
  ({ element }, ref) => {
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
      />
    );
  }
);

PreviewImageCanvas.displayName = 'PreviewImageCanvas';

export default PreviewImageCanvas;
