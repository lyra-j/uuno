'use client';
import React, { forwardRef } from 'react';
import { Text } from 'react-konva';
import Konva from 'konva';
import { TextElement } from '@/store/editor.store';

export interface TextCanvasElementProps {
  element: TextElement;
  onDragEnd: (_id: string, _node: Konva.Node) => void;
  onDragMove?: (_node: Konva.Node) => void;
  onTransformEnd: (_id: string, _e: Konva.KonvaEventObject<Event>) => void;
  onDoubleClick: (_id: string) => void;
  onSelect: (_id: string, _node: Konva.Node) => void;

  editing: boolean;
}

const TextCanvasElement = forwardRef<Konva.Text, TextCanvasElementProps>(
  (
    {
      element,
      onDragEnd,
      onDragMove,
      onTransformEnd,
      onDoubleClick,
      onSelect,
      editing,
    },
    ref
  ) => {
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
        draggable
        onDragEnd={(e) => onDragEnd(element.id, e.target as Konva.Text)}
        onDragMove={(e) => onDragMove?.(e.target)}
        onTransformEnd={(e) => onTransformEnd(element.id, e)}
        onDblClick={() => onDoubleClick(element.id)}
        onDblTap={() => onDoubleClick(element.id)}
        onMouseDown={(e) => onSelect(element.id, e.target)}
        onClick={(e) => onSelect(element.id, e.target)}
        onTap={(e) => onSelect(element.id, e.target)}
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
        visible={!editing}
      />
    );
  }
);

TextCanvasElement.displayName = 'TextCanvasElement';

export default TextCanvasElement;
