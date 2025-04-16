import { EditorState } from '@/store/editor.store';

export const getCanvasKeys = (state: EditorState) => {
  const isFront = state.isCanvasFront;

  const elementsKey = isFront ? 'canvasElements' : 'canvasBackElements';
  const historiesKey = isFront ? 'histories' : 'backHistories';
  const historyIdxKey = isFront ? 'historyIdx' : 'backHistoryIdx';

  const currentElements = state[elementsKey];
  const currentHistories = state[historiesKey];
  const currentHistoryIdx = state[historyIdxKey];

  return {
    elementsKey,
    historiesKey,
    historyIdxKey,
    currentElements,
    currentHistories,
    currentHistoryIdx,
  };
};
