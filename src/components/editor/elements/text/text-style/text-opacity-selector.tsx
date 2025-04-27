import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Slider } from '@/components/ui/slider';
import { TextElement } from '@/types/editor.type';
import React from 'react';

interface TextOpacitySelectorProps {
  selectedTextElement: TextElement;
  handleOpacityChange: (value: number[]) => void;
}

const TextOpacitySelector = ({
  selectedTextElement,
  handleOpacityChange,
}: TextOpacitySelectorProps) => {
  const percent = Math.round((1 - (selectedTextElement.opacity ?? 1)) * 100);

  return (
    <Accordion type='single' collapsible>
      <AccordionItem value='opacity'>
        <AccordionTrigger className='text-caption-medium'>
          투명도
        </AccordionTrigger>
        <AccordionContent className='space-y-3'>
          <div className='flex items-center justify-between px-[6px]'>
            <span className='text-caption-regular'>투명도</span>
            <div className='relative'>
              <input
                type='number'
                min={0}
                max={100}
                value={percent}
                onChange={(e) => {
                  const value = +e.target.value;
                  handleOpacityChange([value]);
                }}
                className='h-6 w-11 rounded border text-center text-caption-regular'
              />
              <span className='absolute right-2 top-1/2 -translate-y-1/2 text-caption-regular text-gray-80'>
                %
              </span>
            </div>
          </div>
          <Slider
            value={[percent]}
            min={0}
            max={100}
            step={1}
            onValueChange={handleOpacityChange}
            className='w-full'
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default TextOpacitySelector;
