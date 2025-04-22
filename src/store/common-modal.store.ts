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

  open: (params: {
    title: string;
    description?: string;
    content: ReactNode;
    footer?: ReactNode;
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
    ctnClassName?: string;
    onClose?: () => void;
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
    }),

  close: () => set({ isOpen: false }),
}));
