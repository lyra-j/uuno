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

interface Props {
  elements: CanvasElements[];
  backgroundColor: string;
}

const CardStageViewer = ({ elements, backgroundColor }: Props) => {
  return (
    <Stage width={468} height={244} style={{ pointerEvents: 'auto' }}>
      <Layer>
        <Rect
          x={0}
          y={0}
          width={468}
          height={244}
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
                  onDragMove={() => {}}
                  onTransformEnd={() => {}}
                  onDoubleClick={() => {}}
                  onSelect={() => {}}
                  editing={false}
                />
              ),
              [ElEMENT_TYPE.UPLOAD]: (
                <UploadImageElement
                  element={el as UploadElement}
                  onDragEnd={() => {}}
                  onDragMove={() => {}}
                  onSelect={() => {}}
                  onTransformEnd={() => {}}
                />
              ),
              [ElEMENT_TYPE.IMAGE]: (
                <UnsplashImageElement
                  element={el as ImageElement}
                  onDragEnd={() => {}}
                  onDragMove={() => {}}
                  onTransformEnd={() => {}}
                  onSelect={() => {}}
                />
              ),
              [ElEMENT_TYPE.QR]: (
                <QrCanvasElement
                  element={el as QrElement}
                  onDragEnd={() => {}}
                  onDragMove={() => {}}
                  onTransformEnd={() => {}}
                  onSelect={() => {}}
                />
              ),
              [ElEMENT_TYPE.SOCIAL]: (
                <SocialCanvasElement
                  element={el as SocialElement}
                  onDragEnd={() => {}}
                  onDragMove={() => {}}
                  onTransformEnd={() => {}}
                  onSelect={() => {}}
                  previewMode={true}
                />
              ),
            }}
            default={<></>}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default CardStageViewer;
