'use client';

import { UserMetadata } from '@supabase/supabase-js';
import { ROUTES } from '@/constants/path.constant';
import Link from 'next/link';
import React from 'react';
import HeaderAuthButton from '@/components/layouts/header-auth-button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CommonButton } from '@/components/common/common-button';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import { modalStore } from '@/store/modal.store';

interface Props {
  // Supabase Auth의 User 타입
  user: UserMetadata | null;
}

const NavBar = ({ user }: Props) => {
  const setIsOpen = modalStore((state) => state.setIsOpen);
  const setModalState = modalStore((state) => state.setModalState);
  const router = useRouter();
  const userNickName =
    user?.user_metadata.nick_name || user?.user_metadata.full_name;

  const menuLinkStyle =
    'inline-block px-5 py-2 text-label2-medium transition-colors hover:text-primary-40';

  // 내 명함 메뉴 클릭 핸들러
  const handleMyCardsClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      setModalState('login');
      setIsOpen(true);
    } else {
      router.push(ROUTES.DASHBOARD.BASE);
    }
  };

  return (
    <nav className='mx-auto flex h-16 w-full max-w-5xl items-center justify-between'>
      {/* 좌측: 로고 & 메뉴 */}
      <div className='flex items-center gap-4'>
        <Link href={ROUTES.HOME}>
          <h2 className='mr-[10px] text-lg font-bold'>Uuno</h2>
        </Link>
        <Link href={ROUTES.TEMPLATES.BASE} className={menuLinkStyle}>
          템플릿
        </Link>
        <Link href={ROUTES.EDITOR} className={menuLinkStyle}>
          만들기
        </Link>

        <button
          onClick={handleMyCardsClick}
          role='link'
          className={menuLinkStyle}
        >
          내 명함
        </button>
      </div>

      {/* 우측: 로그인, 내 명함 만들기 버튼 */}

      {!user ? (
        // 비로그인 : 로그인 + 내 명함 만들기
        <div className='flex gap-3'>
          <HeaderAuthButton type='login' />
          <CommonButton asChild className='text-label2-medium'>
            <Link href={ROUTES.EDITOR}>내 명함 만들기</Link>
          </CommonButton>
        </div>
      ) : (
        // 로그인상태 : 닉네임 + 드롭다운 메뉴
        <DropdownMenu>
          {/* 닉네임 + 아래쪽 화살표 */}
          <DropdownMenuTrigger asChild>
            <button className='flex items-center px-[14px] py-[6px] text-label1-bold focus:outline-none'>
              {userNickName}{' '}
              <Icon icon='tdesign:caret-down-small' width='16' height='16' />
            </button>
          </DropdownMenuTrigger>

          {/* 드롭다운 박스 */}
          <DropdownMenuContent
            side='bottom'
            align='end'
            className='w-[208px] -translate-x-2'
          >
            {/* 사용자 정보 */}
            <DropdownMenuLabel>
              <div className='text-label2-bold text-black'>{userNickName}</div>
              <div className='mt-1 text-extra-medium text-gray-70'>
                {user.email}
              </div>
            </DropdownMenuLabel>

            {/* 구분선 */}
            <DropdownMenuSeparator />

            {/* 메뉴 항목 */}
            <DropdownMenuItem asChild>
              <Link
                href={ROUTES.DASHBOARD.MYCARDS}
                className='text-extra-medium text-black'
              >
                {' '}
                <Icon
                  icon='tdesign:assignment-user'
                  width='18'
                  height='18'
                  className='text-black'
                />
                내 명함
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href={ROUTES.DASHBOARD.ACCOUNT}
                className='text-extra-medium text-black'
              >
                <Icon
                  icon='tdesign:setting-1'
                  width='18'
                  height='18'
                  className='text-black'
                />
                계정 설정
              </Link>
            </DropdownMenuItem>

            {/* 구분선 */}
            <DropdownMenuSeparator />

            {/* 로그아웃 */}
            <DropdownMenuItem className='flex items-center'>
              <Icon
                icon='tdesign:poweroff'
                width='18'
                height='18'
                className='text-black'
              />
              <HeaderAuthButton type='logout' />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </nav>
  );
};

export default NavBar;
