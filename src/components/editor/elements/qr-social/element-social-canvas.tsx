'use client';

import { sideBarStore } from '@/store/editor.sidebar.store';
import { SocialElement } from '@/store/editor.store';
import Konva from 'konva';
import { forwardRef, useEffect, useState } from 'react';
import { Image as KonvaImage } from 'react-konva';
import { Html as KonvaHtml, useImage } from 'react-konva-utils';

interface SocialCanvasElementProps {
  element: SocialElement;
  onDragEnd: (id: string, node: Konva.Node) => void;
  onDragMove: (node: Konva.Node) => void;
  onTransformEnd: (id: string, e: Konva.KonvaEventObject<Event>) => void;
  onSelect: (id: string, node: Konva.Node) => void;
}

const SocialCanvasElement = forwardRef<Konva.Image, SocialCanvasElementProps>(
  ({ element, onDragEnd, onTransformEnd, onSelect, onDragMove }, ref) => {
    const [image, status] = useImage(element.icon);
    const zoom = sideBarStore((state) => state.zoom);
    const [isDragging, setIsDragging] = useState(true);

    // 4씩 더하고 뺀 이유 : Image의 MouseEnter, MouseLeave를 활성화 하기 위함
    const x = element.x * zoom + 4;
    const y = element.y * zoom + 4;
    const width = element.width - 4;
    const height = element.height - 4;
    const url = element.fullUrl;

    useEffect(() => {
      if (status === 'failed') {
        console.error(`이미지 로딩 실패: ${element.icon}`);
      }
    }, [status, element.icon]);

    // 더블 클릭시 url 이동
    const handleUrl = () => {
      window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
      <>
        <KonvaImage
          ref={ref}
          image={image}
          x={element.x}
          y={element.y}
          rotation={element.rotation}
          width={element.width}
          height={element.height}
          draggable
          onMouseEnter={() => {
            setIsDragging(true);
          }}
          onMouseLeave={() => setIsDragging(false)}
          onDragEnd={(e) => {
            onDragEnd(element.id, e.target);
          }}
          onDragMove={(e) => onDragMove?.(e.target)}
          onTransformEnd={(e) => onTransformEnd(element.id, e)}
          onMouseDown={(e) => onSelect(element.id, e.target)}
          onClick={(e) => onSelect(element.id, e.target)}
          onTap={(e) => onSelect(element.id, e.target)}
          onDblClick={handleUrl}
        />
        {image && status === 'loaded' && !isDragging && (
          <KonvaHtml
            divProps={{
              style: {
                position: 'absolute',
                left: `${x}px`,
                top: `${y}px`,
                zIndex: 0,
                width: `${width}px`,
                height: `${height}px`,
                pointerEvents: 'auto',
              },
            }}
          >
            <a href={url} target='_blank' rel='noopener noreferrer'>
              <div
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </a>
          </KonvaHtml>
        )}
      </>
    );
  }
);

export default SocialCanvasElement;
