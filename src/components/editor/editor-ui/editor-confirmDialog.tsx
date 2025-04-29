'use client';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { useConfirmDialogStore } from '@/store/editor.confirm-dialog.store';

export const CommonConfirmDialog = () => {
  const {
    isOpen,
    title,
    description,
    confirmText = '확인',
    cancelText = '취소',
    onConfirm,
    onCancel,
    close,
    icon,
  } = useConfirmDialogStore();

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <AlertDialogContent className='max-w-[380px] p-6'>
        <AlertDialogHeader className='text-center'>
          {icon && <div className='mb-2 flex justify-center'>{icon}</div>}
          <AlertDialogTitle className='text-label2-semi'>
            {title}
          </AlertDialogTitle>
          {description && (
            <AlertDialogDescription className='text-caption-regular text-gray-500'>
              {description}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter className='mt-4'>
          <AlertDialogCancel
            onClick={() => {
              onCancel?.();
              close();
            }}
          >
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              onConfirm?.();
              close();
            }}
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
