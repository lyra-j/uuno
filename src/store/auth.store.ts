import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface AuthState {
  login: boolean;
  setLogin: (status: boolean) => void;
}

export const authStore = create<AuthState>()(
  persist(
    immer((set) => ({
      login: false,
      setLogin: (status) => set({ login: status }),
    })),
    {
      name: 'auth-state',
    }
  )
);
