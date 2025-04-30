'use client';

import { UserMetadata } from '@supabase/supabase-js';
import { ROUTES } from '@/constants/path.constant';
import Link from 'next/link';
import React, { useEffect } from 'react';
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
import Image from 'next/image';
import { useSheetStore } from '@/store/sheet.store';
import { toastWarning } from '@/lib/toast-util';

interface Props {
  // Supabase Auth의 User 타입
  user: UserMetadata | null;
}

const NavBar = ({ user }: Props) => {
  const setIsOpen = modalStore((state) => state.setIsOpen);
  const setModalState = modalStore((state) => state.setModalState);
  const router = useRouter();
  const openSheet = useSheetStore((state) => state.open);
  const isSheetOpen = useSheetStore((s) => s.isOpen);
  const closeSheet = useSheetStore((state) => state.close);
  const userNickName =
    user?.user_metadata.nick_name || user?.user_metadata.full_name;

  const menuLinkStyle =
    'inline-block px-3 py-[6px] text-label1-medium transition-colors hover:text-primary-40';

  // 내 명함 메뉴 클릭 핸들러
  const handleMyCardsClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      setModalState('login');
      setIsOpen(true);
      closeSheet();
    } else {
      router.push(ROUTES.DASHBOARD.BASE);
      closeSheet();
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 525 && isSheetOpen) {
        closeSheet();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isSheetOpen, closeSheet]);

  const mobileMenu = (
    <div className='flex h-full w-full flex-col items-start px-[22px] pt-[30px]'>
      {/* 유저 정보 */}
      {user ? (
        <div className='flex flex-col items-start'>
          <div className='text-label1-semi text-black'>{userNickName}</div>
          <div className='mt-[6px] text-label1-medium text-gray-70'>
            {user?.email}
          </div>
        </div>
      ) : (
        <Image
          src='/main-logo-black.png'
          alt='로고 이미지'
          width={66}
          height={26}
        />
      )}

      {/* 메뉴 리스트  */}
      <nav className='flex w-full flex-col space-y-[8px]'>
        {/*  첫 번째 구분선  */}
        <div className='mt-[20px] h-px w-full bg-gray-5' />
        <Link
          href={ROUTES.TEMPLATES.BASE}
          onClick={closeSheet}
          className='flex items-center gap-2 py-3 text-label2-medium text-black'
        >
          <Icon icon='tdesign:layout' width='20' height='20' />
          템플릿
        </Link>
        <div
          onClick={() => {
            toastWarning('PC 버전만 지원합니다');
          }}
          role='button'
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              toastWarning('PC 버전만 지원합니다');
            }
          }}
          className='flex items-center gap-2 py-3 text-label2-medium text-black'
        >
          <Icon icon='tdesign:edit-1' width='20' height='20' />
          만들기
        </div>
        <Link
          href={ROUTES.DASHBOARD.MYCARDS}
          onClick={(e) => {
            handleMyCardsClick(e);
          }}
          className='flex items-center gap-2 py-3 text-label2-medium text-black'
        >
          <Icon icon='tdesign:assignment-user' width='20' height='20' />내 명함
        </Link>

        {user && (
          <>
            <Link
              href={ROUTES.DASHBOARD.ACCOUNT}
              onClick={closeSheet}
              className='flex items-center gap-2 py-3 text-label2-medium text-black'
            >
              <Icon icon='tdesign:setting-1' width='20' height='20' />
              계정 설정
            </Link>

            <button
              className='flex items-center gap-2 py-3 text-label2-medium text-black'
              onClick={closeSheet}
            >
              <Icon icon='tdesign:poweroff' width='20' height='20' />
              <HeaderAuthButton type='logout' />
            </button>
          </>
        )}
      </nav>
    </div>
  );

  return (
    <nav className='mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4 min-[1024px]:px-0'>
      {/* 모바일 햄버거 */}
      <Icon
        icon='tdesign:view-list'
        width='24'
        height='24'
        aria-label='메뉴 열기'
        className='cursor-pointer md:hidden'
        onClick={() =>
          openSheet({
            content: mobileMenu,
            side: 'left',
          })
        }
      />

      {/* 로고  */}
      <div className='flex items-center'>
        <Link href={ROUTES.HOME} className='md:mr-16'>
          <Image
            src={'/icons/logo_white.svg'}
            width={60}
            height={23}
            alt='로고 이미지'
          />
        </Link>
        {/* 450px이상 pc버전 메뉴  */}
        <div className='hidden w-full flex-1 items-center justify-center space-x-8 md:flex'>
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
      </div>

      {/* 모바일 로그인 */}
      {!user ? (
        <button
          className='flex items-center justify-center rounded-[6px] bg-primary-40 px-3 py-[6px] text-label2-medium md:hidden'
          onClick={() => setIsOpen(true)}
        >
          로그인
        </button>
      ) : (
        // 139번째 줄 justify-between으로 뒀기 때문에 자리를 잡아야 합니다
        <div />
      )}

      {/* 우측: 로그인, 내 명함 만들기 버튼 */}
      <div className='hidden items-center gap-3 md:flex'>
        {!user ? (
          // 비로그인 : 로그인 + 내 명함 만들기
          <>
            <HeaderAuthButton type='login' />
            <CommonButton asChild className='text-label2-medium'>
              <Link href={ROUTES.EDITOR}>내 명함 만들기</Link>
            </CommonButton>
          </>
        ) : (
          <div className='hidden items-center gap-3 md:flex'>
            <DropdownMenu>
              {/* 닉네임 + 아래쪽 화살표 */}
              <DropdownMenuTrigger asChild>
                <button className='flex items-center px-[14px] py-[6px] text-label1-bold focus:outline-none'>
                  {userNickName}{' '}
                  <Icon
                    icon='tdesign:caret-down-small'
                    width='16'
                    height='16'
                  />
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
                  <div className='text-label2-bold text-black'>
                    {userNickName}
                  </div>
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
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
