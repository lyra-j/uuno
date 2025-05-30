'use client';

import { sideBarStore } from '@/store/editor.sidebar.store';
import { SocialElement } from '@/types/editor.type';
import Konva from 'konva';
import { forwardRef, useEffect } from 'react';
import { Image as KonvaImage } from 'react-konva';
import { Html as KonvaHtml, useImage } from 'react-konva-utils';

interface SocialCanvasElementProps {
  element: SocialElement;
  onDragEnd: (_id: string, _node: Konva.Node) => void;
  onDragMove: (_node: Konva.Node) => void;
  onTransformEnd: (_id: string, _e: Konva.KonvaEventObject<Event>) => void;
  onSelect: (_id: string, _node: Konva.Node) => void;
  previewMode?: boolean;
  onSocialClick?: ({
    url,
    elementName,
  }: {
    url: string;
    elementName: string;
  }) => Promise<void>;
}

const SocialCanvasElement = forwardRef<Konva.Image, SocialCanvasElementProps>(
  (
    {
      element,
      onDragEnd,
      onTransformEnd,
      onSelect,
      onDragMove,
      previewMode,
      onSocialClick,
    },
    ref
  ) => {
    const [image, status] = useImage(element.icon);
    const isSocialEditing = sideBarStore((state) => state.isSocialEditing);

    const x = element.x;
    const y = element.y;
    const width = element.width;
    const height = element.height;
    const url = element.fullUrl;

    useEffect(() => {
      if (status === 'failed') {
        console.error(`이미지 로딩 실패: ${element.icon}`);
      }
    }, [status, element.icon]);

    const handleClick = async () => {
      if (previewMode && onSocialClick && url) {
        await onSocialClick({
          url,
          elementName: element.social || '소셜 링크',
        });
      }
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
          onDragEnd={(e) => {
            onDragEnd(element.id, e.target);
          }}
          onDragMove={(e) => onDragMove?.(e.target)}
          onTransformEnd={(e) => onTransformEnd(element.id, e)}
          onMouseDown={(e) => onSelect(element.id, e.target)}
          onClick={(e) => {
            if (previewMode && onSocialClick) {
              handleClick();
            } else {
              onSelect(element.id, e.target);
            }
          }}
          onTap={(e) => onSelect(element.id, e.target)}
        />
        {image && status === 'loaded' && (previewMode || !isSocialEditing) && (
          <KonvaHtml
            divProps={{
              style: {
                position: 'absolute',
                left: `${x}px`,
                top: `${y}px`,
                zIndex: 10,
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
                onClick={handleClick}
              />
            </a>
          </KonvaHtml>
        )}
      </>
    );
  }
);

SocialCanvasElement.displayName = 'SocialCanvasElement';

export default SocialCanvasElement;
