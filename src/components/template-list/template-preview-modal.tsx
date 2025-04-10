'use client';

import React from 'react';
import { Dialog, DialogContent, DialogOverlay } from '@/components/ui/dialog';
import Image from 'next/image';

interface Props {
  imageUrl: string | null; // 미리보기할 이미지 URL (null인경우 모달 닫힘)
  isOpen: boolean;
  onClose: () => void;
}

const TemplatePreviewModal = ({ imageUrl, isOpen, onClose }: Props) => {
  return (
    <Dialog
      open={isOpen && !!imageUrl}
      // 모달 바깥쪽 클릭하거나 esc 눌러도 모달 닫힘
      onOpenChange={(open) => !open && onClose()}
    >
      <DialogOverlay className='bg-black/70' />
      <DialogContent className='h-[700px] max-w-[700px]'>
        {imageUrl && (
          <Image
            src={imageUrl}
            alt='템플릿 미리보기'
            fill
            sizes='(max-width: 768px) 100vw, 700px'
            className='w-full rounded object-contain'
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TemplatePreviewModal;
