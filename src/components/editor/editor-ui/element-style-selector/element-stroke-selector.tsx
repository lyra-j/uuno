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
import {
  BASE_LINE,
  DASHED,
  DASHED2,
  DEFAULT_COLOR,
} from '@/constants/editor.constant';
import { Slider } from '@/components/ui/slider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Line from '@/components/icons/editor/element/line';
import BottomTabDownIcon from '@/components/icons/editor/bottomtab-down';
import Image from 'next/image';
import LineDotted from '@/components/icons/editor/element/line-dotted';
import LineDotted2 from '@/components/icons/editor/element/line-dotted-2';
import { isSameArray } from '@/utils/common/same-array.util';

interface ElementStrokeSelectorProps {
  selectedElement: ElementsElement;
  handleColorChange: (field: 'fill' | 'stroke', color: string) => void;
  handleStrokeChange: (strokeWidth: number) => void;
  handleDashedChange: (dashed: number[]) => void;
}

const ElementStrokeSelector = ({
  selectedElement,
  handleColorChange,
  handleStrokeChange,
  handleDashedChange,
}: ElementStrokeSelectorProps) => {
  const showSelectedDashed = () => {
    if (!selectedElement.dash) return;

    if (isSameArray(selectedElement.dash, BASE_LINE)) {
      return <Line width={148} />;
    } else if (isSameArray(selectedElement.dash, DASHED)) {
      return <LineDotted width={148} />;
    } else if (isSameArray(selectedElement.dash, DASHED2)) {
      return <LineDotted2 width={148} />;
    }
  };

  return (
    <Accordion type='single' collapsible>
      <AccordionItem value='stroke'>
        <AccordionTrigger className='!text-caption-medium text-black'>
          외곽선
        </AccordionTrigger>

        <AccordionContent className='space-y-3'>
          {/* 외곽선 색상 */}
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

          {/* 외곽선 두께 */}
          <div className='flex flex-col items-center gap-2 self-stretch px-[6px]'>
            <div className='flex w-full items-center justify-between self-stretch'>
              <span className='text-caption-regular text-black'>두께</span>
              <input
                type='text'
                min={2}
                max={10}
                value={Number(selectedElement.strokeWidth) || 0}
                onChange={(e) => handleStrokeChange(Number(e.target.value))}
                className='flex h-[26px] w-[45px] items-center rounded border border-gray-10 px-[6px] py-1'
              />
            </div>
            <Slider
              min={2}
              max={10}
              step={1}
              onValueChange={(e) => handleStrokeChange(e[0])}
            />
          </div>

          {/* 외곽선 종류 */}
          <div className='flex flex-col items-center justify-center self-stretch rounded-[6px] border border-gray-10 p-[6px]'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className='flex items-center justify-between self-stretch'>
                  {showSelectedDashed()}
                  <BottomTabDownIcon />
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <div>
                  <DropdownMenuItem>
                    <div
                      className='flex h-[18px] items-center justify-between self-stretch'
                      onClick={() => {
                        handleDashedChange([0, 0]);
                      }}
                    >
                      <Line width={148} />
                      {isSameArray(selectedElement.dash, BASE_LINE) && (
                        <Image
                          src={'/icons/check.svg'}
                          width={18}
                          height={18}
                          alt='체크 아이콘'
                        />
                      )}
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <div
                      className='flex h-[18px] items-center justify-between self-stretch'
                      onClick={() => {
                        handleDashedChange([20, 20]);
                      }}
                    >
                      <LineDotted width={148} />
                      {isSameArray(selectedElement.dash, DASHED) && (
                        <Image
                          src={'/icons/check.svg'}
                          width={18}
                          height={18}
                          alt='체크 아이콘'
                        />
                      )}
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <div
                      className='flex h-[18px] items-center justify-between self-stretch'
                      onClick={() => {
                        handleDashedChange([9, 4]);
                      }}
                    >
                      <LineDotted2 width={148} />
                      {isSameArray(selectedElement.dash, DASHED2) && (
                        <Image
                          src={'/icons/check.svg'}
                          width={18}
                          height={18}
                          alt='체크 아이콘'
                        />
                      )}
                    </div>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ElementStrokeSelector;
