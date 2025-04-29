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
import ColorPicker from '../color-picker';
import { ElementsElement } from '@/types/editor.type';
import { DEFAULT_COLOR } from '@/constants/editor.constant';

interface ElementStrokeSelectorProps {
  selectedElement: ElementsElement;
  handleColorChange: (field: 'fill' | 'stroke', color: string) => void;
}

const ElementStrokeSelector = ({
  selectedElement,
  handleColorChange,
}: ElementStrokeSelectorProps) => {
  return (
    <Accordion type='single' collapsible>
      <AccordionItem value='stroke'>
        <AccordionTrigger className='!text-caption-medium text-black'>
          외곽선
        </AccordionTrigger>
        <AccordionContent className='space-y-3'>
          <div className='flex h-[26px] w-[204px] items-center justify-between px-[6px]'>
            <span className='text-caption-regular text-black'>색상</span>
            <div className='flex items-center gap-[10px] p-[3px]'>
              <Popover>
                <PopoverTrigger asChild>
                  <div
                    className='h-[20px] w-[20px] rounded border-[2px]'
                    style={{
                      backgroundColor: selectedElement?.fill || DEFAULT_COLOR,
                    }}
                  />
                </PopoverTrigger>
                <PopoverContent className='z-[10] w-auto p-2'>
                  <ColorPicker
                    selectedColor={selectedElement?.stroke || DEFAULT_COLOR}
                    onColorChange={(e) => handleColorChange('stroke', e)}
                    title='외곽선 색상'
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ElementStrokeSelector;
