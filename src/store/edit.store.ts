// store.ts
import { create } from 'zustand';
import { v4 } from 'uuid';

/**
 * 캔버스에 추가할 텍스트 요소
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
  width: number;
}

// 상태 인터페이스 정의
interface EditorState {
  elements: TextElement[];
  selectedId: string | null;
  editingId: string | null;
  addText: (textContent: string, fontSize: number) => void;
  setSelectedId: (id: string | null) => void;
  updateElement: (id: string, newProps: Partial<TextElement>) => void;
  removeElement: (id: string) => void;
  // 편집 모드 종료 함수 등 필요에 따라 확장
}

export const useEditorStore = create<EditorState>((set) => ({
  elements: [],
  selectedId: null,
  editingId: null,
  addText: (textContent: string, fontSize: number) =>
    set((state) => {
      const newId = v4();
      const newText: TextElement = {
        id: newId,
        type: 'text',
        text: textContent,
        x: 150,
        y: 150,
        rotation: 0,
        fontSize,
        fill: '#000000',
        fontFamily: 'Arial',
        width: 200, // 기본 너비 고정
      };
      return {
        elements: [...state.elements, newText],
        selectedId: newId,
        editingId: newId,
      };
    }),
  setSelectedId: (id: string | null) => set({ selectedId: id }),
  updateElement: (id: string, newProps: Partial<TextElement>) =>
    set((state) => ({
      elements: state.elements.map((el) =>
        el.id === id ? { ...el, ...newProps } : el
      ),
    })),
  removeElement: (id: string) =>
    set((state) => ({ elements: state.elements.filter((el) => el.id !== id) })),
}));
