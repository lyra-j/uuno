'use client';

import { Stage, Layer, Rect } from 'react-konva';
import { ElEMENT_TYPE } from '@/constants/editor.constant';
import {
  CanvasElements,
  QrElement,
  SocialElement,
  TextElement,
  UploadElement,
  ImageElement,
} from '@/types/editor.type';
import { SwitchCase } from '../common/switch-case';
import TextCanvasElement from '../editor/elements/text/element-text-canvas';
import UploadImageElement from '../editor/elements/uploads/element-upload-canvas';
import UnsplashImageElement from '../editor/elements/images/element-image-canvas';
import QrCanvasElement from '../editor/elements/qr-social/element-qr-canvas';
import SocialCanvasElement from '../editor/elements/qr-social/element-social-canvas';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import Konva from 'konva';
import { dataURLtoBlob } from '@/utils/editor/editor-data-url-to-blob';

// 외부에서 접근할 메서드를 위한 타입 정의
export interface CardStageViewerRef {
  exportAsImage: () => Promise<Blob>;
}

interface CardStageViewerProps {
  isHorizontal?: boolean;
  elements: CanvasElements[];
  backgroundColor: string;
  previewMode?: boolean;
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
    { isHorizontal, elements, backgroundColor, previewMode, onSocialClick },
    ref
  ) => {
    const WIDTH = isHorizontal ? 468 : 244;
    const HEIGHT = isHorizontal ? 244 : 468;

    const stageRef = useRef<Konva.Stage>(null);

    // 외부에서 호출할 수 있는 메서드 노출
    useImperativeHandle(ref, () => ({
      exportAsImage: async () => {
        if (!stageRef.current) {
          throw new Error('Stage not found');
        }

        // Konva 스테이지를 데이터 URL로 변환
        const dataURL = stageRef.current.toDataURL({
          pixelRatio: 2, // 고해상도
          mimeType: 'image/png',
        });

        // 데이터 URL을 Blob으로 변환
        return dataURLtoBlob(dataURL);
      },
    }));
    return (
      <Stage
        ref={stageRef}
        width={WIDTH}
        height={HEIGHT}
        style={{ pointerEvents: 'auto' }}
      >
        <Layer>
          <Rect
            x={0}
            y={0}
            width={WIDTH}
            height={HEIGHT}
            fill={backgroundColor}
            listening={false}
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
                    onDragStart={() => {}}
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
                    onDragStart={() => {}}
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
                    onDragStart={() => {}}
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
                    onDragStart={() => {}}
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
                    onDragStart={() => {}}
                    onDragMove={() => {}}
                    onTransformEnd={() => {}}
                    onSelect={() => {}}
                    previewMode={previewMode}
                    onSocialClick={onSocialClick}
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
