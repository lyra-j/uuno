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

  // 편집 모드가 활성화되면 인풋에 포커스
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
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
    return <p>{initialTitle || '제목을 입력해주세요...'}</p>;
  }

  return (
    <form onSubmit={handleSubmit} className='flex w-full'>
      <input
        ref={inputRef}
        type='text'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={handleSubmit}
        disabled={isUpdating}
        className='mr-2 border-b border-dashed border-gray-60 focus:outline-none'
      />
      <Icon icon='tdesign:check' width='18' height='18' />
      {/* <button
        onClick={handleSave}
        disabled={isPending}
        className='disabled:opacity-50'
      >
      </button> */}
    </form>
  );
};

export default CardTitleEditor;
