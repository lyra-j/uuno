import { CanvasElements } from '@/types/editor.type';
import sweetAlertUtil from '@/utils/common/sweet-alert-util';

export const handleReset = (
  histories: CanvasElements[][],
  backHistories: CanvasElements[][],
  reset: () => void
) => {
  if (histories.length > 1 || backHistories.length > 1) {
    sweetAlertUtil.confirmDelete({
      title: '초기화 하시겠습니까?',
      text: '초기화하면 현재 작업하신 내용은 삭제가 됩니다. 진행하시겠습니까?',
      onConfirm: reset,
    });
  }
};
