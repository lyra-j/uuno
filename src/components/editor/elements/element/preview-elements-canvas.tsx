'use client';
import { forwardRef } from 'react';
import Konva from 'konva';
import { ElementsElement } from '@/types/editor.type';
import { Circle, Group, Line, Rect, RegularPolygon, Star } from 'react-konva';

interface PreviewElementsCanvasProps {
  element: ElementsElement;
}

const PreviewElementsCanvas = forwardRef<
  Konva.Node,
  PreviewElementsCanvasProps
>(({ element }, ref) => {
  const commonProps = {
    x: element.x,
    y: element.y,
  };
  return (
    <>
      {element.elementType === 'line' && (
        <Group {...commonProps} ref={ref as unknown as React.Ref<Konva.Group>}>
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
        </Group>
      )}
      {/* 사각 모양 */}
      {element.elementType === 'rectangle' && (
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
      {element.elementType === 'circle' && (
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
      {element.elementType === 'regularPolygon' && (
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
      {element.elementType === 'star' && (
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
});

PreviewElementsCanvas.displayName = 'PreviewElementsCanvas';

export default PreviewElementsCanvas;
