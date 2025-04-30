import { DB_COLUMNS, TABLES } from '@/constants/tables.constant';
import { createClient } from '@/utils/supabase/client';
import { cache } from 'react';

/**
 * 슬러그를 기반으로 명함 ID를 조회
 *
 * @param slug 명함 슬러그
 * @returns 해당 슬러그에 매칭 명함 ID
 */
export const getCardId = async (slug: string) => {
  const supabase = createClient();
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
export const getUserNickName = cache(async (slug: string) => {
  const supabase = createClient();
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
});

/**
 * 명함 ID를 기반으로 명함 정보를 조회
 *
 * @param cardId 명함 Id
 * @returns 해당 명함Id에 매칭 명함 정보
 */
export const getCardTitle = async (cardId: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from(TABLES.CARDS)
    .select(
      `
      ${DB_COLUMNS.CARDS.TITLE},
      ${DB_COLUMNS.CARDS.FRONT_IMG_URL},
      ${DB_COLUMNS.CARDS.CONTENT},
      ${DB_COLUMNS.CARDS.SLUG},
      users (
        ${DB_COLUMNS.USERS.NICK_NAME}
      )
    `
    )
    .eq(DB_COLUMNS.CARDS.ID, cardId)
    .single();

  if (error) throw error;
  if (!data) throw new Error('명함 정보를 찾을 수 없습니다.');

  return {
    title: data.title ?? '',
    imageUrl: data.frontImgURL ?? '',
    description: data.content ?? '',
    nickName: data.users?.nick_name ?? '',
    slug: data.slug ?? '',
  };
};

/**
 * 사용자의 명함 개수를 조회하는 함수
 *
 * @description
 * 사용자가 보유한 명함의 총 개수를 조회
 * @param userId - 조회하려는 사용자의 고유 ID
 * @returns Promise<number> - 사용자가 보유한 명함의 개수 (0 이상의 정수)
 *
 * @throws {Error}
 * - RLS 정책 위반 시: "최대 3개의 명함만 생성할 수 있습니다." 메시지와 함께 에러 발생
 * - 기타 데이터베이스 에러: Supabase에서 발생한 원본 에러를 그대로 전달
 */
export const getCardCount = async (userId: string) => {
  const supabase = createClient();

  // 명함 테이블에서 사용자의 명함 개수 조회
  const { count, error } = await supabase
    .from(TABLES.CARDS)
    .select('*', {
      count: 'exact', // 정확한 개수 조회
      head: true, // 실제 데이터는 조회하지 않고 개수만 반환
    })
    .eq(DB_COLUMNS.CARDS.USER_ID, userId); // 사용자 ID로 필터링

  if (error) {
    if (error.code === '42501') {
      // RLS 정책 위반 에러 코드
      throw new Error('최대 3개의 명함만 생성할 수 있습니다.');
    }
    throw error; // 기타 데이터베이스 에러는 그대로 전달
  }

  // 명함이 없는 경우 0 반환, 그 외에는 조회된 개수 반환
  return count || 0;
};

/* @example
 * ```typescript
 * try {
 *   const count = await getCardCount('user-123');
 *   console.log(`사용자가 보유한 명함 개수: ${count}`);
 * } catch (error) {
 *   console.error('명함 개수 조회 중 에러 발생:', error);
 * }
 * ```
 */
