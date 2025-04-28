import { create } from 'zustand';

interface SaveShareModalState {
  isOpen: boolean;
  cardId: string;
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
  cardTitle?: string;

  open: (params: {
    cardId: string;
    title: string;
    description: string;
    imageUrl: string;
    linkUrl: string;
    cardTitle?: string;
  }) => void;
  close: () => void;
}

export const useSaveShareModalStore = create<SaveShareModalState>((set) => ({
  isOpen: false,
  cardId: '',
  title: '',
  description: '',
  imageUrl: '',
  linkUrl: '',
  cardTitle: '',

  open: (params) =>
    set({
      isOpen: true,
      cardId: params.cardId,
      title: params.title,
      description: params.description,
      imageUrl: params.imageUrl,
      linkUrl: params.linkUrl,
      cardTitle: params.cardTitle,
    }),

  close: () => set({ isOpen: false }),
}));
