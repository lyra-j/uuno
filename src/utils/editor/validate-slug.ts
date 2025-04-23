import sweetAlertUtil from '../common/sweet-alert-util';

/**
 * 슬러그 유효성 검사 및 저장
 */
export const validateSlug = async (
  setSlug: (slug: string) => void
): Promise<string | null> => {
  const input = await sweetAlertUtil.input({
    title: '명함을 공유하기 위한 \n 주소를 생성해주세요.',
    text: '내 명함 주소를 직접 생성할 수 있어요. \n https://uuno.vercel.app/<여기에 들어갈 주소>',
    inputPlaceholder: '영문, 숫자, 하이픈(-), (_)만 입력해주세요.',
  });

  if (!input) {
    await sweetAlertUtil.error('저장 취소', '저장이 취소되었습니다.');
    return null;
  }

  //앞 뒤 공백 및 슬래쉬 제거
  const cleaned = input.trim().replace(/^\/+|\/+$/g, '');

  // 중간 슬러그도 제거
  const isValid = /^[a-zA-Z0-9-]+$/.test(cleaned);

  if (!isValid) {
    await sweetAlertUtil.error('유효하지 않은 주소', '다시 입력해 주세요.');
    return null;
  }

  setSlug(cleaned);
  return cleaned;
};
