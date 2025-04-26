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

const ElementsSidebar = () => {
  const addElement = useEditorStore((state) => state.addElement);
  const setSelectedElementId = useEditorStore(
    (state) => state.setSelectedElementId
  );
  const setToolbar = useEditorStore((state) => state.setToolbar);

  const handleAddElement = (
    start: LineEndType,
    end: LineEndType,
    elementType: ElementType,
    dot?: [number, number]
  ) => {
    const newId = v4();

    const newElement: ElementsElement = {
      id: newId,
      type: 'element',
      elementType: elementType,
      x: 100,
      y: 100,
      points: [50, 50, 150, 50],
      dash: dot,
      stroke: 'black',
      strokeWidth: 3,
      startDecoration: start,
      endDecoration: end,
    };

    addElement(newElement);
    setSelectedElementId(newElement.id);
    setToolbar({
      x: newElement.x,
      y: newElement.y,
    });
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
            {/* 여기에 선 */}
            <Line
              className='cursor-pointer'
              onClick={() => handleAddElement('none', 'none', 'line')}
            />
            <RightArrow
              className='cursor-pointer'
              onClick={() => handleAddElement('none', 'arrow', 'line')}
            />
            <LeftArrow
              className='cursor-pointer'
              onClick={() => handleAddElement('arrow', 'none', 'line')}
            />
            <LeftRightArrow
              className='cursor-pointer'
              onClick={() => handleAddElement('arrow', 'arrow', 'line')}
            />
            <RightCircle />
            <LeftCircle />
            <LeftRightCircle />
          </div>
          <div className='flex w-[52px] flex-col items-start gap-6'>
            {/* 여기에 선 */}
            <LineDotted
              className='cursor-pointer'
              onClick={() => handleAddElement('none', 'none', 'line', [20, 20])}
            />
            <RightDottedArrow
              className='cursor-pointer'
              onClick={() =>
                handleAddElement('none', 'arrow', 'line', [20, 20])
              }
            />
            <LeftDottedArrow
              className='cursor-pointer'
              onClick={() =>
                handleAddElement('arrow', 'none', 'line', [20, 20])
              }
            />
            <LeftRightDottedArrow
              className='cursor-pointer'
              onClick={() =>
                handleAddElement('arrow', 'arrow', 'line', [20, 20])
              }
            />
            <RightDottedCircle />
            <LeftDottedCircle />
            <LeftRightDottedCircle />
          </div>
          <div className='flex w-[52px] flex-col items-start gap-6'>
            {/* 여기에 선 */}
            <LineDotted2
              onClick={() => handleAddElement('none', 'none', 'line', [9, 4])}
              className='cursor-pointer'
            />
            <RightDotted2Arrow
              className='cursor-pointer'
              onClick={() => handleAddElement('none', 'arrow', 'line', [9, 4])}
            />
            <LeftDotted2Arrow
              className='cursor-pointer'
              onClick={() => handleAddElement('arrow', 'none', 'line', [9, 4])}
            />
            <LeftRightDotted2Arrow
              className='cursor-pointer'
              onClick={() => handleAddElement('arrow', 'arrow', 'line', [9, 4])}
            />
            <RightDotted2Circle />
            <LeftDotted2Circle />
            <LeftRightDotted2Circle />
          </div>
        </article>
      </div>

      {/* 도형 */}
      <div className='flex flex-col items-start gap-3 self-stretch'>
        <p className='text-label2-medium text-gray-100'>도형</p>
        <article className='flex items-center gap-6 self-stretch'>
          <div className='flex w-[52px] flex-col items-start gap-6'>
            {/* 여기에 도형 */}
          </div>
          <div className='flex w-[52px] flex-col items-start gap-6'>
            {/* 여기에 도형 */}
          </div>
          <div className='flex w-[52px] flex-col items-start gap-6'>
            {/* 여기에 도형 */}
          </div>
        </article>
      </div>
    </div>
  );
};
export default ElementsSidebar;
