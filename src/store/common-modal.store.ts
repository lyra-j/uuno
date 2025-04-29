import { create } from 'zustand';
import { ReactNode } from 'react';

interface CommonModalState {
  isOpen: boolean;
  title: string;
  description?: string;
  content: ReactNode | null;
  footer?: ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  ctnClassName?: string;
  onClose?: () => void;
  showCloseButton?: boolean;

  open: (params: {
    title: string;
    description?: string;
    content: ReactNode;
    footer?: ReactNode;
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
    ctnClassName?: string;
    onClose?: () => void;
    showCloseButton?: boolean;
  }) => void;
  close: () => void;
}

export const useCommonModalStore = create<CommonModalState>((set) => ({
  isOpen: false,
  title: '',
  description: undefined,
  content: null,
  footer: undefined,
  maxWidth: 'md',
  ctnClassName: '',
  onClose: undefined,
  showCloseButton: false,

  open: (params) =>
    set({
      isOpen: true,
      title: params.title,
      description: params.description,
      content: params.content,
      footer: params.footer,
      maxWidth: params.maxWidth,
      ctnClassName: params.ctnClassName,
      onClose: params.onClose,
      showCloseButton: params.showCloseButton ?? true,
    }),

  close: () =>
    set((state) => {
      if (state.onClose) state.onClose();
      return {
        isOpen: false,
        title: '',
        description: undefined,
        content: null,
        footer: undefined,
        maxWidth: 'md',
        ctnClassName: '',
        onClose: undefined,
        showCloseButton: false,
      };
    }),
}));
