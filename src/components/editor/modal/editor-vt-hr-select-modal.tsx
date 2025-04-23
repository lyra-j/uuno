'use client';

import CanvasHorizonIcon from '@/components/icons/editor/canvas-horizon';
import CanvasVerticalIcon from '@/components/icons/editor/canvas-vericle';
import { sideBarStore } from '@/store/editor.sidebar.store';
import { useEffect, useState } from 'react';

interface Props {
  isHorizontal: boolean | undefined;
}

const CanvasSelectModal = ({ isHorizontal }: Props) => {
  const [openCanvasModal, setOpenCanvasModal] = useState(true);
  const setIsHorizontal = sideBarStore((state) => state.setIsHorizontal);
  const setZoom = sideBarStore((state) => state.setZoom);

  useEffect(() => {
    if (isHorizontal !== undefined) {
      setIsHorizontal(isHorizontal);
      setOpenCanvasModal(false);
    }
  }, [isHorizontal, setIsHorizontal]);

  if (!openCanvasModal) {
    return null;
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
      <div
        className='shad flex h-[218px] w-[296px] flex-shrink-0 flex-col items-center justify-center gap-6 rounded-md bg-white px-8 py-6'
        style={{ boxShadow: '2px 2px 8px 0px rgba(0, 0, 0, 0.25)' }}
      >
        <h2 className='text-label2-medium text-black'>
          화면의 형태를 선택해 주세요
        </h2>
        <div className='flex h-[126px] w-[232px] flex-shrink-0 items-start justify-center gap-[24px]'>
          <div
            className='group flex h-[126px] w-[104px] flex-shrink-0 cursor-pointer flex-col items-center justify-center rounded-sm border border-gray-10 bg-white px-6 py-[19px] hover:border-primary-40'
            onClick={() => {
              setOpenCanvasModal(false);
              setIsHorizontal(true);
            }}
          >
            <div className='flex w-14 flex-col items-center gap-[16px]'>
              <CanvasHorizonIcon className='h-[56px] w-[56px] text-gray-70 group-hover:text-primary-40' />
              <p className='text-center text-caption-medium text-gray-70 group-hover:text-primary-40'>
                가로형태
              </p>
            </div>
          </div>
          <div
            className='group flex h-[126px] w-[104px] flex-shrink-0 cursor-pointer flex-col items-center justify-center rounded-sm border border-gray-10 bg-white px-6 py-[19px] hover:border-primary-40'
            onClick={() => {
              setOpenCanvasModal(false);
              setIsHorizontal(false);
              setZoom(1.4);
            }}
          >
            <div className='flex w-14 flex-col items-center gap-[16px]'>
              <CanvasVerticalIcon className='h-[56px] w-[56px] text-gray-70 group-hover:text-primary-40' />
              <p className='text-center text-caption-medium text-gray-70 group-hover:text-primary-40'>
                세로형태
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanvasSelectModal;
