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

/**
 * 슬러그를 기반으로 닉네임을 조회
 *
 * @param slug 명함 슬러그
 * @returns 해당 슬러그에 매칭 사용자 닉네임
 */
export const getUserNickName = async (slug: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from(TABLES.CARDS)
    .select(
      `
    *,
    users (
      ${DB_COLUMNS.USERS.ID},
      ${DB_COLUMNS.USERS.NICK_NAME}
    )
  `
    )
    .eq(DB_COLUMNS.CARDS.SLUG, slug)
    .single();

  if (error) throw error;

  if (!data) {
    throw new Error('명함 정보를 찾을 수 없습니다.');
  }

  return data;
};

/**
 * 명함 ID를 기반으로 명함 제목을 조회
 *
 * @param cardId 명함 Id
 * @returns 해당 명함Id에 매칭 명함 타이틀
 */
export const getCardTitle = async (cardId: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from(TABLES.CARDS)
    .select(DB_COLUMNS.CARDS.TITLE)
    .eq(DB_COLUMNS.CARDS.ID, cardId)
    .single();

  if (error) throw error;

  return data;
};
