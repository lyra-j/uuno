'use client';
import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Icon } from '@iconify/react/dist/iconify.js';
import DeleteIcon from '@/components/icons/delete-icon';
import PreviewIcon from '@/components/icons/preview-icon';
import MoreMenuIcon from '@/components/icons/more-menu-icon';
import PencilIcon from '@/components/icons/pencil-icon';
import Link from 'next/link';
import { ROUTES } from '@/constants/path.constant';
import { useCommonModalStore } from '@/store/common-modal.store';
import sweetAlertUtil from '@/utils/common/sweet-alert-util';
import customSweetAlert from '@/utils/card-detail/custom-sweet-alert';
import { deleteCard } from '@/apis/card-delete';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMyCardDelete } from '@/hooks/mutations/use-mycard-delete';

interface Props {
  cardId: string;
  userId: string;
  title: string;
  dateLabel: string;
  onEdit: () => void;
  slug: string;
}

const CardEditDropdown = ({
  cardId,
  userId,
  title,
  dateLabel,
  onEdit,
  slug,
}: Props) => {
  // 드롭다운 상태 관리 추가
  const [open, setOpen] = useState(false);
  // 삭제 중 상태 관리 추가
  const [isDeleting, setIsDeleting] = useState(false);

  const openModal = useCommonModalStore((state) => state.open);

  const { mutate: deleteMutate } = useMyCardDelete(userId);

  const handleDeleteCard = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setOpen(false);
    const confirmed = customSweetAlert.confirmCardDelete(async () => {
      if (!confirmed) return;

      setIsDeleting(true);

      try {
        await deleteMutate({ slug, cardId });
        setOpen(false);

        sweetAlertUtil.success(
          '삭제 성공',
          '명함이 성공적으로 삭제되었습니다.'
        );
      } catch (error) {
        sweetAlertUtil.error(
          '삭제 실패',
          '명함을 삭제하는 중 오류가 발생했습니다.'
        );
      } finally {
        setIsDeleting(false);
      }
    });
  };

  return (
    <div className='group relative z-50'>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        {/* 트리거 버튼 */}
        <DropdownMenuTrigger asChild>
          <button
            type='button'
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
            aria-label='카드 메뉴 열기'
            aria-haspopup='true'
            aria-expanded={open}
            className='absolute right-1 top-1 flex h-10 w-10 items-center justify-center rounded opacity-0 transition-opacity group-hover:opacity-100'
          >
            <MoreMenuIcon />
          </button>
        </DropdownMenuTrigger>

        {/* 드롭다운 메뉴 내용 */}
        <DropdownMenuContent
          side='right'
          align='end'
          className='z-50 w-[206px]'
        >
          {/* 드롭다운 라벨 */}
          <DropdownMenuLabel className='flex flex-col'>
            <div className='flex items-center justify-between text-label1-bold'>
              {title}
              <button
                type='button'
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  onEdit(); // 제목 편집모드 전환

                  setTimeout(() => {
                    setOpen(false); // 편집 시작할 때 드롭다운 닫기
                  }, 10);
                }}
              >
                <PencilIcon />
              </button>
            </div>
            <div className='mt-1 text-caption-medium text-gray-60'>
              {dateLabel}
            </div>
          </DropdownMenuLabel>

          {/* 구분선 */}
          <DropdownMenuSeparator className='my-2' />
          {/* 드롭다운 목록 */}

          {/* 공유하기 모달 */}
          {/* TODO: 공유하기 모달이 잘 열리지만 배경이 보이지 않고 완전 까맣게 됨. 확인 및 수정필요 */}
          <DropdownMenuItem onClick={openModal}>
            <Icon icon='tdesign:save' width='16' height='16' />
            저장 및 공유하기
          </DropdownMenuItem>

          <DropdownMenuItem onClick={handleDeleteCard} disabled={isDeleting}>
            <DeleteIcon />
            {isDeleting ? '삭제 중...' : '삭제하기'}
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href={`${ROUTES.MYCARD}/${cardId}`}>
              <Icon icon='tdesign:leaderboard' width='18' height='18' />
              통계보기
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href={`${ROUTES.EDITOR}?cardId=${cardId}`}>
              <Icon icon='tdesign:edit-2' width='18' height='18' />
              편집하기
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href={`/${slug}`}>
              <PreviewIcon />
              공유 화면 미리보기
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CardEditDropdown;
