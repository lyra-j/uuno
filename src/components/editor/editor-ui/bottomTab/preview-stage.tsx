import { SwitchCase } from '@/components/common/switch-case';
import {
  BASE_STAGE_HEIGHT,
  BASE_STAGE_WIDTH,
  ElEMENT_TYPE,
} from '@/constants/editor.constant';
import { sideBarStore } from '@/store/editor.sidebar.store';
import { Layer, Rect, Stage } from 'react-konva';
import PreviewTextCanvas from '../../elements/text/preview-text-canvas';
import {
  CanvasElements,
  ImageElement,
  QrElement,
  SocialElement,
  TextElement,
  UploadElement,
} from '@/types/editor.type';
import PreviewUploadCanvas from '../../elements/uploads/preview-upload-canvas';
import PreviewImageCanvas from '../../elements/images/preview-image-canvas';
import PreviewQrCanvas from '../../elements/qr-social/preview-qr-canvas';
import PreviewSocialCanvas from '../../elements/qr-social/preview-social-canvas';

interface PreviewStage {
  element: CanvasElements[];
  backgroundColor: string;
}

const PreviewStage = ({ element, backgroundColor }: PreviewStage) => {
  const isHorizontal = sideBarStore((state) => state.isHorizontal);

  const stageWidth = BASE_STAGE_WIDTH;
  const stageHeight = BASE_STAGE_HEIGHT;

  const currentStageWidth = isHorizontal ? stageWidth : stageHeight;
  const currentStageHeight = isHorizontal ? stageHeight : stageWidth;

  return (
    <Stage
      width={isHorizontal ? 117 : 61}
      height={isHorizontal ? 61 : 117}
      scale={{
        x: (isHorizontal ? 117 : 61) / currentStageWidth,
        y: (isHorizontal ? 61 : 117) / currentStageHeight,
      }}
    >
      <Layer>
        <Rect
          x={0}
          y={0}
          width={isHorizontal ? 117 : 61}
          height={isHorizontal ? 61 : 117}
          scale={{
            x: isHorizontal ? 117 : 61,
            y: isHorizontal ? 61 : 117,
          }}
          fill={backgroundColor}
          listening={false}
        />
        {element.map((el) => (
          <SwitchCase
            key={el.id}
            value={el.type}
            cases={{
              [ElEMENT_TYPE.TEXT]: (
                <PreviewTextCanvas element={el as TextElement} />
              ),
              [ElEMENT_TYPE.UPLOAD]: (
                <PreviewUploadCanvas element={el as UploadElement} />
              ),
              [ElEMENT_TYPE.IMAGE]: (
                <PreviewImageCanvas element={el as ImageElement} />
              ),
              [ElEMENT_TYPE.QR]: <PreviewQrCanvas element={el as QrElement} />,
              [ElEMENT_TYPE.SOCIAL]: (
                <PreviewSocialCanvas element={el as SocialElement} />
              ),
            }}
            default={<></>}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default PreviewStage;
