/* eslint-disable no-unused-vars */
import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

export interface EditorElement {
  id: string;
  type: 'text' | 'image' | 'shape'; // 추후에 작업하실 때 추가해주세요
  x: number;
  y: number;
  rotation: number;
}

/**
 * 텍스트 요소 인터페이스
 */
export interface TextElement extends EditorElement {
  type: 'text';
  text: string;
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

  selectedElementId: string | null;
  editingElementId: string | null;
  selectedElementType: string | null;

  toolbar: { x: number; y: number } | null;

  addText: (element: TextElement) => void;
  updateText: (id: string, updates: Partial<TextElement>) => void;
  removeText: (id: string) => void;

  setToolbar: (toolbar: { x: number; y: number } | null) => void;
  setSelectedElementId: (id: string | null) => void;
  setEditingElementId: (id: string | null) => void;
  setSelectedElementType: (type: string | null) => void;
}

// 세션 스토리지에 저장하기 위함.
const persistOptions: PersistOptions<
  EditorState,
  Pick<EditorState, 'showElements'>
> = {
  name: 'editor-storage',
  storage: {
    getItem: (name) => {
      const item = sessionStorage.getItem(name);
      return item ? JSON.parse(item) : null;
    },
    setItem: (name, value) => {
      sessionStorage.setItem(name, JSON.stringify(value));
    },
    removeItem: (name) => {
      sessionStorage.removeItem(name);
    },
  },
  partialize: (state) => ({
    showElements: state.showElements,
  }),
};

export const useEditorStore = create<EditorState>()(
  persist(
    (set, get) => ({
      histories: [],
      historyIdx: -1,
      showElements: [],
      selectedElementId: null,
      editingElementId: null,
      selectedElementType: null,
      toolbar: null,

      addText: (element) => {
        const state = get();
        const newElements = [...state.showElements, element];

        // undo 한 그 자리에서 요소가 추가 되었을 때 그 자리 배열까지 남기고 나머지 삭제
        const updatedHistories = [
          ...state.histories.slice(0, state.historyIdx + 1),
          element,
        ];

        set({
          histories: updatedHistories,
          showElements: newElements,
          historyIdx: updatedHistories.length - 1,
        });
      },

      updateText: (id, updates) => {
        const state = get();
        const target = state.showElements.find((el) => el.id === id);
        const updatedElement = target ? { ...target, ...updates } : null;

        if (!updatedElement) return;

        const updatedShowElement = state.showElements.map((el) =>
          el.id === id ? { ...el, ...updates } : el
        );

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
      setToolbar: (toolbar) => set({ toolbar }),
      setSelectedElementType: (type) => set({ selectedElementType: type }),

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
          const updatedShowElements = state.showElements.map((el) =>
            el.id === nextState.id ? { ...el, ...nextState } : el
          );

          set({
            historyIdx: nextIdx,
            showElements: updatedShowElements,
          });
        }
      },
    }),

    persistOptions
  )
);
