import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import ColorPicker from '../../editor-ui/color-picker';
import { useMemo } from 'react';
import { ElementsElement } from '@/types/editor.type';
import { useEditorStore } from '@/store/editor.store';
import { DEFAULT_COLOR, ElEMENT_TYPE } from '@/constants/editor.constant';
import ElementStrokeSelector from '../../editor-ui/element-style-selector/element-stroke-selector';

const ElementStyleSidebar = () => {
  const isFront = useEditorStore((state) => state.isCanvasFront);
  const canvasElements = useEditorStore((state) =>
    isFront ? state.canvasElements : state.canvasBackElements
  );
  const selectedElementId = useEditorStore((state) => state.selectedElementId);
  const updateElement = useEditorStore((state) => state.updateElement);

  /**
   * 현재 선택된 텍스트 요소 가져오기
   */
  const selectedElement = useMemo((): ElementsElement | undefined => {
    return canvasElements.find(
      (el) => el.id === selectedElementId && el.type === ElEMENT_TYPE.ELEMENT
    ) as ElementsElement | undefined;
  }, [canvasElements, selectedElementId]);

  if (!selectedElementId || !selectedElement) return;

  /**
   * 색상 변경
   * @param field 변경할 필드
   * @param color 색상
   * @returns
   */
  const handleColorChange = (field: 'fill' | 'stroke', color: string) => {
    updateElement(selectedElementId, { [field]: color });
  };

  return (
    <div className='mx-[18px] mt-[14px] flex w-[204px] flex-col items-start gap-[14px]'>
      <div className='flex content-between items-center self-stretch'>
        <p className='text-caption-medium text-black'>도형 속성</p>
      </div>

      <div className='flex flex-col items-start gap-3 self-stretch'>
        <div className='flex h-[26px] w-[204px] items-center justify-between'>
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
                  selectedColor={selectedElement?.fill || DEFAULT_COLOR}
                  onColorChange={(e) => {
                    handleColorChange('fill', e);
                    handleColorChange('stroke', e);
                  }}
                  title='도형 색상'
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className='w-[204px] px-[6px]'>
          <ElementStrokeSelector
            selectedElement={selectedElement}
            handleColorChange={handleColorChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ElementStyleSidebar;
