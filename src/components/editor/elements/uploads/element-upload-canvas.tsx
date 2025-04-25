'use client';
import React, { forwardRef, useEffect, useState } from 'react';
import { Image as KonvaImage, Group, Rect, Text } from 'react-konva';
import Konva from 'konva';
import { UploadElement } from '@/types/editor.type';
import { useImage } from 'react-konva-utils';
import sweetAlertUtil from '@/utils/common/sweet-alert-util';

interface UploadImageElementProps {
  element: UploadElement;
  onDragEnd: (_id: string, _node: Konva.Node) => void;
  onDragMove?: (_node: Konva.Node) => void;
  onTransformEnd: (_id: string, _e: Konva.KonvaEventObject<Event>) => void;
  onSelect: (_id: string, _node: Konva.Node) => void;
  onDragStart: (_id: string, _node: Konva.Node) => void;
  previewMode?: boolean;
}

const UploadImageElement = forwardRef<Konva.Image, UploadImageElementProps>(
  (
    {
      element,
      onDragEnd,
      onDragStart,
      onSelect,
      onTransformEnd,
      onDragMove,
      previewMode,
    },
    ref
  ) => {
    const [image, status] = useImage(element.previewUrl, 'anonymous');
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
      // 이미지 로드 실패 시 에러 상태로 설정
      if (status === 'failed') {
        setHasError(true);
        sweetAlertUtil.error('이미지를 불러올 수 없습니다.');
      } else {
        setHasError(false);
      }
    }, [status, element.previewUrl]);

    // 이미지 로드 실패 시 대체 UI 반환
    if (hasError) {
      return (
        <Group
          x={element.x}
          y={element.y}
          width={element.width}
          height={element.height}
          rotation={element.rotation}
          draggable={!previewMode}
          onDragEnd={(e) => onDragEnd(element.id, e.target as Konva.Node)}
          onDragStart={(e) => onDragStart(element.id, e.target as Konva.Node)}
          onDragMove={(e) => onDragMove?.(e.target)}
          onClick={(e) => onSelect(element.id, e.target)}
          onTap={(e) => onSelect(element.id, e.target)}
        >
          {/* 배경 */}
          <Rect
            width={element.width}
            height={element.height}
            fill='#f8f8f8'
            stroke='#ddd'
            strokeWidth={1}
          />

          {/* 오류 메시지 */}
          <Text
            text='이미지를 찾을 수 없습니다'
            fontSize={Math.min(14, element.width / 10)}
            fill='#888'
            width={element.width}
            height={element.height / 2}
            align='center'
            verticalAlign='middle'
          />
        </Group>
      );
    }

    // 이미지 로딩 중이거나 성공했을 때
    return (
      <KonvaImage
        ref={ref}
        image={image}
        x={element.x}
        y={element.y}
        rotation={element.rotation}
        width={element.width}
        height={element.height}
        draggable={!previewMode}
        onDragEnd={(e) => onDragEnd(element.id, e.target as Konva.Image)}
        onDragStart={(e) => onDragStart(element.id, e.target as Konva.Image)}
        onDragMove={(e) => onDragMove?.(e.target)}
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
