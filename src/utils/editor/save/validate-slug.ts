import { toast } from '@/hooks/use-toast';
import { toastError, toastWarning } from '@/lib/toast-util';
import { usePromptDialogStore } from '@/store/editor.prompt-dialog.store';
import sweetAlertUtil from '@/utils/common/sweet-alert-util';

/**
 * 슬러그 유효성 검사 및 저장
 */
export const validateSlug = async (
  setSlug: (slug: string) => void
): Promise<string | null> => {
  const input = await new Promise<string | null>((resolve) => {
    usePromptDialogStore
      .getState()
      .open(
        '명함 주소 생성',
        'https://uuno.kr/<여기에 들어갈 주소>',
        '영문, 숫자, 하이픈(-), (_)만 입력해주세요.',
        resolve
      );
  });

  if (!input) {
    toastWarning('저장이 취소되었습니다.');
    return null;
  }

  //앞 뒤 공백 및 슬래쉬 제거
  const cleaned = input.trim().replace(/^\/+|\/+$/g, '');

  // 중간 슬러그도 제거
  const isValid = /^[a-zA-Z0-9-]+$/.test(cleaned);

  if (!isValid) {
    toastError('유효하지 않은 주소입니다.');
    return null;
  }

  setSlug(cleaned);
  return cleaned;
};
