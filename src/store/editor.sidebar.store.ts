import { create } from 'zustand';

interface SideBar {
  sidebarStatus: boolean;
  zoom: number;
  setSideBarStatus: (status: boolean) => void;
  setZoom: (zoom: number) => void;
}

export const sideBarStore = create<SideBar>()((set) => ({
  sidebarStatus: false,
  setSideBarStatus: (status) => set({ sidebarStatus: status }),

  zoom: 1.5,
  setZoom: (status) => set({ zoom: status }),
}));
