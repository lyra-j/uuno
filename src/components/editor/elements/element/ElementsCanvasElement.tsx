'use client';
import React, { forwardRef } from 'react';
import { Arrow, Circle, Group, Line, Rect } from 'react-konva';
import Konva from 'konva';
import { ElementsElement } from '@/types/editor.type';

export interface ElementsCanvasElementProps {
  element: ElementsElement;
  onDragEnd: (_id: string, _node: Konva.Node) => void;
  onDragMove?: (_node: Konva.Node) => void;
  onTransformEnd: (_id: string, _e: Konva.KonvaEventObject<Event>) => void;
  onSelect: (_id: string, _node: Konva.Node) => void;
  onDragStart: (_id: string, _node: Konva.Node) => void;
  previewMode?: boolean;
}

const ElementsCanvasElement = forwardRef<
  Konva.Group,
  ElementsCanvasElementProps
>(
  (
    {
      element,
      onDragEnd,
      onDragMove,
      onDragStart,
      onTransformEnd,
      onSelect,
      previewMode,
    },
    ref
  ) => {
    return (
      <Group
        ref={ref}
        key={element.id}
        draggable={!previewMode}
        onDragEnd={(e) => onDragEnd(element.id, e.target as Konva.Group)}
        onDragMove={(e) => onDragMove?.(e.target)}
        onTransformEnd={(e) => onTransformEnd(element.id, e)}
        onDragStart={(e) => onDragStart(element.id, e.target as Konva.Group)}
        onMouseDown={(e) => onSelect(element.id, e.target)}
        onClick={(e) => onSelect(element.id, e.target)}
        onTap={(e) => onSelect(element.id, e.target)}
      >
        {element.elementType === 'line' && (
          <>
            <Line
              points={element.points}
              stroke={element.stroke}
              strokeWidth={element.strokeWidth}
              dash={element.dash}
            />
            {element.startDecoration === 'circle' && (
              <Rect
                x={element.points[0]}
                y={element.points[1] - 8}
                width={15}
                height={15}
                cornerRadius={50}
                fill={element.stroke}
              />
            )}
            {element.endDecoration === 'circle' && (
              <Rect
                x={element.points[2]}
                y={element.points[3] - 8}
                width={15}
                height={15}
                cornerRadius={50}
                fill={element.stroke}
              />
            )}
            {element.startDecoration === 'arrow' && (
              <Arrow
                points={[
                  element.points[2],
                  element.points[3],
                  element.points[0],
                  element.points[1],
                ]}
                dash={element.dash}
                fill={element.stroke}
                stroke={element.stroke}
                pointerLength={8}
                pointerWidth={8}
                pointerAtEnding
              />
            )}
            {element.endDecoration === 'arrow' && (
              <Arrow
                points={[
                  element.points[0],
                  element.points[1],
                  element.points[2],
                  element.points[3],
                ]}
                dash={element.dash}
                fill={element.stroke}
                stroke={element.stroke}
                pointerLength={8}
                pointerWidth={8}
                pointerAtEnding
              />
            )}
          </>
        )}
      </Group>
    );
  }
);

ElementsCanvasElement.displayName = 'ElementsCanvasElement';

export default ElementsCanvasElement;
