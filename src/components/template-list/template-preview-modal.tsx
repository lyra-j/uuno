'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from '@/components/ui/dialog';
import Image from 'next/image';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

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
      <DialogContent className='aspect-square max-w-[700px]'>
        {/* 접근성 에러 해결을 위해 titel 추가, 타이틀을 보이지 않게 하기 위해 VisullyHidden 으로 감싸주기 */}
        <VisuallyHidden>
          <DialogTitle>템플릿 이미지 미리보기</DialogTitle>
        </VisuallyHidden>
        {imageUrl && (
          <Image
            src={imageUrl}
            alt='템플릿 미리보기'
            fill
            sizes='(max-width: 768px) 100vw, 700px'
            className='w-full rounded object-cover'
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TemplatePreviewModal;
