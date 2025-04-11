/* eslint-disable no-unused-vars */
import { create } from 'zustand';

/**
 * 텍스트 요소 인터페이스
 */
export interface TextElement {
  id: string;
  type: 'text';
  text: string;
  x: number;
  y: number;
  rotation: number;
  fontSize: number;
  fill: string;
  fontFamily: string;
  isBold?: boolean;
  isItalic?: boolean;
  isUnderline?: boolean;
  isStrike?: boolean;
  width: number;
}

/**
 * 에디터 전체 인터페이스
 */
export interface EditorState {
  histories: TextElement[];
  historyIdx: number;
  showElements: TextElement[];
  undo: () => void;
  redo: () => void;

  // 현재 선택 및 편집 중인 요소 ID
  selectedElementId: string | null;
  editingElementId: string | null;

  addText: (element: TextElement) => void;
  updateText: (id: string, updates: Partial<TextElement>) => void;
  removeText: (id: string) => void;

  setSelectedElementId: (id: string | null) => void;
  setEditingElementId: (id: string | null) => void;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  histories: [],
  historyIdx: -1,
  showElements: [],
  selectedElementId: null,
  editingElementId: null,

  addText: (element) => {
    const state = get();
    const newElements = [...state.showElements, element];

    // 현재 historyIdx까지의 기록을 유지하고 새로운 element 추가
    const updatedHistories = [
      ...state.histories.slice(0, state.historyIdx + 1),
      element,
    ];

    // 상태 업데이트
    set({
      histories: updatedHistories,
      showElements: newElements,
      historyIdx: updatedHistories.length - 1, // historyIdx를 최신 상태로 업데이트
    });
  },

  updateText: (id, updates) => {
    const state = get();
    const target = state.showElements.find((el) => el.id === id);
    const updatedElement = target ? { ...target, ...updates } : null;

    if (!updatedElement) return;

    const updatedShowElement = state.showElements.map((el) => {
      return el.id === id ? { ...el, ...updates } : el;
    });

    // const updateShowElements = state.showElements.map((el) => {
    //   return el.id === id ? { ...el, ...updates } : el;
    // });

    const updatedHistories = [
      ...state.histories.slice(0, state.historyIdx + 1),
      updatedElement,
    ];

    set({
      histories: updatedHistories,
      showElements: updatedShowElement,
      historyIdx: updatedHistories.length - 1,
    });
  },

  removeText: (id) =>
    set((state) => ({
      histories: state.histories.filter((el) => el.id !== id),
    })),

  setSelectedElementId: (id) => set({ selectedElementId: id }),
  setEditingElementId: (id) => set({ editingElementId: id }),

  undo: () => {
    const state = get();
    if (state.historyIdx > 0) {
      const prevIdx = state.historyIdx - 1;
      const prevState = state.histories[prevIdx];
      const updatedShowElements = state.showElements.map((el) =>
        el.id === prevState.id ? { ...el, ...prevState } : el
      );

      set({
        historyIdx: prevIdx,
        showElements: updatedShowElements,
      });
    }
  },
  redo: () => {
    const state = get();
    if (state.historyIdx < state.histories.length - 1) {
      const nextIdx = state.historyIdx + 1;
      const nextState = state.histories[nextIdx];
      const updatedShowElements = state.showElements.map((el) => {
        return el.id === nextState.id ? { ...el, ...nextState } : el;
      });

      set({
        historyIdx: nextIdx,
        showElements: updatedShowElements,
      });
    }
  },
}));
