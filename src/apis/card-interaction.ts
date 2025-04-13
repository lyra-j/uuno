import { DB_COLUMNS, TABLES } from '@/constants/tables.constant';
import { createClient } from '@/utils/supabase/client';

/**
 * 슬러그를 기반으로 명함 ID를 조회
 *
 * @param slug 명함 슬러그
 * @returns 해당 슬러그에 매칭 명함 ID
 */
export const getCardId = async (slug: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from(TABLES.CARDS)
    .select(DB_COLUMNS.CARDS.ID)
    .eq(DB_COLUMNS.CARDS.SLUG, slug);

  if (error) {
    throw error;
  }

  if (!data || data.length === 0) {
    throw new Error(`명함을 찾을 수 없습니다: ${slug}`);
  }

  return data[0].id;
};
