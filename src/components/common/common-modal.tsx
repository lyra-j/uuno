'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useCommonModalStore } from '@/store/common-modal.store';
import clsx from 'clsx';
import LeftArrow from '../icons/left-arrow';

export function CommonModal() {
  const {
    isOpen,
    title,
    description,
    content,
    footer,
    maxWidth,
    ctnClassName,
    close,
    onClose,
  } = useCommonModalStore();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      if (onClose) {
        onClose(); // 사용자 정의 onClose 호출
      }
      close();
    }
  };

  const maxWidthStyle = {
    xs: 'md:max-w-xs',
    sm: 'md:max-w-sm',
    md: 'md:max-w-md',
    lg: 'md:max-w-lg',
    xl: 'md:max-w-xl',
    full: 'md:max-w-full',
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className={clsx(
          `${maxWidthStyle[maxWidth || 'md']}`,
          ctnClassName,
          'block h-full w-full max-w-none md:flex md:h-auto md:flex-col'
        )}
        aria-describedby={description ? 'dialog-description' : 'dialog-content'}
      >
        <DialogHeader className='flex h-auto items-center space-y-0 py-1 text-center md:pb-1 md:text-left'>
          <DialogTitle className='relative w-full text-label1-semi md:text-heading-semi'>
            <div onClick={close} className='absolute cursor-pointer md:hidden'>
              <LeftArrow size={16} />
            </div>
            {title}
          </DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className='py-2'>{content}</div>
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}
