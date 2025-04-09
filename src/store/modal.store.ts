import { create } from 'zustand';

type ModalState = 'login' | 'signup' | 'signup-email';

interface ModalStateType {
  modalState: ModalState;
  isOpen: boolean;
  setModalState: (state: ModalState) => void;
  setIsOpen: (state: boolean) => void;
}

export const modalStore = create<ModalStateType>((set) => ({
  modalState: 'signup',
  setModalState: (state) => set({ modalState: state }),
  isOpen: false,
  setIsOpen: (state) => set({ isOpen: state }),
}));
