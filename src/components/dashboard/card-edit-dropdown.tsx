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
import { deleteCard } from '@/apis/dashboard.api';
import Link from 'next/link';
import { ROUTES } from '@/constants/path.constant';
import { useCommonModalStore } from '@/store/common-modal.store';
import sweetAlertUtil from '@/utils/common/sweet-alert-util';
import customSweetAlert from '@/utils/card-detail/custom-sweet-alert';
import Swal from 'sweetalert2';

interface Props {
  cardId: string;
  title: string;
  dateLabel: string;
  onEdit: () => void;
  slug: string;
}

const CardEditDropdown = ({
  cardId,
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
  /**
   * handleDelete: 삭제하기 항목 클릭 시 호출되어,
   * 사용자에게 컨펌을 요청한 후, 확인되면 서버액션을 호출하여 해당 카드를 삭제.
   */
  const handleDeleteCard = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setOpen(false);
    const confirmed = customSweetAlert.confirmCardDelete(async () => {
      if (!confirmed) return;

      setIsDeleting(true);

      try {
        await deleteCard(cardId);
        setOpen(false);

        Swal.fire({
          toast: true, // 토스트 모드 활성화
          position: 'top-end', // 토스트 위치 설정 (오른쪽 상단)
          icon: 'success', // 성공 아이콘
          title: '명함 삭제 성공', // 표시할 메시지
          showConfirmButton: false, // 확인 버튼 미표시
          timer: 3000, // 3초 후 자동 닫힘
          timerProgressBar: true, // 타이머 진행 바 표시
          iconColor: '#3970d5', // 커스텀 아이콘 컬러
        });
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
                  setOpen(false); // 편집 시작할 때 드롭다운 닫기
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
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              // Todo => 저장하기 기능 확인 필요
              setOpen(false); // 액션 후 드롭다운 닫기
            }}
          >
            <Icon icon='tdesign:save' width='16' height='16' />
            저장하기
          </DropdownMenuItem>
          {/* 공유하기 모달 */}
          <DropdownMenuItem onClick={openModal}>
            <Icon icon='tdesign:share' width='16' height='16' />
            공유하기
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
