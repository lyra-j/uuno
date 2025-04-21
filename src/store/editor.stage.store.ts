import { create } from 'zustand';
import Konva from 'konva';

interface StageStore {
  frontStageRef: React.RefObject<Konva.Stage> | null;
  backStageRef: React.RefObject<Konva.Stage> | null;
  setFrontStageRef: (_ref: React.RefObject<Konva.Stage>) => void;
  setBackStageRef: (_ref: React.RefObject<Konva.Stage>) => void;
}

export const useStageRefStore = create<StageStore>((set) => ({
  frontStageRef: null,
  backStageRef: null,
  setFrontStageRef: (ref) => set({ frontStageRef: ref }),
  setBackStageRef: (ref) => set({ backStageRef: ref }),
}));
