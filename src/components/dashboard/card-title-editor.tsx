'use client';

import { useUpdateCardTitle } from '@/hooks/mutations/use-update-card-title';
import { Icon } from '@iconify/react/dist/iconify.js';
import React, { KeyboardEvent, useEffect, useRef, useState } from 'react';

interface Props {
  cardId: string;
  initialTitle: string;
  sortKey: string;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  onUpdate: (newTitle: string, updatedAt: string) => void;
}

const CardTitleEditor = ({
  cardId,
  initialTitle,
  sortKey,
  isEditing,
  setIsEditing,
  onUpdate,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate, isPending } = useUpdateCardTitle(sortKey);
  // 로컬상태 : 편집 중인 제목과 업데이트 상태
  const [title, setTitle] = useState(initialTitle);

  // initialTitle prop 이 바뀔 때마다 title state 동기화
  useEffect(() => {
    setTitle(initialTitle);
  }, [initialTitle]);

  // 편집 모드가 활성화되면 인풋에 포커스
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(title.length, title.length);
    }
  }, [isEditing, title]);

  // 제목 변경 저장
  const handleSave = () => {
    // 공백 또는 변경사항이 없으면 편집모드 해제
    if (!title.trim() || title === initialTitle) {
      setIsEditing(false);
      return;
    }

    // 옵티미스틱 뮤테이션
    mutate(
      {
        cardId,
        newTitle: title,
      },
      {
        onSuccess: (updated) => {
          // 상위 컴포넌트에 변경된 제목 전달
          onUpdate(updated.title, updated.updated_at!);
          setIsEditing(false);
        },
      }
    );
  };

  // 취소 처리
  const handleCancel = () => {
    // 입력값을 초기 제목으로
    setTitle(initialTitle);
    setIsEditing(false);
  };

  // 키보드: Enter -> 저장 / ESC -> 취소
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
      return;
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      handleCancel();
      return;
    }
  };

  if (!isEditing) {
    return (
      <p onClick={() => setIsEditing(true)} className='w-full truncate px-1'>
        {initialTitle || '제목을 입력해주세요...'}
      </p>
    );
  }

  return (
    <div className='flex w-full items-center justify-between px-1'>
      <input
        type='text'
        ref={inputRef}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isPending}
        maxLength={20} // 제목 최대 20자 제한
        className='flex-1 border-b border-dashed border-gray-60 focus:outline-none'
      />
      <button type='button' onClick={handleSave} disabled={isPending}>
        <Icon
          icon='tdesign:check'
          width='18'
          height='18'
          aria-label='제목 편집 완료'
        />
      </button>
    </div>
  );
};

export default CardTitleEditor;
