/* eslint-disable no-unused-vars */
import { getCanvasKeys } from '@/utils/editor/editor-getCanvasKeys.util';
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
    | 'qr'
    | 'html'; // 추후에 작업하실 때 추가해주세요
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
  icon: string;
  social: string;
  fullUrl: string;
  width: number;
  height: number;
}
export interface HtmlElement extends Omit<EditorElement, 'rotation'> {
  type: 'html';
  social: string;
}

export type CanvasElements =
  | TextElement
  | UploadElement
  | QrElement
  | SocialElement
  | HtmlElement
  | ImageElement; // | ShapElement 등등

/**
 * 에디터 전체 인터페이스
 */
export interface EditorState {
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
  backgroundImage: string | null;

  // 앞 뒤 상태
  isCanvasFront: boolean;

  //제목
  title: string;

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

  setCanvasFront: (status: boolean) => void;

  //배경
  setBackgroundColor: (color: string | null) => void;

  //제목
  setTitle: (title: string) => void;

  addMultipleElements: (element: CanvasElements[]) => void;
}

export const useEditorStore = create<EditorState>((set, get) => ({
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
  backgroundColor: null,
  backgroundImage: null,

  isCanvasFront: true,
  title: '',

  setTitle: (title) => set({ title }),
  setSelectedElementId: (id) => set({ selectedElementId: id }),
  setEditingElementId: (id) => set({ editingElementId: id }),
  setSelectedElementType: (type) => set({ selectedElementType: type }),
  setToolbar: (toolbar) => set({ toolbar }),
  setCanvasFront: (status) => set({ isCanvasFront: status }),
  setBackgroundColor: (color) => set({ backgroundColor: color }),

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
      histories: [[]],
      historyIdx: 0,
      selectedElementId: null,
      editingElementId: null,
      selectedElementType: null,
      title: '',
      backgroundColor: null,
    });
  },

  undo: () => {
    const state = get();
    const { elementsKey, historyIdxKey, currentHistories, currentHistoryIdx } =
      getCanvasKeys(state);

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
    const { elementsKey, historyIdxKey, currentHistories, currentHistoryIdx } =
      getCanvasKeys(state);
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

  addMultipleElements: (elements) => {
    const state = get();
    const {
      elementsKey,
      historiesKey,
      historyIdxKey,
      currentElements,
      currentHistories,
      currentHistoryIdx,
    } = getCanvasKeys(state);
    const newElements = [...currentElements, ...elements];
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
}));
