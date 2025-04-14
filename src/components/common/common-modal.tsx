'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useCommonModalStore } from '@/store/common-modal.store';
import clsx from 'clsx';
import { ReactNode } from 'react';

interface CommonModalProps {
  title: string;
  description?: string;
  ctnClassName?: string;
  children: ReactNode;
  footer?: ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export function CommonModal({
  title,
  description,
  ctnClassName,
  children,
  footer,
  maxWidth,
}: CommonModalProps) {
  const isOpen = useCommonModalStore((state) => state.isOpen);
  const close = useCommonModalStore((state) => state.close);
  const handleOpenChange = (open: boolean) => {
    if (!open) {
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
        className={clsx(`${maxWidthStyle[maxWidth || 'md']}`, ctnClassName)}
      >
        <DialogHeader>
          <DialogTitle className='text-heading-semi'>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className='py-4'>{children}</div>
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}
