import ColorPicker from '@/components/editor/editor-ui/color-picker';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { DEFAULT_COLOR } from '@/constants/editor.constant';
import { TextElement } from '@/types/editor.type';
import React from 'react';

interface TextStrokeSelectorProps {
  selectedTextElement: TextElement;
  handleStrokeColorChange: (color: string) => void;
  handleStrokeWidthChange: (value: number[]) => void;
}

const TextStrokeSelector = ({
  selectedTextElement,
  handleStrokeColorChange,
  handleStrokeWidthChange,
}: TextStrokeSelectorProps) => {
  const { stroke, strokeWidth } = selectedTextElement;

  return (
    <Accordion type='single' collapsible>
      <AccordionItem value='stroke'>
        <AccordionTrigger className='text-caption-medium'>
          외곽선
        </AccordionTrigger>
        <AccordionContent className='space-y-3'>
          {/* 색상 선택 */}
          <div className='mb-2 flex items-center justify-between'>
            <span className='text-caption-regular'>색상</span>
            <Popover>
              <PopoverTrigger asChild>
                <div className='flex cursor-pointer flex-col items-center'>
                  <div
                    className='h-[20px] w-[20px] rounded border-[2px]'
                    style={{ backgroundColor: stroke || DEFAULT_COLOR }}
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent className='z-[10] w-auto p-2'>
                <ColorPicker
                  selectedColor={stroke || DEFAULT_COLOR}
                  onColorChange={handleStrokeColorChange}
                  title='외곽선 색상'
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* 두께 */}
          <div className='flex flex-col'>
            <div className='mb-2 flex items-center justify-between'>
              <span className='text-caption-regular'>두께</span>
              <input
                type='number'
                min={0}
                max={20}
                value={strokeWidth}
                onChange={(e) => handleStrokeWidthChange([+e.target.value])}
                className='h-6 w-11 rounded border text-center text-caption-regular'
              />
            </div>
            <Slider
              value={[strokeWidth]}
              min={0}
              max={20}
              step={1}
              onValueChange={handleStrokeWidthChange}
              className='my-1 w-full'
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default TextStrokeSelector;
