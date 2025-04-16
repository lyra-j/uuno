import { create } from 'zustand';

interface SideBar {
  sidebarStatus: boolean;
  zoom: number;
  isSocialEditing: boolean;
  setSideBarStatus: (status: boolean) => void;
  setZoom: (zoom: number) => void;
  setIsSocialEditing: (status: boolean) => void;
}

export const sideBarStore = create<SideBar>()((set) => ({
  sidebarStatus: false,
  setSideBarStatus: (status) => set({ sidebarStatus: status }),

  zoom: 2,
  setZoom: (status) => set({ zoom: status }),

  isSocialEditing: true,
  setIsSocialEditing: (status) => set({ isSocialEditing: status }),
}));
