'use client';

import { User } from '@supabase/supabase-js';
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
  } = useEditorStore(
    useShallow((state) => ({
      canvasElements: state.canvasElements,
      canvasBackElements: state.canvasBackElements,
      backgroundColor: state.backgroundColor,
      backgroundColorBack: state.backgroundColorBack,
    }))
  );

  const route = useRouter();
  const { handleSave, isPending } = useSluggedSaveCard();
  const menuLinkStyle =
    'inline-block p-5 text-label1-medium transition-colors hover:text-primary-40';

  const navigateTo = (link: string) => {
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
    setSideBarStatus(false);
    navigateTo(link);
  };

  const saveConfirmAlert = (link: string) => {
    Swal.fire({
      html: `
          <div class="flex flex-col items-center gap-2">
            <div class="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
              <span class="text-white text-base ">!</span>
            </div>
            <h2 class="mt-3 text-heading-bold text-black">
              저장하고 종료하시겠습니까?
            </h2>
            <p class="mt-1 text-label2-medium text-gray-70 text-center">
              저장하지 않고 페이지를 벗어날 경우, 지금까지 작성된 내용이 사라집니다.
            </p>
            <div class="mt-6 flex gap-2 w-full">
              <button
                id="swal-cancel-btn"
                class="flex-1 py-2 rounded-md border border-gray-10 bg-white text-label2-medium"
              >
                종료
              </button>
              <button
                id="swal-save-btn"
                class="flex-1 py-2 rounded-md bg-primary-40 text-white text-label2-medium"
              >
                저장하고 종료
              </button>
            </div>
          </div>
        `,
      showConfirmButton: false,
      showCancelButton: false,
      showCloseButton: true,
      customClass: {
        popup: 'rounded-xl shadow-lg bg-white w-[500px] max-w-none p-5',
        closeButton: 'absolute top-1 right-1 text-gray-70',
      },

      didOpen: () => {
        const saveBtn = document.getElementById('swal-save-btn')!;
        const cancelBtn = document.getElementById('swal-cancel-btn')!;

        saveBtn.addEventListener('click', () => {
          Swal.close();
          if (!user) showLoginModal();
          else handleSave(user);
        });

        cancelBtn.addEventListener('click', () => {
          Swal.close();
          discardChangesAndNavigate(link);
        });
      },
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
