import { create } from 'zustand';

interface SideBar {
  sidebarStatus: boolean;
  zoom: number;
  setSideBarStatus: (status: boolean) => void;
  setZoom: (zoom: number) => void;

  isHorizontal: boolean;
  setIsHorizontal: (status: boolean) => void;
}

export const sideBarStore = create<SideBar>()((set) => ({
  sidebarStatus: false,
  setSideBarStatus: (status) => set({ sidebarStatus: status }),

  zoom: 2,
  setZoom: (status) => set({ zoom: status }),

  isHorizontal: true,
  setIsHorizontal: (status) => set({ isHorizontal: status }),
}));
