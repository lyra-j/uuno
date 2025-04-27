'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ShadowProp, TextElement } from '@/types/editor.type';
import { sweetComingSoonAlert } from '@/utils/common/sweet-coming-soon-alert';
import { DEFAULT_FONT } from '@/constants/editor.constant';
import { useEditorStore } from '@/store/editor.store';
import { useStageRefStore } from '@/store/editor.stage.store';
import Konva from 'konva';
import LinkIcon from '@/components/icons/editor/link-icon';
import TextAlignAndColor from '@/components/editor/elements/text/text-style/text-align-and-color';
import TextShadowSelector from '@/components/editor/elements/text/text-style/text-shadow-selector';
import TextStyleOptionsAndSize from '@/components/editor/elements/text/text-style/text-style-options-and-size';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from '@/components/ui/select';
import TextOpacitySelector from './text-style/text-opacity-selector';

const TextStyleSidebar = () => {
  const isFront = useEditorStore((state) => state.isCanvasFront);
  const canvasElements = useEditorStore((state) =>
    isFront ? state.canvasElements : state.canvasBackElements
  );
  const selectedElementId = useEditorStore((state) => state.selectedElementId);
  const updateElement = useEditorStore((state) => state.updateElement);
  const stageRef = useStageRefStore((state) => state.stageRef);
  const [fonts, setFonts] = useState<string[]>([]);
  const loadedFonts = useRef<Set<string>>(new Set(['Pretendard']));

  /**
   * 현재 선택된 텍스트 요소 가져오기
   */
  const selectedTextElement = useMemo((): TextElement | undefined => {
    return canvasElements.find(
      (el) => el.id === selectedElementId && el.type === 'text'
    ) as TextElement | undefined;
  }, [canvasElements, selectedElementId]);

  const currentFont = selectedTextElement?.fontFamily ?? 'Pretendard';

  // 초기 폰트 가져오기
  useEffect(() => {
    fetch('/api/google-font')
      .then((res) => res.json())
      .then((list: string[]) => setFonts(list))
      .catch(() => setFonts([]));
  }, []);

  //폰트 목록
  const fontItems = useMemo(() => {
    if (fonts.length === 0) return null;
    return fonts.map((family) => (
      <SelectItem key={family} value={family}>
        <span style={{ fontFamily: family }}>{family}</span>
      </SelectItem>
    ));
  }, [fonts]);

  /**
   * 폰트 변경 핸들러
   */
  const handleFontChange = (fontFamily: string) => {
    if (!selectedElementId) return;
    const refreshKonvaCache = () => {
      const stage = stageRef?.current;
      if (!stage) return;
      const node = stage.findOne(`#${selectedElementId}`);
      if (node?.getClassName() === 'Text') {
        const textnode = node as Konva.Text;
        const old = textnode.text();
        textnode.text('');
        textnode.text(old);
      }
      stage.batchDraw();
    };
    const loadFont = () => {
      // 폰트 로드
      if (!loadedFonts.current.has(fontFamily)) {
        import('webfontloader')
          .then((WebFont) => {
            WebFont.load({
              google: { families: [fontFamily] },
              active: () => {
                loadedFonts.current.add(fontFamily);
                refreshKonvaCache();
              },
            });
          })
          .catch(console.error);
      } else {
        requestAnimationFrame(() => {
          refreshKonvaCache();
        });
      }
    };
    updateElement(selectedElementId, { fontFamily });
    loadFont();
  };

  // 투명도 변경 핸들러
  const handleOpacityChange = (value: number[]) => {
    if (!selectedElementId || !selectedTextElement) return;
    const raw = value[0];
    const newOpacity = (100 - raw) / 100;
    updateElement(selectedElementId, {
      opacity: newOpacity,
    });
  };

  /**
   * @param prop 그림자 속성 키
   * @param transform  값 변환시키기
   */
  const handleShadowChange =
    (
      prop: ShadowProp,
      transform: (value: number) => number = (value) => value
    ) =>
    (value: number[]) => {
      if (!selectedElementId || !selectedTextElement) return;
      const raw = value[0];
      updateElement(selectedElementId, {
        [prop]: transform(raw),
      });
    };

  //그림자 색
  const handleShadowColorChange = (color: string) => {
    if (!selectedElementId || !selectedTextElement) return;
    updateElement(selectedElementId, { shadowColor: color });
  };

  return (
    <div className='mt-[14px] w-full space-y-4 px-[18px]'>
      <div className='flex items-center justify-between'>
        <h3 className='text-caption-medium'>텍스트 속성</h3>
        <LinkIcon onClick={sweetComingSoonAlert} />
      </div>

      {/* 폰트 */}
      {selectedTextElement && (
        <Select value={currentFont} onValueChange={handleFontChange}>
          <SelectTrigger className='w-full'>
            <SelectValue>{currentFont}</SelectValue>
          </SelectTrigger>
          <SelectContent className='max-h-60 overflow-auto'>
            <SelectGroup>
              <SelectItem value={DEFAULT_FONT}>
                <span style={{ fontFamily: DEFAULT_FONT }}>Pretendard</span>
              </SelectItem>
              {fontItems}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
      {selectedTextElement && (
        <>
          {/* 크기 조절 + 4가지 스타일 옵션 */}
          <TextStyleOptionsAndSize selectedTextElement={selectedTextElement} />

          {/* 텍스트 위치 조절 + 글자색 + 글자배경 */}
          <TextAlignAndColor selectedTextElement={selectedTextElement} />

          {/* 텍스트 투명도 */}
          <TextOpacitySelector
            selectedTextElement={selectedTextElement}
            handleOpacityChange={handleOpacityChange}
          />

          {/* 그림자 */}
          <TextShadowSelector
            selectedTextElement={selectedTextElement}
            handleShadowChange={handleShadowChange}
            handleShadowColorChange={handleShadowColorChange}
          />
        </>
      )}
    </div>
  );
};

export default TextStyleSidebar;
