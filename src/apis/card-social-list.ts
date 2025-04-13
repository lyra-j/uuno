import { DB_COLUMNS, TABLES } from '@/constants/tables.constant';
import { createClient } from '@/utils/supabase/client';

/**
 * 명함 ID에 해당하는 소셜 링크 목록 조회
 *
 * @param card_id 조회할 명함 ID
 * @returns 명함에 연결된 소셜 링크 배열
 */
export const getCardSocialLists = async (card_id: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from(TABLES.LINKS)
    .select('*')
    .eq(DB_COLUMNS.LINKS.CARD_ID, card_id);

  if (error) throw error;

  return data;
};
