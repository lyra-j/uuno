'use client';

import { useState, useEffect } from 'react';
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
import { usePromptDialogStore } from '@/store/editor.prompt-dialog.store';

export const CommonPromptDialog = () => {
  const { isOpen, title, description, placeholder, resolve, close } =
    usePromptDialogStore();
  const [inputValue, setInputValue] = useState('');

  // 다이얼로그가 열릴 때 input 초기화
  useEffect(() => {
    if (isOpen) setInputValue('');
  }, [isOpen]);

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        <div className='mt-2'>
          <input
            type='text'
            className='w-full rounded border px-2 py-1'
            placeholder={placeholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            autoFocus
          />
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={close}>취소</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              resolve(inputValue.trim() || null);
              close();
            }}
          >
            확인
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
