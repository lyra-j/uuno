'use client';
import React, { forwardRef } from 'react';
import { Circle, Group, Line, Rect, RegularPolygon, Star } from 'react-konva';
import Konva from 'konva';
import { ElementsElement } from '@/types/editor.type';
import { Group as KonvaGroup } from 'konva/lib/Group';
import { DECORATION_TYPE, ElEMENT_TYPE } from '@/constants/editor.constant';

export interface ElementsCanvasElementProps {
  element: ElementsElement;
  onDragEnd: (_id: string, _node: Konva.Node) => void;
  onDragMove?: (_node: Konva.Node) => void;
  onTransformEnd: (_id: string, _e: Konva.KonvaEventObject<Event>) => void;
  onSelect: (_id: string, _node: Konva.Node) => void;
  previewMode?: boolean;
}

const ElementsCanvasElement = forwardRef<
  Konva.Node,
  ElementsCanvasElementProps
>(
  (
    { element, onDragEnd, onDragMove, onTransformEnd, onSelect, previewMode },
    ref
  ) => {
    const commonProps = {
      x: element.x,
      y: element.y,
      draggable: !previewMode,
      onDragEnd: (e: any) => onDragEnd(element.id, e.target),
      onDragMove: (e: any) => onDragMove?.(e.target),
      onTransformEnd: (e: any) => onTransformEnd(element.id, e),
      onMouseDown: (e: any) => onSelect(element.id, e.target),
      onClick: (e: any) => onSelect(element.id, e.target),
      onTap: (e: any) => onSelect(element.id, e.target),
    };
    return (
      <>
        {element.elementType === ElEMENT_TYPE.LINE && (
          <Group {...commonProps} ref={ref as unknown as React.Ref<KonvaGroup>}>
            <Line
              points={element.points}
              stroke={element.stroke}
              strokeWidth={element.strokeWidth}
              dash={element.dash}
            />
            {element.startDecoration === DECORATION_TYPE.CIRCLE && (
              <Rect
                x={element.points[0] - 13}
                y={element.points[1] - 7}
                width={13}
                height={13}
                cornerRadius={50}
                fill={element.stroke}
              />
            )}
            {element.endDecoration === DECORATION_TYPE.CIRCLE && (
              <Rect
                x={element.points[2]}
                y={element.points[3] - 7}
                width={13}
                height={13}
                cornerRadius={50}
                fill={element.stroke}
              />
            )}
            {element.startDecoration === DECORATION_TYPE.ARROW && (
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
            {element.endDecoration === DECORATION_TYPE.ARROW && (
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
            {element.startDecoration === DECORATION_TYPE.RECTANGLE && (
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
            {element.endDecoration === DECORATION_TYPE.RECTANGLE && (
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
          </Group>
        )}
        {/* 사각 모양 */}
        {element.elementType === ElEMENT_TYPE.RECTANGLE && (
          <Rect
            {...commonProps}
            ref={ref as unknown as React.Ref<Konva.Rect>}
            width={element.width}
            height={element.height}
            fill={element.fill}
            stroke='black'
            strokeWidth={2}
            dash={element.dash}
          />
        )}
        {/* 원모양 */}
        {element.elementType === ElEMENT_TYPE.CIRCLE && (
          <Circle
            {...commonProps}
            ref={ref as unknown as React.Ref<Konva.Circle>}
            width={element.width}
            height={element.height}
            fill={element.fill}
            stroke='black'
            strokeWidth={2}
            dash={element.dash}
          />
        )}
        {/* 다각형 모양 */}
        {element.elementType === ElEMENT_TYPE.REGULAR_POLYGON && (
          <RegularPolygon
            {...commonProps}
            ref={ref as unknown as React.Ref<Konva.RegularPolygon>}
            width={element.width}
            height={element.height}
            fill={element.fill}
            sides={element.sides!}
            radius={element.radius!}
            stroke='black'
            strokeWidth={2}
            dash={element.dash}
          />
        )}
        {/* 별모양 */}
        {element.elementType === ElEMENT_TYPE.STAR && (
          <Star
            {...commonProps}
            ref={ref as unknown as React.Ref<Konva.Star>}
            width={element.width}
            height={element.height}
            fill={element.fill}
            numPoints={element.numPoint!}
            innerRadius={element.innerRadius!}
            outerRadius={element.outerRadius!}
            stroke='black'
            strokeWidth={2}
          />
        )}
      </>
    );
  }
);

ElementsCanvasElement.displayName = 'ElementsCanvasElement';

export default ElementsCanvasElement;
