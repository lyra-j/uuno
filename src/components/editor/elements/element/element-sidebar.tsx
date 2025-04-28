'use client';

import LeftArrow from '@/components/icons/editor/element/left-arrow';
import LeftDottedArrow from '@/components/icons/editor/element/left-dotted-arrow';
import LeftDotted2Arrow from '@/components/icons/editor/element/left-dotted2-arrow';
import LeftRightArrow from '@/components/icons/editor/element/left-right-arrow';
import LeftRightDottedArrow from '@/components/icons/editor/element/left-right-dotted-arrow';
import LeftRightDotted2Arrow from '@/components/icons/editor/element/left-right-dotted2-arrow';
import Line from '@/components/icons/editor/element/line';
import LineDotted from '@/components/icons/editor/element/line-dotted';
import LineDotted2 from '@/components/icons/editor/element/line-dotted-2';
import RightArrow from '@/components/icons/editor/element/right-arrow';
import RightDottedArrow from '@/components/icons/editor/element/right-dotted-arrow';
import RightDotted2Arrow from '@/components/icons/editor/element/right-dotted2-arrow';
import { useEditorStore } from '@/store/editor.store';
import { ElementsElement, ElementType, LineEndType } from '@/types/editor.type';
import { v4 } from 'uuid';
import LeftDottedCircle from '@/components/icons/editor/element/left-dotted-circle';
import RightDottedCircle from '@/components/icons/editor/element/right-dotted-circle';
import LeftRightDottedCircle from '@/components/icons/editor/element/left-right-dotted-circle';
import RightCircle from '@/components/icons/editor/element/right-circle';
import LeftCircle from '@/components/icons/editor/element/left-circle';
import LeftRightCircle from '@/components/icons/editor/element/left-right-circle';
import RightDotted2Circle from '@/components/icons/editor/element/right-dotted2-circle';
import LeftDotted2Circle from '@/components/icons/editor/element/left-dotted2-circle';
import LeftRightDotted2Circle from '@/components/icons/editor/element/left-right-dotted2-circle';
import RightDottedSquare from '@/components/icons/editor/element/right-dotted-square';
import LeftDottedSquare from '@/components/icons/editor/element/left-dotted-square';
import LeftRightDottedSquare from '@/components/icons/editor/element/left-right-dotted-square';
import RightSquare from '@/components/icons/editor/element/right-square';
import LeftSquare from '@/components/icons/editor/element/left-square';
import LeftRightSquare from '@/components/icons/editor/element/left-right-square';
import RightDotted2Square from '@/components/icons/editor/element/right-dotted2-square';
import LeftDotted2Square from '@/components/icons/editor/element/left-dotted2-square';
import LeftRightDotted2Square from '@/components/icons/editor/element/left-right-dotted2-square';
import Square from '@/components/icons/editor/element/square';
import SquareWhite from '@/components/icons/editor/element/square-white';
import SquareDotted from '@/components/icons/editor/element/square-dotted';
import Circle from '@/components/icons/editor/element/circle';
import CircleWhite from '@/components/icons/editor/element/circle-white';
import CircleDotted from '@/components/icons/editor/element/circle-dotted';
import Triangle from '@/components/icons/editor/element/tiangle';
import TriangleWhite from '@/components/icons/editor/element/tiangle-white';
import TriangleDotted from '@/components/icons/editor/element/tiangle-dotted';
import Star4 from '@/components/icons/editor/element/star-4';
import Star5 from '@/components/icons/editor/element/star-5';
import Star6 from '@/components/icons/editor/element/star-6';
import { calculateToolbarPosition } from '@/utils/editor/editor-calculate-toolbar-position';
import { sideBarStore } from '@/store/editor.sidebar.store';
import { lineOptions } from '@/constants/editor-elements.constant';

