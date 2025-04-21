'use client';
import React, { forwardRef, useEffect } from 'react';
import { Image as KonvaImage } from 'react-konva';
import Konva from 'konva';
import { useImage } from 'react-konva-utils';
import { QrElement } from '@/types/editor.type';

interface PreviewQrCanvasProps {
  element: QrElement;
}

const PreviewQrCanvas = forwardRef<Konva.Image, PreviewQrCanvasProps>(
  ({ element }, ref) => {
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
      />
    );
  }
);

PreviewQrCanvas.displayName = 'PreviewQrCanvas';

export default PreviewQrCanvas;
