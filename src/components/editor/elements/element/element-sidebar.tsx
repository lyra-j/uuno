'use client';

import { useEditorStore } from '@/store/editor.store';
import { ElementsElement, ElementType, LineEndType } from '@/types/editor.type';
import { v4 } from 'uuid';
import { calculateToolbarPosition } from '@/utils/editor/editor-calculate-toolbar-position';
import { sideBarStore } from '@/store/editor.sidebar.store';
import {
  circleOption,
  lineDotted2Options,
  lineDottedOptions,
  lineOptions,
  squareOption,
  starOption,
  triangleOption,
} from '@/constants/editor-elements.constant';
import { ElEMENT_TYPE } from '@/constants/editor.constant';

const ElementsSidebar = () => {
  const addElement = useEditorStore((state) => state.addElement);
  const setSelectedElementId = useEditorStore(
    (state) => state.setSelectedElementId
  );
  const setSelectedElementType = useEditorStore(
    (state) => state.setSelectedElementType
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
    rotation,
  }: {
    elementType: ElementType;
    start?: LineEndType;
    end?: LineEndType;
    dot: number[];
    fill?: string;
    sides?: number;
    radius?: number;
    numPoint?: number;
    innerRadius?: number;
    outerRadius?: number;
    rotation: number;
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
      strokeWidth: 2,
      startDecoration: start,
      endDecoration: end,
      rotation,
    };

    addElement(newElement);
    setSelectedElementId(newElement.id);
    setSelectedElementType(ElEMENT_TYPE.ELEMENT);

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
            {lineOptions.map(({ Component, start, end, dashed, fill }, idx) => (
              <Component
                key={idx}
                className='cursor-pointer'
                onClick={() =>
                  handleAddElement({
                    elementType: 'line',
                    start: start,
                    end: end,
                    fill,
                    dot: dashed,
                    rotation: 0,
                  })
                }
              />
            ))}
          </div>
          <div className='flex w-[52px] flex-col items-start gap-6'>
            {/* 점 선 */}
            {lineDottedOptions.map(
              ({ Component, start, end, dashed, fill }, idx) => (
                <Component
                  key={idx}
                  className='cursor-pointer'
                  onClick={() =>
                    handleAddElement({
                      elementType: 'line',
                      start: start,
                      end: end,
                      dot: dashed,
                      fill,
                      rotation: 0,
                    })
                  }
                />
              )
            )}
          </div>
          <div className='flex w-[52px] flex-col items-start gap-6'>
            {/* 촘촘한 점 선 */}
            {lineDotted2Options.map(
              ({ Component, start, end, dashed, fill }, idx) => (
                <Component
                  key={idx}
                  className='cursor-pointer'
                  onClick={() =>
                    handleAddElement({
                      elementType: 'line',
                      start: start,
                      end: end,
                      dot: dashed,
                      fill,
                      rotation: 0,
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
                    rotation: 0,
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
                    rotation: 0,
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
                      rotation: 0,
                    })
                  }
                />
              )
            )}
          </div>
        </article>
        <div className='flex w-full flex-row flex-wrap items-start gap-6'>
          {/* 별 도형 */}
          {starOption.map(
            (
              { Component, fill, numPoint, innerRadius, outerRadius, dashed },
              idx
            ) => (
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
                    dot: dashed,
                    rotation: 0,
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
