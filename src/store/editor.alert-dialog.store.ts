import { create } from 'zustand';

interface AlertDialogState {
  isOpen: boolean;
  title: string;
  description: string;
  onConfirm?: () => void;
  open: (title: string, description: string, onConfirm?: () => void) => void;
  close: () => void;
}

export const useAlertDialogStore = create<AlertDialogState>((set) => ({
  isOpen: false,
  title: '',
  description: '',
  onConfirm: undefined,
  open: (title, description, onConfirm) =>
    set({ isOpen: true, title, description, onConfirm }),
  close: () =>
    set({ isOpen: false, title: '', description: '', onConfirm: undefined }),
}));
