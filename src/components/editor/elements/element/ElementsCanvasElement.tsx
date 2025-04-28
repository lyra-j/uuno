'use client';
import React, { forwardRef } from 'react';
import { Arrow, Circle, Group, Line, Rect, RegularPolygon } from 'react-konva';
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
        x={element.x}
        y={element.y}
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
                x={element.points[0] - 13}
                y={element.points[1] - 7}
                width={13}
                height={13}
                cornerRadius={50}
                fill={element.stroke}
              />
            )}
            {element.endDecoration === 'circle' && (
              <Rect
                x={element.points[2]}
                y={element.points[3] - 7}
                width={13}
                height={13}
                cornerRadius={50}
                fill={element.stroke}
              />
            )}
            {element.startDecoration === 'arrow' && (
              <RegularPolygon
                x={element.points[0]}
                y={element.points[1]}
                sides={3}
                radius={5}
                fill='black'
                stroke='black'
                strokeWidth={2}
                rotation={30}
              />
            )}
            {element.endDecoration === 'arrow' && (
              <RegularPolygon
                x={element.points[2]}
                y={element.points[3]}
                sides={3}
                radius={5}
                fill='black'
                stroke='black'
                strokeWidth={2}
                rotation={-30}
              />
            )}
            {element.startDecoration === 'rectangle' && (
              <Rect
                x={element.points[0] + 3}
                y={element.points[1]}
                width={13}
                height={13}
                cornerRadius={0}
                rotation={135}
                fill={element.stroke}
              />
            )}
            {element.endDecoration === 'rectangle' && (
              <Rect
                x={element.points[2] - 3}
                y={element.points[3]}
                width={13}
                height={13}
                cornerRadius={0}
                rotation={-45}
                fill={element.stroke}
              />
            )}
          </>
        )}
        {element.elementType === 'rectangle' && (
          <>
            <Rect
              width={53}
              height={53}
              fill={element.fill}
              stroke='black'
              strokeWidth={2}
              dash={element.dash}
            />
          </>
        )}
        {element.elementType === 'circle' && (
          <>
            <Circle
              width={53}
              height={53}
              fill={element.fill}
              stroke='black'
              strokeWidth={2}
              dash={element.dash}
            />
          </>
        )}
        {element.elementType === 'regularPolygon' && (
          <>
            <RegularPolygon
              width={53}
              height={53}
              fill={element.fill}
              sides={element.sides!}
              radius={element.radius!}
              stroke='black'
              strokeWidth={2}
              dash={element.dash}
            />
          </>
        )}
      </Group>
    );
  }
);

ElementsCanvasElement.displayName = 'ElementsCanvasElement';

export default ElementsCanvasElement;
