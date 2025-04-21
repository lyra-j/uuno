import BottomTabDownIcon from '@/components/icons/editor/bottomtab-down';
import BottomTabPolygonIcon from '@/components/icons/editor/bottomtab-polygon';
import BottomTabUpIcon from '@/components/icons/editor/bottomtab-up';
import { sideBarStore } from '@/store/editor.sidebar.store';
import { useEditorStore } from '@/store/editor.store';
import { useState } from 'react';
import PreviewStage from './preview-stage';
import { useShallow } from 'zustand/react/shallow';

const EditorBottomTab = () => {
  const {
    setCanvasFront,
    setSelectedElementId,
    isFront,
    canvasElement,
    canvasBackElement,
    backgroundColor,
    backgroundColorBack,
  } = useEditorStore(
    useShallow((state) => ({
      setCanvasFront: state.setCanvasFront,
      setSelectedElementId: state.setSelectedElementId,
      isFront: state.isCanvasFront,
      canvasElement: state.canvasElements,
      canvasBackElement: state.canvasBackElements,
      backgroundColor: state.backgroundColor ?? '#fff',
      backgroundColorBack: state.backgroundColorBack ?? '#fff',
    }))
  );
  const isHorizontal = sideBarStore((state) => state.isHorizontal);
  const [bottomBarUp, setBottomBarUp] = useState(false);

  const flip = (side: 'front' | 'back') => {
    setSelectedElementId(null);
    side === 'front' ? setCanvasFront(true) : setCanvasFront(false);
  };

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
                className={`z-10 flex w-[65px] items-center justify-center rounded-sm ${isFront && 'bg-primary-40'} border-gray-30 bg-gray-10 px-5 py-2`}
                onClick={() => {
                  flip('front');
                }}
              >
                <p
                  className={`text-caption-medium ${isFront ? 'text-white' : 'text-black'}`}
                >
                  앞면
                </p>
              </button>
              <button
                className={`z-10 flex w-[65px] items-center justify-center rounded-sm ${!isFront && 'bg-primary-40'} border-gray-30 bg-gray-10 px-5 py-2`}
                onClick={() => {
                  flip('back');
                }}
              >
                <p
                  className={`text-caption-medium ${!isFront ? 'text-white' : 'text-black'}`}
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
                onClick={() => flip('front')}
              >
                <div
                  className={`flex ${
                    isHorizontal ? 'h-[63px] w-[119px]' : 'h-[119px] w-[63px]'
                  } items-center justify-center border ${
                    isFront ? 'border-black' : 'border-gray-20'
                  } cursor-pointer p-[11px]`}
                >
                  <PreviewStage
                    element={canvasElement}
                    backgroundColor={backgroundColor}
                  />
                </div>
                <p className='text-caption-regular text-black'>앞면</p>
              </div>
              <div
                className={`g-1 flex ${
                  isHorizontal ? 'h-full w-[117px]' : 'h-[117px] w-full'
                } flex-col items-center justify-center`}
                onClick={() => flip('back')}
              >
                <div
                  className={`flex ${
                    isHorizontal ? 'h-[63px] w-[119px]' : 'h-[119px] w-[63px]'
                  } items-center justify-center border ${
                    !isFront ? 'border-black' : 'border-gray-20'
                  } cursor-pointer p-[11px]`}
                >
                  <PreviewStage
                    element={canvasBackElement}
                    backgroundColor={backgroundColorBack}
                  />
                </div>
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
