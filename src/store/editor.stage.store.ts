import { create } from 'zustand';
import Konva from 'konva';

// interface StageStore {
//   frontStageRef: React.RefObject<Konva.Stage> | null;
//   backStageRef: React.RefObject<Konva.Stage> | null;
//   setFrontStageRef: (_ref: React.RefObject<Konva.Stage>) => void;
//   setBackStageRef: (_ref: React.RefObject<Konva.Stage>) => void;
// }

type StageRef = React.MutableRefObject<Konva.Stage | null>;

interface StageStore {
  stageRef: StageRef | null;
  setStageRef: (_ref: StageRef) => void;
}

export const useStageRefStore = create<StageStore>((set) => ({
  stageRef: null,
  setStageRef: (ref) => set({ stageRef: ref }),
}));

// export const useStageRefStore = create<StageStore>((set) => ({
//   frontStageRef: null,
//   backStageRef: null,
//   setFrontStageRef: (ref) => set({ frontStageRef: ref }),
//   setBackStageRef: (ref) => set({ backStageRef: ref }),
// }));
