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
  // 드롭다운 상태 관리
  const [open, setOpen] = useState(false);
  // 삭제 처리중 상태 관리
  const [isDeleting, setIsDeleting] = useState(false);
  // 현재 호스트(origin) 저장
  const [origin, setOrigin] = useState<string>('');
  // 사용자 닉네임 조회
  const nickName = authStore((state) => state.userName);
  // 저장 및 공유 모달 오픈
  const openShareModal = useSaveShareModalStore((state) => state.open);
  // 명함 삭제 뮤테이션훅
  const { mutate: deleteMutate } = useMyCardDelete({ slug, cardId, userId });

  // 최초 렌더시 origin 설정
  useEffect(() => {
    if (typeof window !== 'undefined') setOrigin(window.location.origin);
  }, []);

  const handleOpenShareModal = () => {
    if (slug) {
      openShareModal({
        cardId,
        linkUrl: `${origin}/${slug}?source=link`,
        title: `${nickName}의 명함`,
        imageUrl,
        description: 'Uuno에서 생성한 명함',
      });
    }
  };

  // 명함 삭제 핸들러
  const handleDeleteCard = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setOpen(false);
    const confirmed = customSweetAlert.confirmCardDelete(async () => {
      if (!confirmed) return;

      setIsDeleting(true);

      try {
        await deleteMutate();
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
          {/* TODO: 왜 명함마다 드롭다운 메뉴가 뜨는 위치가 다른지, 확인 필요 */}
          <DropdownMenuContent
            side='bottom'
            align='end'
            className='z-50 w-[206px]'
          >
            {/* 드롭다운 라벨 */}
            {/* --- 메뉴 제일 위: 명함 제목과 수정 버튼 --- */}
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
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* --- 모바일(md이하) : 트리거 버튼 항상 보이게, 바텀 시트 메뉴 --- */}
      <button
        type='button'
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        aria-label='카드 메뉴 열기'
        aria-haspopup='true'
        aria-expanded={open}
        className='absolute right-[10px] top-[10px] flex h-8 w-8 items-center justify-center rounded-full border border-gray-5 bg-white md:hidden'
      >
        <Ellipsis />
      </button>

      {/* 바텀 시트 컨테이너 */}
    </div>
  );
};

export default CardEditDropdown;
