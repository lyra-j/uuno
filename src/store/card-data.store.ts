import { create } from 'zustand';

interface CardDataState {
  hasData: boolean;
  setHasData: (_value: boolean) => void;
}

export const useCardDataStore = create<CardDataState>((set) => ({
  hasData: false,
  setHasData: (value) => set({ hasData: value }),
}));
