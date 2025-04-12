/* eslint-disable no-unused-vars */
import { create } from 'zustand';

export type CanvasElements = TextElement; //추후 | ImageElement | ShapElement 등등

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
  canvasElements: CanvasElements[];

  // 현재 선택 및 편집 중인 요소 ID
  selectedElementId: string | null;
  editingElementId: string | null;

  toolbar: { x: number; y: number } | null;

  addElement: (element: TextElement) => void;
  updateElement: (id: string, updates: Partial<TextElement>) => void;
  removeElement: (id: string) => void;

  setToolbar: (toolbar: { x: number; y: number } | null) => void;
  setSelectedElementId: (id: string | null) => void;
  setEditingElementId: (id: string | null) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  canvasElements: [],
  selectedElementId: null,
  editingElementId: null,
  toolbar: null,

  addElement: (element) =>
    set((state) => ({
      canvasElements: [...state.canvasElements, element],
    })),

  updateElement: (id, updates) =>
    set((state) => ({
      canvasElements: state.canvasElements.map((el) =>
        el.id === id ? { ...el, ...updates } : el
      ),
    })),

  removeElement: (id) =>
    set((state) => ({
      canvasElements: state.canvasElements.filter((el) => el.id !== id),
    })),

  setSelectedElementId: (id) => set({ selectedElementId: id }),
  setEditingElementId: (id) => set({ editingElementId: id }),

  setToolbar: (toolbar) => set({ toolbar }),
}));
