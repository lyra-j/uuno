'use client';
import React, { useEffect, useState } from 'react';
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
import PencilIcon from '@/components/icons/pencil-icon';
import Link from 'next/link';
import { ROUTES } from '@/constants/path.constant';
import sweetAlertUtil from '@/utils/common/sweet-alert-util';
import customSweetAlert from '@/utils/card-detail/custom-sweet-alert';
import { useMyCardDelete } from '@/hooks/mutations/use-mycard-delete';
import { useSaveShareModalStore } from '@/store/save-share-modal.store';
import { authStore } from '@/store/auth.store';
import { Ellipsis } from 'lucide-react';
import { useSheetStore } from '@/store/sheet.store';

interface Props {
  cardId: string;
  userId: string;
  title: string;
  dateLabel: string;
  onEdit: () => void;
  slug: string;
  imageUrl: string;
}

const CardEditDropdown = ({
  cardId,
  userId,
  title,
  dateLabel,
  onEdit,
  slug,
  imageUrl,
}: Props) => {
  const [open, setOpen] = useState(false); // 드롭다운 상태 관리, 제목 편집 모드시 드롭다운이 닫히지 않아서 설정
  const [isDeleting, setIsDeleting] = useState(false); // 삭제 처리중 상태 관리
  const nickName = authStore((state) => state.userName);
  const openShareModal = useSaveShareModalStore((state) => state.open); // 저장 및 공유 모달 오픈
  const openSheet = useSheetStore((state) => state.open); // 바텀 시트 오픈
  const closeSheet = useSheetStore((state) => state.close); // 바텀 시트 닫기
  const { mutate: deleteMutate } = useMyCardDelete({ slug, cardId, userId });

  const handleOpenShareModal = () => {
    if (slug) {
      openShareModal({
        cardId,
        linkUrl: `${window.location.origin}/${slug}?source=link`,
        title: `${nickName}의 명함`,
        imageUrl,
        description: 'Uuno에서 생성한 명함',
        cardTitle: title,
      });
    }
  };

  // 명함 삭제 핸들러
  const handleDeleteCard = () => {
    setOpen(false);
    const confirmed = customSweetAlert.confirmCardDelete(() => {
      if (!confirmed) return;

      setIsDeleting(true);

      try {
        deleteMutate();
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

  // TODO: 메뉴 구현 방식 변경 필요, 버튼 로직이 일부 작동하지 않아 하드 코딩
  const handleOpenBottomSheet = () => {
    openSheet({
      side: 'bottom',
      title,
      description: dateLabel,
      showCloseButton: false,
      content: (
        <div className='space-y-2 p-4'>
          {/* 저장 및 공유하기 */}
          <button
            onClick={() => {
              closeSheet();
              handleOpenShareModal();
            }}
            className='flex w-full items-center p-2 hover:text-primary-40'
          >
            <Icon icon='tdesign:save' width='16' height='16' />
            <span className='ml-2'>저장 및 공유하기</span>
          </button>

          {/* 삭제하기 */}
          <button
            onClick={() => {
              closeSheet();
              handleDeleteCard();
            }}
            disabled={isDeleting}
            className='flex w-full items-center rounded p-2 hover:text-primary-40'
          >
            <DeleteIcon />
            <span className='ml-2'>
              {isDeleting ? '삭제 중...' : '삭제하기'}
            </span>
          </button>

          {/* 통계보기 */}
          <Link
            href={`${ROUTES.MYCARD}/${cardId}`}
            onClick={() => closeSheet()}
            className='flex items-center rounded p-2 hover:text-primary-40'
          >
            <Icon icon='tdesign:leaderboard' width='18' height='18' />
            <span className='ml-2'>통계보기</span>
          </Link>

          {/* 편집하기 */}
          <Link
            href={`${ROUTES.EDITOR}?cardId=${cardId}`}
            onClick={() => closeSheet()}
            className='flex items-center rounded p-2 hover:text-primary-40'
          >
            <Icon icon='tdesign:edit-2' width='18' height='18' />
            <span className='ml-2'>편집하기</span>
          </Link>

          {/* 미리보기 */}
          <Link
            href={`/${slug}`}
            onClick={() => closeSheet()}
            className='flex items-center rounded p-2 hover:text-primary-40'
          >
            <PreviewIcon />
            <span className='ml-2'>공유 화면 미리보기</span>
          </Link>
        </div>
      ),
    });
  };

  return (
    <div className='group relative z-50'>
      {/* --- 데스크탑(md이상) : hover시 버튼 표시, 클릭시 드롭다운 --- */}
      <div className='hidden md:block'>
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
              className='absolute right-[10px] top-[10px] flex h-8 w-8 items-center justify-center rounded-full border border-gray-5 bg-white opacity-0 transition-opacity group-hover:opacity-100'
            >
              <Ellipsis />
            </button>
          </DropdownMenuTrigger>

          {/* 드롭다운 메뉴 내용 */}
          <DropdownMenuContent
            side='bottom'
            align='end'
            className='z-50 w-[206px]'
          >
            {/* 드롭다운 라벨 */}
            {/* TODO : 공유 모달 수정하면서 마운트시 처음 모달을 열때 바로 닫힘 현상이 생김, 확인 필요 */}
            {/* --- 메뉴 제일 위: 명함 제목과 수정 버튼 --- */}
            <DropdownMenuLabel className='flex flex-col'>
              <div className='flex items-center justify-between truncate text-label1-bold'>
                {title}
                <button
                  type='button'
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    onEdit(); // 제목 편집모드 전환
                    setOpen(false);
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
            {/* --- 저장 및 공유하기 --- 모달 */}
            <DropdownMenuItem onClick={handleOpenShareModal}>
              <Icon icon='tdesign:save' width='16' height='16' />
              저장 및 공유하기
            </DropdownMenuItem>

            {/* --- 삭제하기 --- */}
            <DropdownMenuItem onClick={handleDeleteCard} disabled={isDeleting}>
              <DeleteIcon />
              {isDeleting ? '삭제 중...' : '삭제하기'}
            </DropdownMenuItem>

            {/* --- 통계보기 --- */}
            <DropdownMenuItem asChild>
              <Link href={`${ROUTES.MYCARD}/${cardId}`}>
                <Icon icon='tdesign:leaderboard' width='18' height='18' />
                통계보기
              </Link>
            </DropdownMenuItem>

            {/* --- 편집하기 : 에디터 --- */}
            <DropdownMenuItem asChild>
              <Link href={`${ROUTES.EDITOR}?cardId=${cardId}`}>
                <Icon icon='tdesign:edit-2' width='18' height='18' />
                편집하기
              </Link>
            </DropdownMenuItem>

            {/* --- 공유화면 미리보기 --- */}
            <DropdownMenuItem asChild>
              <Link href={`/${slug}`}>
                <PreviewIcon />
                공유 화면 미리보기
              </Link>
            </DropdownMenuItem>
            {/* 여기까지가 메뉴 항목들 */}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* --- 모바일(md이하) : 트리거 버튼 항상 보이게, 바텀 시트 메뉴 --- */}
      <div className='md:hidden'>
        <button
          type='button'
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleOpenBottomSheet();
          }}
          aria-label='카드 메뉴 열기'
          aria-haspopup='true'
          // aria-expanded={open}
          className='absolute right-[10px] top-[10px] flex h-8 w-8 items-center justify-center truncate rounded-full border border-gray-5 bg-white md:hidden'
        >
          <Ellipsis />
        </button>
      </div>
    </div>
  );
};

export default CardEditDropdown;
