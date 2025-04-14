import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface AuthState {
  login: boolean;
  setLogin: (status: boolean) => void;
  userId: string | null;
  setUserId: (_userId: string | undefined) => void;
}

export const authStore = create<AuthState>()(
  persist(
    immer((set) => ({
      login: false,
      setLogin: (status) => set({ login: status }),
      userId: null,
      setUserId: (userId) => set({ userId }),
    })),
    {
      name: 'auth-state',
    }
  )
);
