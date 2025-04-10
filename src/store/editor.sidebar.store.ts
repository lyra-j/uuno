import { create } from 'zustand';

interface SideBar {
  sidebarStatus: boolean;
  setSideBarStatus: (status: boolean) => void;
}

export const sideBarStore = create<SideBar>()((set) => ({
  sidebarStatus: false,
  setSideBarStatus: (status) => set({ sidebarStatus: status }),
}));
