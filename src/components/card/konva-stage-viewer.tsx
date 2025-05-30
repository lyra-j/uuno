'use client';

import { Stage, Layer, Rect } from 'react-konva';
import {
  BASE_STAGE_HEIGHT,
  BASE_STAGE_WIDTH,
  ElEMENT_TYPE,
} from '@/constants/editor.constant';
import {
  CanvasElements,
  QrElement,
  SocialElement,
  TextElement,
  UploadElement,
  ImageElement,
  ElementsElement,
} from '@/types/editor.type';
import { SwitchCase } from '@/components/common/switch-case';
import TextCanvasElement from '@/components/editor/elements/text/element-text-canvas';
import UploadImageElement from '@/components/editor/elements/uploads/element-upload-canvas';
import UnsplashImageElement from '@/components/editor/elements/images/element-image-canvas';
import QrCanvasElement from '@/components/editor/elements/qr-social/element-qr-canvas';
import SocialCanvasElement from '@/components/editor/elements/qr-social/element-social-canvas';
import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from 'react';
import Konva from 'konva';
import { dataURLtoBlob } from '@/utils/editor/editor-data-url-to-blob';
import ElementsCanvasElement from '@/components/editor/elements/element/ElementsCanvasElement';

// 외부에서 접근할 메서드를 위한 타입 정의
export interface CardStageViewerRef {
  exportAsImage: () => Promise<Blob | null>;
  getStage: () => Konva.Stage | null;
}

interface CardStageViewerProps {
  isHorizontal?: boolean;
  elements: CanvasElements[];
  backgroundColor: string;
  previewMode?: boolean;
  size: {
    width: number;
    height: number;
  };
  onSocialClick?: ({
    url,
    elementName,
  }: {
    url: string;
    elementName: string;
  }) => Promise<void>;
}

const CardStageViewer = forwardRef<CardStageViewerRef, CardStageViewerProps>(
  (
    {
      isHorizontal,
      elements,
      backgroundColor,
      previewMode,
      onSocialClick,
      size,
    },
    ref
  ) => {
    const stageRef = useRef<Konva.Stage>(null);
    const [isStageReady, setIsStageReady] = useState(false);

    // Stage가 마운트되었는지 확인
    useEffect(() => {
      if (stageRef.current) {
        setIsStageReady(true);
      }
    }, []);

    // 외부에서 호출할 수 있는 메서드 노출
    useImperativeHandle(ref, () => ({
      exportAsImage: async () => {
        try {
          if (!isStageReady || !stageRef.current) {
            console.warn('Stage가 아직 준비되지 않았습니다.');
            return null;
          }

          // Stage가 렌더링되었는지 확인
          if (!stageRef.current.getStage()) {
            console.warn('Stage가 아직 렌더링되지 않았습니다.');
            return null;
          }

          // Konva 스테이지를 데이터 URL로 변환
          const dataURL = stageRef.current.toDataURL({
            pixelRatio: 2, // 고해상도
            mimeType: 'image/png',
          });

          // 데이터 URL을 Blob으로 변환
          return dataURLtoBlob(dataURL);
        } catch (error) {
          console.error('이미지 내보내기 중 오류 발생:', error);
          return null;
        }
      },
      getStage: () => stageRef.current,
    }));

    const stageWidth = BASE_STAGE_WIDTH;
    const stageHeight = BASE_STAGE_HEIGHT;

    const currentStageWidth = isHorizontal ? stageWidth : stageHeight;
    const currentStageHeight = isHorizontal ? stageHeight : stageWidth;

    return (
      <Stage
        ref={stageRef}
        width={size.width !== 0 ? size.width : currentStageWidth}
        height={size.height !== 0 ? size.height : currentStageHeight}
        scale={{
          x:
            (size.width !== 0 ? size.width : currentStageWidth) /
            currentStageWidth,
          y:
            (size.height !== 0 ? size.height : currentStageHeight) /
            currentStageHeight,
        }}
      >
        <Layer>
          <Rect
            x={0}
            y={0}
            width={size.width !== 0 ? size.width : currentStageWidth}
            height={size.height !== 0 ? size.height : currentStageHeight}
            fill={backgroundColor}
            listening={false}
            scale={{
              x:
                (size.width !== 0 ? size.width : currentStageWidth) /
                currentStageWidth,
              y:
                (size.height !== 0 ? size.height : currentStageHeight) /
                currentStageHeight,
            }}
          />
          {elements.map((el) => (
            <SwitchCase
              key={el.id}
              value={el.type}
              cases={{
                [ElEMENT_TYPE.TEXT]: (
                  <TextCanvasElement
                    element={el as TextElement}
                    onDragEnd={() => {}}
                    onDragMove={() => {}}
                    onTransformEnd={() => {}}
                    onDoubleClick={() => {}}
                    onSelect={() => {}}
                    editing={false}
                    previewMode={previewMode}
                  />
                ),
                [ElEMENT_TYPE.UPLOAD]: (
                  <UploadImageElement
                    element={el as UploadElement}
                    onDragEnd={() => {}}
                    onDragMove={() => {}}
                    onSelect={() => {}}
                    onTransformEnd={() => {}}
                    previewMode={previewMode}
                  />
                ),
                [ElEMENT_TYPE.IMAGE]: (
                  <UnsplashImageElement
                    element={el as ImageElement}
                    onDragEnd={() => {}}
                    onDragMove={() => {}}
                    onTransformEnd={() => {}}
                    onSelect={() => {}}
                    previewMode={previewMode}
                  />
                ),
                [ElEMENT_TYPE.QR]: (
                  <QrCanvasElement
                    element={el as QrElement}
                    onDragEnd={() => {}}
                    onDragMove={() => {}}
                    onTransformEnd={() => {}}
                    onSelect={() => {}}
                    previewMode={previewMode}
                  />
                ),
                [ElEMENT_TYPE.SOCIAL]: (
                  <SocialCanvasElement
                    element={el as SocialElement}
                    onDragEnd={() => {}}
                    onDragMove={() => {}}
                    onTransformEnd={() => {}}
                    onSelect={() => {}}
                    previewMode={previewMode}
                    onSocialClick={onSocialClick}
                  />
                ),
                [ElEMENT_TYPE.ELEMENT]: (
                  <ElementsCanvasElement
                    element={el as ElementsElement}
                    onDragEnd={() => {}}
                    onDragMove={() => {}}
                    onTransformEnd={() => {}}
                    onSelect={() => {}}
                    previewMode={previewMode}
                  />
                ),
              }}
              default={<></>}
            />
          ))}
        </Layer>
      </Stage>
    );
  }
);

export default CardStageViewer;
