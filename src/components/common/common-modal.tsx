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
    xs: 'sm:max-w-xs',
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-md',
    lg: 'sm:max-w-lg',
    xl: 'sm:max-w-xl',
    full: 'sm:max-w-full',
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className={clsx(
          `${maxWidthStyle[maxWidth || 'md']}`,
          ctnClassName,
          'md:max-w-auto h-full !max-w-full md:h-auto'
        )}
        aria-describedby={description ? 'dialog-description' : 'dialog-content'}
      >
        <DialogHeader>
          <DialogTitle className='text-label1-semi md:text-heading-semi'>
            <div className='absolute md:hidden'>
              <LeftArrow size={16} />
            </div>
            {title}
          </DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className='py-4'>{content}</div>
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}
