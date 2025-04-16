import BottomTabDownIcon from '@/components/icons/editor/bottomtab-down';
import BottomTabPolygonIcon from '@/components/icons/editor/bottomtab-polygon';
import BottomTabUpIcon from '@/components/icons/editor/bottomtab-up';
import { sideBarStore } from '@/store/editor.sidebar.store';
import { useEditorStore } from '@/store/editor.store';
import { useState } from 'react';

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
                ></div>
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
