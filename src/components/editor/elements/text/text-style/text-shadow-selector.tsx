import React from 'react';
import { Slider } from '@/components/ui/slider';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { ShadowProp, TextElement } from '@/types/editor.type';
import { DEFAULT_COLOR } from '@/constants/editor.constant';
import ColorPicker from '@/components/editor/editor-ui/color-picker';

interface TextShadowSelectorProps {
  selectedTextElement: TextElement;
  handleShadowChange: (
    prop: ShadowProp,
    transform?: (v: number) => number
  ) => (value: number[]) => void;
  handleShadowColorChange: (color: string) => void;
}

const TextShadowSelector = ({
  selectedTextElement,
  handleShadowChange,
  handleShadowColorChange,
}: TextShadowSelectorProps) => {
  const {
    shadowOffsetX,
    shadowOffsetY,
    shadowBlur,
    shadowOpacity,
    shadowColor,
  } = selectedTextElement;

  //투명도 반대로 계산
  const transparencyPercent = Math.round((1 - shadowOpacity) * 100);

  return (
    <Accordion type='single' collapsible>
      <AccordionItem value='shadow'>
        <AccordionTrigger className='text-caption-medium'>
          그림자
        </AccordionTrigger>
        <AccordionContent className='space-y-3'>
          {/* 색상  */}
          <div className='flex justify-between'>
            <span className='text-caption-regular'>색상</span>
            <Popover>
              <PopoverTrigger asChild>
                <div className='flex cursor-pointer flex-col items-center'>
                  <div
                    className='h-[20px] w-[20px] rounded border-[2px]'
                    style={{
                      backgroundColor:
                        selectedTextElement?.shadowColor || DEFAULT_COLOR,
                    }}
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent className='z-[10] w-auto p-2'>
                <ColorPicker
                  selectedColor={
                    selectedTextElement?.shadowColor || DEFAULT_COLOR
                  }
                  onColorChange={handleShadowColorChange}
                  title='그림자 색상'
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* X offset */}
          <div className='flex flex-col'>
            <div className='mb-2 flex justify-between px-[6px]'>
              <span className='text-caption-regular'>X</span>
              <input
                type='number'
                value={selectedTextElement?.shadowOffsetX || 0}
                min={-50}
                max={50}
                onChange={(e) =>
                  handleShadowChange('shadowOffsetX')([+e.target.value])
                }
                className='h-6 w-11 rounded border text-center text-caption-regular'
              />
            </div>
            <Slider
              value={[selectedTextElement?.shadowOffsetX || 0]}
              min={-50}
              max={50}
              step={1}
              onValueChange={handleShadowChange('shadowOffsetX')}
              className='w-full'
            />
          </div>

          {/* Y offset */}
          <div className='flex flex-col'>
            <div className='mb-2 flex justify-between px-[6px]'>
              <span className='text-caption-regular'>Y</span>
              <input
                type='number'
                value={selectedTextElement?.shadowOffsetY || 0}
                min={-50}
                max={50}
                onChange={(e) =>
                  handleShadowChange('shadowOffsetY')([+e.target.value])
                }
                className='h-6 w-11 rounded border text-center text-caption-regular'
              />
            </div>
            <Slider
              value={[selectedTextElement?.shadowOffsetY || 0]}
              min={-50}
              max={50}
              step={1}
              onValueChange={handleShadowChange('shadowOffsetY')}
              className='w-full'
            />
          </div>

          {/* 흐림 */}
          <div className='flex flex-col'>
            <div className='mb-2 flex justify-between px-[6px]'>
              <span className='text-caption-regular'>흐림</span>
              <input
                type='number'
                value={selectedTextElement?.shadowBlur || 0}
                min={0}
                max={50}
                onChange={(e) =>
                  handleShadowChange('shadowBlur')([+e.target.value])
                }
                className='h-6 w-11 rounded border text-center text-caption-regular'
              />
            </div>
            <Slider
              value={[selectedTextElement?.shadowBlur || 0]}
              max={50}
              step={1}
              onValueChange={handleShadowChange('shadowBlur')}
              className='w-full'
            />
          </div>

          {/* 투명도 */}
          <div className='flex flex-col'>
            <div className='mb-2 flex justify-between px-[6px]'>
              <span className='text-caption-regular'>투명도</span>
              <div className='relative'>
                <input
                  type='number'
                  value={transparencyPercent}
                  onChange={(e) =>
                    handleShadowChange(
                      'shadowOpacity',
                      (percent) => (100 - percent) / 100
                    )([+e.target.value])
                  }
                  className='h-6 w-11 rounded border text-center text-caption-regular'
                />
                <span className='absolute right-2 top-1/2 -translate-y-1/2 text-caption-regular text-gray-80'>
                  %
                </span>
              </div>
            </div>
            <Slider
              value={[transparencyPercent]}
              max={100}
              step={1}
              onValueChange={handleShadowChange(
                'shadowOpacity',
                (percent) => (100 - percent) / 100
              )}
              className='w-full'
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default TextShadowSelector;
