'use client';
import React, { forwardRef, useEffect } from 'react';
import { Image as KonvaImage } from 'react-konva';
import Konva from 'konva';
import { useImage } from 'react-konva-utils';
import { UploadElement } from '@/types/editor.type';

interface PreviewUploadCanvasProps {
  element: UploadElement;
}

const PreviewUploadCanvas = forwardRef<Konva.Image, PreviewUploadCanvasProps>(
  ({ element }, ref) => {
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
      />
    );
  }
);

PreviewUploadCanvas.displayName = 'PreviewUploadCanvas';

export default PreviewUploadCanvas;