const ElementsSidebar = () => {
  const addElement = useEditorStore((state) => state.addElement);
  const setSelectedElementId = useEditorStore(
    (state) => state.setSelectedElementId
  );
  const setToolbar = useEditorStore((state) => state.setToolbar);
  const zoom = sideBarStore((state) => state.zoom);

  const handleAddElement = ({
    elementType,
    start,
    end,
    dot,
    fill,
    sides,
    radius,
    numPoint,
    innerRadius,
    outerRadius,
  }: {
    elementType: ElementType;
    start?: LineEndType;
    end?: LineEndType;
    dot?: [number, number];
    fill?: string;
    sides?: number;
    radius?: number;
    numPoint?: number;
    innerRadius?: number;
    outerRadius?: number;
  }) => {
    const newId = v4();

    const newElement: ElementsElement = {
      id: newId,
      type: 'element',
      elementType: elementType,
      x: 100,
      y: 100,
      width: 53,
      height: 53,
      points: [50, 50, 150, 50],
      dash: dot,
      fill,
      sides,
      radius,
      numPoint,
      innerRadius,
      outerRadius,
      stroke: 'black',
      strokeWidth: 3,
      startDecoration: start,
      endDecoration: end,
    };

    addElement(newElement);
    setSelectedElementId(newElement.id);
    setToolbar(
      calculateToolbarPosition({
        x: newElement.x,
        y: newElement.y,
        width: newElement.width,
        height: newElement.height,
        zoom,
      })
    );
  };

  const lineOptions: {
    Component: any;
    start: LineEndType;
    end: LineEndType;
  }[] = [
    { Component: Line, start: 'none', end: 'none' },
    { Component: RightArrow, start: 'none', end: 'arrow' },
    { Component: LeftArrow, start: 'arrow', end: 'none' },
    { Component: LeftRightArrow, start: 'arrow', end: 'arrow' },
    { Component: RightCircle, start: 'none', end: 'circle' },
    { Component: LeftCircle, start: 'circle', end: 'none' },
    { Component: LeftRightCircle, start: 'circle', end: 'circle' },
    { Component: RightSquare, start: 'none', end: 'rectangle' },
    { Component: LeftSquare, start: 'rectangle', end: 'none' },
    { Component: LeftRightSquare, start: 'rectangle', end: 'rectangle' },
  ];

  const lineDottedOptions: {
    Component: any;
    start: LineEndType;
    end: LineEndType;
    dashed: [number, number];
  }[] = [
    { Component: LineDotted, start: 'none', end: 'none', dashed: [20, 20] },
    {
      Component: RightDottedArrow,
      start: 'none',
      end: 'arrow',
      dashed: [20, 20],
    },
    {
      Component: LeftDottedArrow,
      start: 'arrow',
      end: 'none',
      dashed: [20, 20],
    },
    {
      Component: LeftRightDottedArrow,
      start: 'arrow',
      end: 'arrow',
      dashed: [20, 20],
    },
    {
      Component: RightDottedCircle,
      start: 'none',
      end: 'circle',
      dashed: [20, 20],
    },
    {
      Component: LeftDottedCircle,
      start: 'circle',
      end: 'none',
      dashed: [20, 20],
    },
    {
      Component: LeftRightDottedCircle,
      start: 'circle',
      end: 'circle',
      dashed: [20, 20],
    },
    {
      Component: RightDottedSquare,
      start: 'none',
      end: 'rectangle',
      dashed: [20, 20],
    },
    {
      Component: LeftDottedSquare,
      start: 'rectangle',
      end: 'none',
      dashed: [20, 20],
    },
    {
      Component: LeftRightDottedSquare,
      start: 'rectangle',
      end: 'rectangle',
      dashed: [20, 20],
    },
  ];

  const lineDotted2Options: {
    Component: any;
    start: LineEndType;
    end: LineEndType;
    dashed: [number, number];
  }[] = [
    { Component: LineDotted2, start: 'none', end: 'none', dashed: [9, 4] },
    {
      Component: RightDotted2Arrow,
      start: 'none',
      end: 'arrow',
      dashed: [9, 4],
    },
    {
      Component: LeftDotted2Arrow,
      start: 'arrow',
      end: 'none',
      dashed: [9, 4],
    },
    {
      Component: LeftRightDotted2Arrow,
      start: 'arrow',
      end: 'arrow',
      dashed: [9, 4],
    },
    {
      Component: RightDotted2Circle,
      start: 'none',
      end: 'circle',
      dashed: [9, 4],
    },
    {
      Component: LeftDotted2Circle,
      start: 'circle',
      end: 'none',
      dashed: [9, 4],
    },
    {
      Component: LeftRightDotted2Circle,
      start: 'circle',
      end: 'circle',
      dashed: [9, 4],
    },
    {
      Component: RightDotted2Square,
      start: 'none',
      end: 'rectangle',
      dashed: [9, 4],
    },
    {
      Component: LeftDotted2Square,
      start: 'rectangle',
      end: 'none',
      dashed: [9, 4],
    },
    {
      Component: LeftRightDotted2Square,
      start: 'rectangle',
      end: 'rectangle',
      dashed: [9, 4],
    },
  ];

  const squareOption: {
    Component: any;
    dashed: [number, number];
    fill: string;
  }[] = [
    { Component: Square, dashed: [0, 0], fill: 'black' },
    {
      Component: SquareWhite,
      dashed: [0, 0],
      fill: 'rgba(0,0,0,0)',
    },
    {
      Component: SquareDotted,
      dashed: [9, 5],
      fill: 'rgba(0,0,0,0)',
    },
  ];

  const circleOption: {
    Component: any;
    dashed: [number, number];
    fill: string;
  }[] = [
    { Component: Circle, dashed: [0, 0], fill: 'black' },
    {
      Component: CircleWhite,
      dashed: [0, 0],
      fill: 'rgba(0,0,0,0)',
    },
    {
      Component: CircleDotted,
      dashed: [9, 5],
      fill: 'rgba(0,0,0,0)',
    },
  ];

  const triangleOption: {
    Component: any;
    dashed: [number, number];
    fill: string;
    sides: number;
    radius: number;
  }[] = [
    {
      Component: Triangle,
      dashed: [0, 0],
      fill: 'black',
      sides: 3,
      radius: 53,
    },
    {
      Component: TriangleWhite,
      dashed: [0, 0],
      fill: 'rgba(0,0,0,0)',
      sides: 3,
      radius: 53,
    },
    {
      Component: TriangleDotted,
      dashed: [9, 5],
      fill: 'rgba(0,0,0,0)',
      sides: 3,
      radius: 53,
    },
  ];

  const starOption: {
    Component: any;
    fill: string;
    numPoint: number;
    innerRadius: number;
    outerRadius: number;
  }[] = [
    {
      Component: Star4,
      fill: 'rgba(0,0,0,0)',
      numPoint: 4,
      innerRadius: 20,
      outerRadius: 50,
    },
    {
      Component: Star5,
      fill: 'rgba(0,0,0,0)',
      numPoint: 5,
      innerRadius: 20,
      outerRadius: 50,
    },
    {
      Component: Star6,
      fill: 'rgba(0,0,0,0)',
      numPoint: 6,
      innerRadius: 30,
      outerRadius: 50,
    },
  ];

  return (
    <div className='my-[14px] flex w-[204px] flex-col items-start gap-[34px]'>
      {/* 검색 */}
      <div className='flex flex-col items-center justify-center self-stretch rounded-[6px] border border-gray-10 px-3 py-[6px]'>
        <input
          type='text'
          placeholder='도형 검색'
          className='flex-1 text-xs placeholder-gray-50 focus:outline-none'
        />
      </div>

      {/* 선 */}
      <div className='flex flex-col items-start gap-6 self-stretch'>
        <p className='text-label2-medium text-gray-100'>선</p>
        <article className='flex items-center gap-6 self-stretch'>
          <div className='flex w-[52px] flex-col items-start gap-6'>
            {/* 선 */}
            {lineOptions.map(({ Component, start, end }, idx) => (
              <Component
                key={idx}
                className='cursor-pointer'
                onClick={() =>
                  handleAddElement({
                    elementType: 'line',
                    start: start,
                    end: end,
                  })
                }
              />
            ))}
          </div>
          <div className='flex w-[52px] flex-col items-start gap-6'>
            {/* 점 선 */}
            {lineDottedOptions.map(({ Component, start, end, dashed }, idx) => (
              <Component
                key={idx}
                className='cursor-pointer'
                onClick={() =>
                  handleAddElement({
                    elementType: 'line',
                    start: start,
                    end: end,
                    dot: dashed,
                  })
                }
              />
            ))}
          </div>
          <div className='flex w-[52px] flex-col items-start gap-6'>
            {/* 촘촘한 점 선 */}
            {lineDotted2Options.map(
              ({ Component, start, end, dashed }, idx) => (
                <Component
                  key={idx}
                  className='cursor-pointer'
                  onClick={() =>
                    handleAddElement({
                      elementType: 'line',
                      start: start,
                      end: end,
                      dot: dashed,
                    })
                  }
                />
              )
            )}
          </div>
        </article>
      </div>

      {/* 도형 */}
      <div className='flex flex-col items-start gap-3 self-stretch'>
        <p className='text-label2-medium text-gray-100'>도형</p>
        <article className='flex items-center gap-6 self-stretch'>
          <div className='flex w-[52px] flex-col items-start gap-6'>
            {/* 사각형 도형 */}
            {squareOption.map(({ Component, dashed, fill }, idx) => (
              <Component
                key={idx}
                className='cursor-pointer'
                onClick={() =>
                  handleAddElement({
                    elementType: 'rectangle',
                    dot: dashed,
                    fill: fill,
                  })
                }
              />
            ))}
          </div>
          <div className='flex w-[52px] flex-col items-start gap-6'>
            {/* 원형 도형 */}
            {circleOption.map(({ Component, dashed, fill }, idx) => (
              <Component
                key={idx}
                className='cursor-pointer'
                onClick={() =>
                  handleAddElement({
                    elementType: 'circle',
                    dot: dashed,
                    fill: fill,
                  })
                }
              />
            ))}
          </div>
          <div className='flex w-[52px] flex-col items-start gap-6'>
            {/* 삼각형 도형 */}
            {triangleOption.map(
              ({ Component, dashed, fill, sides, radius }, idx) => (
                <Component
                  key={idx}
                  className='cursor-pointer'
                  onClick={() =>
                    handleAddElement({
                      elementType: 'regularPolygon',
                      dot: dashed,
                      fill,
                      sides,
                      radius,
                    })
                  }
                />
              )
            )}
          </div>
        </article>
        <div className='flex w-full flex-row flex-wrap items-start gap-6'>
          {starOption.map(
            ({ Component, fill, numPoint, innerRadius, outerRadius }, idx) => (
              <Component
                key={idx}
                className='cursor-pointer'
                onClick={() =>
                  handleAddElement({
                    elementType: 'star',
                    fill,
                    numPoint,
                    innerRadius,
                    outerRadius,
                  })
                }
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};
export default ElementsSidebar;
