import sweetAlertUtil from '../common/sweet-alert-util';

/**
 * 슬러그 유효성 검사 및 저장
 */
export const validateSlug = async (
  setSlug: (slug: string) => void
): Promise<string | null> => {
  const input = await sweetAlertUtil.input({
    title: '공유될 명함 주소를 입력하세요.',
    text: 'https://uuno.vercel.app/<여기에 들어갈 주소>',
    inputPlaceholder: '예: my-uuno',
  });

  if (!input) {
    await sweetAlertUtil.error('저장 취소', '저장이 취소되었습니다.');
    return null;
  }

  const cleaned = input.trim().replace(/^\/+/, '');
  const isValid = /^[a-zA-Z0-9-]+$/.test(cleaned);

  if (!isValid) {
    await sweetAlertUtil.error('유효하지 않은 주소', '다시 입력해 주세요.');
    return null;
  }

  setSlug(cleaned);
  return cleaned;
};
