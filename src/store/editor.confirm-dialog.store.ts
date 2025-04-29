import { create } from 'zustand';
import { ReactNode } from 'react';

interface ConfirmDialogState {
  isOpen: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  icon?: ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  open: (config: Omit<ConfirmDialogState, 'isOpen'>) => void;
  close: () => void;
}

export const useConfirmDialogStore = create<ConfirmDialogState>((set) => ({
  isOpen: false,
  title: '',
  open: (cfg) => set({ ...cfg, isOpen: true }),
  close: () => set({ isOpen: false }),
}));
