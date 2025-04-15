/**
 * 명함 이미지 URL을 생성합니다
 * @param card_id 명함 ID
 * @returns 명함 이미지 URL
 */
export const CARD_IMAGE_URL = (card_id: string): string => {
  if (!card_id) throw new Error('카드 ID가 필요합니다');
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    'https://mhetidsangfefbezfspd.supabase.co';
  return `${supabaseUrl}/storage/v1/object/public/cards/${card_id}/card_test.jpg`;
};
