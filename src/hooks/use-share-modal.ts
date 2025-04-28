import { create } from 'zustand';

interface ShareModalState {
  isOpen: boolean;
  shareData: {
    cardId: string;
    linkUrl: string;
    title: string;
    imageUrl: string;
    description: string;
  } | null;
  handleOpenShareModal: (data: {
    cardId: string;
    linkUrl: string;
    title: string;
    imageUrl: string;
    description: string;
  }) => void;
  handleCloseShareModal: () => void;
}

export const useShareModal = create<ShareModalState>((set) => ({
  isOpen: false,
  shareData: null,
  handleOpenShareModal: (data) => set({ isOpen: true, shareData: data }),
  handleCloseShareModal: () => set({ isOpen: false, shareData: null }),
}));
