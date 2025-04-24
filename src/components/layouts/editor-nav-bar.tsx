'use client';

import { User, UserMetadata } from '@supabase/supabase-js';
import { ROUTES } from '@/constants/path.constant';
import { modalStore } from '@/store/modal.store';
import Image from 'next/image';
import { SaveIcon } from 'lucide-react';
import { useEditorStore } from '@/store/editor.store';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { useSluggedSaveCard } from '@/hooks/use-slugged-save-card';
import { resetEditorState } from '@/utils/editor/editor-reset-state';
import { sideBarStore } from '@/store/editor.sidebar.store';
import { useShallow } from 'zustand/react/shallow';

interface EditorNavBarProps {
  user: User | null;
}

const EditorNavBar = ({ user }: EditorNavBarProps) => {
  const setIsOpen = modalStore((state) => state.setIsOpen);
  const setModalState = modalStore((state) => state.setModalState);
  const setSideBarStatus = sideBarStore((state) => state.setSideBarStatus);

  const {
    canvasElements,
    canvasBackElements,
    backgroundColor,
    backgroundColorBack,
    reset,
  } = useEditorStore(
    useShallow((state) => ({
      canvasElements: state.canvasElements,
      canvasBackElements: state.canvasBackElements,
      backgroundColor: state.backgroundColor,
      backgroundColorBack: state.backgroundColorBack,
      reset: state.reset,
    }))
  );

  const route = useRouter();
  const { handleSave, isPending } = useSluggedSaveCard();
  const menuLinkStyle =
    'inline-block p-5 text-label1-medium transition-colors hover:text-primary-40';

  const navigateTo = (link: string) => {
    resetEditorState();
    setSideBarStatus(false);
    // 내 명함 페이지는 로그인 필요
    if (link === ROUTES.DASHBOARD.BASE && !user) {
      showLoginModal();
      return;
    }
    route.push(link);
  };

  const showLoginModal = () => {
    setModalState('login');
    setIsOpen(true);
  };

  const handleSaveButtonClick = () => {
    // 로그인 상태 확인
    if (!user) {
      showLoginModal();
      return;
    }
    handleSave(user);
  };

  const discardChangesAndNavigate = (link: string) => {
    resetEditorState();
    navigateTo(link);
  };

  const saveConfirmAlert = (link: string) => {
    Swal.fire({
      title: '작업물을 저장해주세요.',
      text: '변경하면 현재 작업하신 내용은 삭제가 됩니다. 진행하시겠습니까?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: '저장하겠습니다',
      denyButtonColor: 'red',
      denyButtonText: '저장하지 않고 나가기',
    }).then((result) => {
      if (result.isConfirmed) {
        if (!user) {
          showLoginModal();
        } else {
          handleSave(user);
        }
      } else if (result.isDenied) {
        discardChangesAndNavigate(link);
      }
    });
  };

  const isCurrentElement =
    canvasElements.length === 0 &&
    canvasBackElements.length === 0 &&
    !backgroundColor &&
    !backgroundColorBack;

  const handleOnClick = (link: string) => {
    // 저장할 내용이 없으면 바로 이동
    if (isCurrentElement) {
      navigateTo(link);
      return;
    }
    saveConfirmAlert(link);
  };

  return (
    <nav className='mx-auto flex h-16 w-full items-center justify-between'>
      {/* 좌측: 로고 & 메뉴 */}
      <div className='flex items-center gap-4'>
        <div className='inline-flex flex-col items-start px-10 py-5'>
          <button onClick={() => handleOnClick(ROUTES.HOME)}>
            <Image
              src={'/icons/logo_blue.svg'}
              width={60}
              height={24}
              alt='로고 이미지'
            />
          </button>
        </div>
        <div className='inline-flex items-center'>
          <button
            className={menuLinkStyle}
            onClick={() => handleOnClick(ROUTES.TEMPLATES.BASE)}
          >
            템플릿
          </button>
          <button
            className={menuLinkStyle}
            onClick={() => handleOnClick(ROUTES.EDITOR)}
          >
            만들기
          </button>
          <button
            onClick={() => handleOnClick(ROUTES.DASHBOARD.BASE)}
            className={menuLinkStyle}
          >
            내 명함
          </button>
        </div>
      </div>
      <div className='inline-flex flex-col items-start gap-[10px] px-10 py-4'>
        <button
          className='flex h-8 items-center justify-center gap-[6px] self-stretch rounded-[6px] bg-primary-40 px-3 py-[6px] text-white'
          onClick={handleSaveButtonClick}
          disabled={isPending}
        >
          <SaveIcon />
          <p className='text-label2-semi'>저장하기</p>
        </button>
      </div>
    </nav>
  );
};

export default EditorNavBar;
