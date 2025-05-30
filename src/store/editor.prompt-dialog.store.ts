import { create } from 'zustand';

interface PromptDialogState {
  isOpen: boolean;
  title: string;
  description: string;
  placeholder: string;
  resolve: (value: string | null) => void;
  open: (
    title: string,
    description: string,
    placeholder: string,
    resolve: (value: string | null) => void
  ) => void;
  close: () => void;
}

export const usePromptDialogStore = create<PromptDialogState>((set) => ({
  isOpen: false,
  title: '',
  description: '',
  placeholder: '',
  resolve: () => {},
  open: (title, description, placeholder, resolve) =>
    set({ isOpen: true, title, description, placeholder, resolve }),
  close: () =>
    set((state) => {
      try {
        state.resolve(null);
      } catch (error) {
        console.error('Error resolving prompt dialog:', error);
      }
      return {
        isOpen: false,
        title: '',
        description: '',
        placeholder: '',
        resolve: () => {},
      };
    }),
}));
