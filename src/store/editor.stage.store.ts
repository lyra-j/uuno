import { create } from 'zustand';
import Konva from 'konva';

type StageRef = React.MutableRefObject<Konva.Stage | null>;

interface StageStore {
  stageRef: StageRef | null;
  setStageRef: (_ref: StageRef) => void;
}

export const useStageRefStore = create<StageStore>((set) => ({
  stageRef: null,
  setStageRef: (ref) => set({ stageRef: ref }),
}));
