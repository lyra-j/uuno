import { SwitchCase } from '@/components/common/switch-case';
import BottomTabDownIcon from '@/components/icons/editor/bottomtab-down';
import BottomTabPolygonIcon from '@/components/icons/editor/bottomtab-polygon';
import BottomTabUpIcon from '@/components/icons/editor/bottomtab-up';
import { sideBarStore } from '@/store/editor.sidebar.store';
import { useEditorStore } from '@/store/editor.store';
import { useState } from 'react';
import { Layer, Rect, Stage } from 'react-konva';
import {
  ImageElement,
  QrElement,
  SocialElement,
  TextElement,
  UploadElement,
} from '@/types/editor.type';
import {
  BASE_STAGE_HEIGHT,
  BASE_STAGE_WIDTH,
  ElEMENT_TYPE,
} from '@/constants/editor.constant';
import PreviewTextCanvas from '../../elements/text/preview-text-canvas';
import PreviewUploadCanvas from '../../elements/uploads/preview-upload-canvas';
import PreviewImageCanvas from '../../elements/images/preview-image-canvas';
import PreviewQrCanvas from '../../elements/qr-social/preview-qr-canvas';
import PreviewSocialCanvas from '../../elements/qr-social/preview-social-canvas';

const EditorBottomTab = () => {
  const setCanvasFront = useEditorStore((state) => state.setCanvasFront);
  const setSelectedElementId = useEditorStore(
    (state) => state.setSelectedElementId
  );
  const front = useEditorStore((state) => state.isCanvasFront);
  const [bottomBarUp, setBottomBarUp] = useState(false);
  const isCanvasFront = useEditorStore((state) => state.isCanvasFront);
  const setisCanvasFront = useEditorStore((state) => state.setCanvasFront);
  const isHorizontal = sideBarStore((state) => state.isHorizontal);
  const canvasElement = useEditorStore((state) => state.canvasElements);

  const stageWidth = BASE_STAGE_WIDTH;
  const stageHeight = BASE_STAGE_HEIGHT;

  const currentStageWidth = isHorizontal ? stageWidth : stageHeight;
  const currentStageHeight = isHorizontal ? stageHeight : stageWidth;

  return (
    <>
      <div className='relative flex h-[40px] w-full items-center justify-center'>
        <div className='absolute left-1/2 top-3 z-10 -translate-x-1/2'>
          <BottomTabPolygonIcon />
        </div>
        <div
          className='absolute left-1/2 top-3 z-20 -translate-x-1/2 cursor-pointer'
          onClick={() => setBottomBarUp((prev) => !prev)}
        >
          {bottomBarUp ? <BottomTabDownIcon /> : <BottomTabUpIcon />}
        </div>
      </div>
      <div
        className={`${bottomBarUp ? 'h-[176px]' : 'h-[79px]'} w-full bg-white`}
      >
        {!bottomBarUp && (
          <div className='flex h-16 flex-row items-center justify-center bg-white'>
            <div className='flex h-[34px] w-[140px] items-center gap-2'>
              <button
                className={`z-10 flex w-[65px] items-center justify-center rounded-sm ${front && 'bg-primary-40'} border-gray-30 bg-gray-10 px-5 py-2`}
                onClick={() => {
                  setCanvasFront(true);
                  setSelectedElementId(null);
                }}
              >
                <p
                  className={`text-caption-medium ${front ? 'text-white' : 'text-black'}`}
                >
                  앞면
                </p>
              </button>
              <button
                className={`z-10 flex w-[65px] items-center justify-center rounded-sm ${!front && 'bg-primary-40'} border-gray-30 bg-gray-10 px-5 py-2`}
                onClick={() => {
                  setCanvasFront(false);
                  setSelectedElementId(null);
                }}
              >
                <p
                  className={`text-caption-medium ${!front ? 'text-white' : 'text-black'}`}
                >
                  뒷면
                </p>
              </button>
            </div>
          </div>
        )}
        {bottomBarUp && (
          <div className='flex h-[176px] items-center justify-center bg-white'>
            <div
              className={`z-10 flex ${
                isHorizontal
                  ? 'h-[110px] w-[240px] flex-row'
                  : 'h-[150px] w-[150px] flex-row'
              } items-center gap-3`}
            >
              <div
                className={`g-1 flex ${
                  isHorizontal ? 'h-full w-[117px]' : 'h-[117px] w-full'
                } flex-col items-center justify-center`}
                onClick={() => setisCanvasFront(true)}
              >
                <div
                  className={`flex ${
                    isHorizontal ? 'h-[61px] w-[117px]' : 'h-[117px] w-[61px]'
                  } items-center justify-center border ${
                    isCanvasFront ? 'border-black' : 'border-gray-20'
                  } cursor-pointer p-[11px]`}
                >
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
                        // fill={backgroundColor}
                        listening={false}
                      />
                      {canvasElement.map((el) => (
                        <SwitchCase
                          key={el.id}
                          value={el.type}
                          cases={{
                            [ElEMENT_TYPE.TEXT]: (
                              <PreviewTextCanvas element={el as TextElement} />
                            ),
                            [ElEMENT_TYPE.UPLOAD]: (
                              <PreviewUploadCanvas
                                element={el as UploadElement}
                              />
                            ),
                            [ElEMENT_TYPE.IMAGE]: (
                              <PreviewImageCanvas
                                element={el as ImageElement}
                              />
                            ),
                            [ElEMENT_TYPE.QR]: (
                              <PreviewQrCanvas element={el as QrElement} />
                            ),
                            [ElEMENT_TYPE.SOCIAL]: (
                              <PreviewSocialCanvas
                                element={el as SocialElement}
                              />
                            ),
                          }}
                          default={<></>}
                        />
                      ))}
                    </Layer>
                  </Stage>
                </div>
                <p className='text-caption-regular text-black'>앞면</p>
              </div>
              <div
                className={`g-1 flex ${
                  isHorizontal ? 'h-full w-[117px]' : 'h-[117px] w-full'
                } flex-col items-center justify-center`}
                onClick={() => setisCanvasFront(false)}
              >
                <div
                  className={`flex ${
                    isHorizontal ? 'h-[61px] w-[117px]' : 'h-[117px] w-[61px]'
                  } items-center justify-center border ${
                    !isCanvasFront ? 'border-black' : 'border-gray-20'
                  } cursor-pointer p-[11px]`}
                ></div>
                <p className='text-caption-regular text-black'>뒷면</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EditorBottomTab;
