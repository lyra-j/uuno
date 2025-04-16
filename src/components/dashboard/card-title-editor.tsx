'use client';
import { updateCardTitle } from '@/apis/dashboard.api';
import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useEffect, useRef, useState } from 'react';

interface Props {
  cardId: string;
  initialTitle: string;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  onUpdate: (newTitle: string) => void;
}

const CardTitleEditor = ({
  cardId,
  initialTitle,
  isEditing,
  setIsEditing,
  onUpdate,
}: Props) => {
  const [title, setTitle] = useState(initialTitle);
  const [isUpdating, setIsUpdating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // 편집 모드가 활성화되면 인풋에 포커스
  useEffect(() => {
    if (isEditing) {
      setTimeout(() => {
        const input = inputRef.current;
        if (input) {
          input.focus();
          const length = input.value.length;
          input.setSelectionRange(length, length);
        }
      }, 10);
    }
  }, [isEditing]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!title.trim()) {
      setTitle(initialTitle);
      setIsEditing(false);
      return;
    }

    if (title === initialTitle) {
      setIsEditing(false);
      return;
    }

    setIsUpdating(true);

    try {
      const updatedCard = await updateCardTitle(cardId, title);
      onUpdate(updatedCard.title);
      setIsEditing(false);
    } catch (error) {
      console.error('제목 업데이트 실패:', error);
      setTitle(initialTitle); // 에러 시 원래 제목으로 복원
    } finally {
      setIsUpdating(false);
    }
  };

  if (!isEditing) {
    return (
      <p className='w-full px-1'>{initialTitle || '제목을 입력해주세요...'}</p>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className='flex w-full items-center justify-between px-1'
    >
      <input
        ref={inputRef}
        type='text'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={isUpdating}
        className='mr-2 w-full border-b border-dashed border-gray-60 focus:outline-none'
      />
      <button type='button' onClick={handleSubmit} disabled={isUpdating}>
        <Icon
          icon='tdesign:check'
          width='18'
          height='18'
          aria-label='제목 편집 완료'
        />
      </button>
    </form>
  );
};

export default CardTitleEditor;
