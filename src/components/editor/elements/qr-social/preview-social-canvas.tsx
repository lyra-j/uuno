'use client';

import { SocialElement } from '@/types/editor.type';
import Konva from 'konva';
import { forwardRef, useEffect } from 'react';
import { Image as KonvaImage } from 'react-konva';
import { useImage } from 'react-konva-utils';

interface PreviewSocialCanvasProps {
  element: SocialElement;
}

const PreviewSocialCanvas = forwardRef<Konva.Image, PreviewSocialCanvasProps>(
  ({ element }, ref) => {
    const [image, status] = useImage(element.icon);

    useEffect(() => {
      if (status === 'failed') {
        console.error(`이미지 로딩 실패: ${element.icon}`);
      }
    }, [status, element.icon]);

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

PreviewSocialCanvas.displayName = 'PreviewSocialCanvas';

export default PreviewSocialCanvas;
