/* eslint-disable no-unused-vars */
import { create } from 'zustand';

export interface EditorElement {
  id: string;
  type:
    | 'text'
    | 'image'
    | 'element'
    | 'upload'
    | 'background'
    | 'social'
    | 'qr'; // 추후에 작업하실 때 추가해주세요
  x: number;
  y: number;
  rotation: number;
}

// 텍스트 요소 인터페이스
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

// 업로드(이미지) 요소 인터페이스
export interface UploadElement extends EditorElement {
  type: 'upload';
  previewUrl: string;
  width: number;
  height: number;
}

export interface ImageElement extends EditorElement {
  type: 'image';
  previewUrl: string;
  width: number;
  height: number;
  authorName: string;
  imageLink: string;
}

// qr 요소 인터페이스
export interface QrElement extends EditorElement {
  type: 'qr';
  url: string;
  previewUrl: string;
  width: number;
  height: number;
}
// social 요소 인터페이스
export interface SocialElement extends EditorElement {
  type: 'social';
  url: string;
  previewUrl: string;
  width: number;
  height: number;
}

export type CanvasElements =
  | TextElement
  | UploadElement
  | QrElement
  | SocialElement
  | ImageElement; // | ShapElement 등등

/**
 * 에디터 전체 인터페이스
 */
export interface EditorState {
  canvasElements: CanvasElements[];
  histories: CanvasElements[][];
  historyIdx: number;

  // 선택 요소 ID && Type
  selectedElementId: string | null;
  editingElementId: string | null;
  selectedElementType: string | null;

  //툴바
  toolbar: { x: number; y: number } | null;

  //배경
  backgroundColor: string | null;
  backgroundImage: string | null;

  addElement: (element: CanvasElements) => void;
  updateElement: (id: string, updates: Partial<CanvasElements>) => void;
  removeElement: (id: string) => void;

  setToolbar: (toolbar: { x: number; y: number } | null) => void;
  setSelectedElementId: (id: string | null) => void;
  setEditingElementId: (id: string | null) => void;
  setSelectedElementType: (type: string | null) => void;

  reset: () => void;
  undo: () => void;
  redo: () => void;

  //배경
  setBackgroundColor: (color: string | null) => void;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  canvasElements: [],
  histories: [[]],
  historyIdx: 0,
  selectedElementId: null,
  editingElementId: null,
  selectedElementType: null,
  toolbar: null,
  backgroundColor: null,
  backgroundImage: null,

  addElement: (element) => {
    const state = get();
    const newElements = [...state.canvasElements, element];
    const newHistories = [
      ...state.histories.slice(0, state.historyIdx + 1),
      newElements,
    ];

    set({
      canvasElements: newElements,
      histories: newHistories,
      historyIdx: newHistories.length - 1,
    });
  },

  updateElement: (id: string, updates: Partial<CanvasElements>) => {
    const state = get();
    const updateElement = state.canvasElements.map((el) =>
      el.id === id ? ({ ...el, ...updates } as CanvasElements) : el
    );

    const newHistories = [
      ...state.histories.slice(0, state.historyIdx + 1),
      updateElement,
    ];

    set({
      canvasElements: updateElement,
      histories: newHistories,
      historyIdx: newHistories.length - 1,
    });
  },

  removeElement: (id) => {
    const state = get();
    const removeElement = state.canvasElements.filter((el) => el.id !== id);
    const newHistories = [
      ...state.histories.slice(0, state.historyIdx + 1),
      removeElement,
    ];
    set({
      canvasElements: removeElement,
      histories: newHistories,
      historyIdx: newHistories.length - 1,
    });
  },

  setSelectedElementId: (id) => set({ selectedElementId: id }),
  setEditingElementId: (id) => set({ editingElementId: id }),
  setSelectedElementType: (type) => set({ selectedElementType: type }),

  setToolbar: (toolbar) => set({ toolbar }),

  reset: () => {
    set({
      canvasElements: [],
      histories: [[]],
      historyIdx: 0,
      selectedElementId: null,
      editingElementId: null,
      selectedElementType: null,
    });
  },

  undo: () => {
    const state = get();
    if (state.historyIdx > 0) {
      const undoHistoryIdx = state.historyIdx - 1;
      const undoElement = state.histories[undoHistoryIdx];
      set({
        canvasElements: undoElement,
        historyIdx: undoHistoryIdx,
        selectedElementId: null,
        editingElementId: null,
        selectedElementType: null,
      });
    }
  },

  redo: () => {
    const state = get();
    if (state.historyIdx < state.histories.length - 1) {
      const redoHistoryIdx = state.historyIdx + 1;
      const redoElement = state.histories[redoHistoryIdx];
      set({
        canvasElements: redoElement,
        historyIdx: redoHistoryIdx,
        selectedElementId: null,
        editingElementId: null,
        selectedElementType: null,
      });
    }
  },

  setBackgroundColor: (color) => set({ backgroundColor: color }),
}));
