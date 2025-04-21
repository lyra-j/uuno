import { CanvasElements } from '@/types/editor.type';
import { Templates } from '@/types/supabase.type';
import { getCanvasKeys } from '@/utils/editor/editor-getCanvasKeys.util';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

/**
 * 에디터 전체 인터페이스
 */
export interface EditorState {
  template: Templates | null;

  canvasElements: CanvasElements[];
  histories: CanvasElements[][];
  historyIdx: number;

  canvasBackElements: CanvasElements[];
  backHistories: CanvasElements[][];
  backHistoryIdx: number;

  // 선택 요소 ID && Type
  selectedElementId: string | null;
  editingElementId: string | null;
  selectedElementType: string | null;

  //툴바
  toolbar: { x: number; y: number } | null;

  //배경
  backgroundColor: string | null;
  backgroundColorBack: string | null;
  backgroundImage: string | null;

  // 앞 뒤 상태
  isCanvasFront: boolean;

  //제목
  title: string;

  //주소
  slug: string | null;

  setCanvasElements: (_elements: CanvasElements[]) => void;
  setCanvasBackElements: (_elements: CanvasElements[]) => void;

  addElement: (_element: CanvasElements) => void;
  updateElement: (_id: string, _updates: Partial<CanvasElements>) => void;
  removeElement: (_id: string) => void;

  setToolbar: (_toolbar: { x: number; y: number } | null) => void;
  setSelectedElementId: (_id: string | null) => void;
  setEditingElementId: (_id: string | null) => void;
  setSelectedElementType: (_type: string | null) => void;

  reset: () => void;
  undo: () => void;
  redo: () => void;

  setCanvasFront: (_status: boolean) => void;

  //배경
  setBackgroundColor: (_color: string | null) => void;
  setBackgroundColorBack: (_color: string | null) => void;

  //제목
  setTitle: (_title: string) => void;

  //주소
  setSlug: (_slug: string) => void;

  setTemplate: (_element: Templates) => void;
}

export const useEditorStore = create<EditorState>()(
  persist(
    (set, get) => ({
      template: null,

      canvasElements: [],
      histories: [[]],
      historyIdx: 0,

      canvasBackElements: [],
      backHistories: [[]],
      backHistoryIdx: 0,

      selectedElementId: null,
      editingElementId: null,
      selectedElementType: null,
      toolbar: null,

      //배경
      backgroundColor: null,
      backgroundColorBack: null,
      backgroundImage: null,

      isCanvasFront: true,

      title: '',

      slug: null,

      setTitle: (title) => set({ title }),
      setSelectedElementId: (id) => set({ selectedElementId: id }),
      setEditingElementId: (id) => set({ editingElementId: id }),
      setSelectedElementType: (type) => set({ selectedElementType: type }),
      setToolbar: (toolbar) => set({ toolbar }),
      setCanvasFront: (status) => set({ isCanvasFront: status }),

      //배경
      setBackgroundColor: (color) => set({ backgroundColor: color }),
      setBackgroundColorBack: (color) => set({ backgroundColorBack: color }),
      setSlug: (slug) => set({ slug }),

      addElement: (element) => {
        const state = get();
        const {
          elementsKey,
          historiesKey,
          historyIdxKey,
          currentElements,
          currentHistories,
          currentHistoryIdx,
        } = getCanvasKeys(state);

        const newElements = [...currentElements, element];
        const newHistories = [
          ...currentHistories.slice(0, currentHistoryIdx + 1),
          newElements,
        ];

        set({
          [elementsKey]: newElements,
          [historiesKey]: newHistories,
          [historyIdxKey]: newHistories.length - 1,
        });
      },

      updateElement: (id: string, updates: Partial<CanvasElements>) => {
        const state = get();
        const {
          elementsKey,
          historiesKey,
          historyIdxKey,
          currentElements,
          currentHistories,
          currentHistoryIdx,
        } = getCanvasKeys(state);

        const updateElement = currentElements.map((el) =>
          el.id === id ? ({ ...el, ...updates } as CanvasElements) : el
        );

        const newHistories = [
          ...currentHistories.slice(0, currentHistoryIdx + 1),
          updateElement,
        ];

        set({
          [elementsKey]: updateElement,
          [historiesKey]: newHistories,
          [historyIdxKey]: newHistories.length - 1,
        });
      },

      removeElement: (id) => {
        const state = get();
        const {
          elementsKey,
          historiesKey,
          historyIdxKey,
          currentElements,
          currentHistories,
          currentHistoryIdx,
        } = getCanvasKeys(state);

        const removeElement = currentElements.filter((el) => el.id !== id);
        const newHistories = [
          ...currentHistories.slice(0, currentHistoryIdx + 1),
          removeElement,
        ];

        set({
          [elementsKey]: removeElement,
          [historiesKey]: newHistories,
          [historyIdxKey]: newHistories.length - 1,
        });
      },

      reset: () => {
        set({
          canvasElements: [],
          canvasBackElements: [],
          histories: [[]],
          historyIdx: 0,
          backHistories: [[]],
          backHistoryIdx: 0,
          selectedElementId: null,
          editingElementId: null,
          selectedElementType: null,
          title: '',
          backgroundColor: null,
          backgroundColorBack: null,
        });
      },

      undo: () => {
        const state = get();
        const {
          elementsKey,
          historyIdxKey,
          currentHistories,
          currentHistoryIdx,
        } = getCanvasKeys(state);

        if (currentHistoryIdx > 0) {
          const undoHistoryIdx = currentHistoryIdx - 1;
          const undoElement = currentHistories[undoHistoryIdx];
          set({
            [elementsKey]: undoElement,
            [historyIdxKey]: undoHistoryIdx,
            selectedElementId: null,
            editingElementId: null,
            selectedElementType: null,
          });
        }
      },

      redo: () => {
        const state = get();
        const {
          elementsKey,
          historyIdxKey,
          currentHistories,
          currentHistoryIdx,
        } = getCanvasKeys(state);
        if (currentHistoryIdx < currentHistories.length - 1) {
          const redoHistoryIdx = currentHistoryIdx + 1;
          const redoElement = currentHistories[redoHistoryIdx];
          set({
            [elementsKey]: redoElement,
            [historyIdxKey]: redoHistoryIdx,
            selectedElementId: null,
            editingElementId: null,
            selectedElementType: null,
          });
        }
      },

      setCanvasElements: (elements) => {
        const newHistories = [[...elements]];
        set({
          canvasElements: elements,
          histories: newHistories,
          historyIdx: 0,
        });
      },

      setCanvasBackElements: (elements) => {
        const newHistories = [[...elements]];
        set({
          canvasBackElements: elements,
          backHistories: newHistories,
          backHistoryIdx: 0,
        });
      },

      setTemplate: (element) => {
        set({ template: element });
      },
    }),
    {
      name: 'editor-storage',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        canvasElements: state.canvasElements,
        canvasBackElements: state.canvasBackElements,
        backgroundColor: state.backgroundColor,
        backgroundColorBack: state.backgroundColorBack,
        title: state.title,
      }),
    }
  )
);
