'use client';
import React, { forwardRef } from 'react';
import { Text } from 'react-konva';
import Konva from 'konva';
import { TextElement } from '@/types/editor.type';

export interface PreviewTextCanvasProps {
  element: TextElement;
}

const PreviewTextCanvas = forwardRef<Konva.Text, PreviewTextCanvasProps>(
  ({ element }, ref) => {
    return (
      <Text
        ref={ref}
        key={element.id}
        text={element.text}
        x={element.x}
        y={element.y}
        rotation={element.rotation}
        fontSize={element.fontSize}
        fill={element.fill}
        fontFamily={element.fontFamily}
        width={element.width}
        fontStyle={
          (element.isBold ? 'bold' : '') +
          ' ' +
          (element.isItalic ? 'italic' : '')
        }
        textDecoration={[
          element.isUnderline ? 'underline' : '',
          element.isStrike ? 'line-through' : '',
        ]
          .join(' ')
          .trim()}
        align={element.align || 'left'}
        verticalAlign={element.verticalAlign || 'top'}
      />
    );
  }
);

PreviewTextCanvas.displayName = 'PreviewTextCanvas';

export default PreviewTextCanvas;
