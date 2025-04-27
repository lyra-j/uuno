'use server';

import { ROUTES } from '@/constants/path.constant';
import { DB_COLUMNS, TABLES } from '@/constants/tables.constant';
import { SortKey } from '@/types/sort.type';
import { Cards } from '@/types/supabase.type';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

/**
 * 카드 제목 업데이트
 * @param cardId 업데이트할 카드의 ID
 * @param newTitle 업데이트할 제목
 * @returns 업데이트된 카드 데이터
 */
export const updateCardTitle = async (cardId: string, newTitle: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from(TABLES.CARDS)
    .update({ title: newTitle, updated_at: new Date().toISOString() })
    .eq(DB_COLUMNS.CARDS.ID, cardId)
    .select()
    .single();

  if (error) {
    throw error;
  }
  revalidatePath(ROUTES.DASHBOARD.MYCARDS);
  return data;
};

/**
 * getCardList
 *
 * 주어진 userId를 기준으로 Supabase의 cards 테이블에서
 * 해당 사용자가 생성한 명함 목록을 조회합니다.
 *
 * @param userId - 조회할 사용자 ID
 * @returns Promise<Cards[]> - 명함 Row 객체 배열
 * @throws Error - 조회 중 에러 발생 시 throw
 */
export const getCardList = async (userId: string): Promise<Cards[]> => {
  const supabase = await createClient();

  const { data: cards, error } = await supabase
    .from(TABLES.CARDS)
    .select('*')
    .eq(DB_COLUMNS.CARDS.USER_ID, userId)
    .order(DB_COLUMNS.CARDS.CREATED_AT, { ascending: false });

  if (error) {
    console.error('카드 목록 조회 중 에러:', error);
    throw error;
  }

  return cards ?? [];
};

/**
 * getCardListBySort
 *
 * 주어진 userId를 기준으로 Supabase의 cards 테이블에서
 * 해당 사용자가 생성한 명함 목록을 조회합니다.
 * 정렬 옵션 반영
 * @param params.userId 조회할 사용자 ID
 * @param params.sortBy 정렬 키
 * @param params.order 정렬 방향 (asc/desc)
 * @returns Promise<Cards[]> - 명함 Row 객체 배열
 * @throws Error - 조회 중 에러 발생 시 throw
 */
export const getCardListBySort = async (params: {
  userId: string;
  sortBy: SortKey;
  order?: 'asc' | 'desc';
}): Promise<Cards[]> => {
  const { userId, sortBy, order = 'desc' } = params;
  const supabase = await createClient();

  const { data: cards, error } = await supabase
    .from(TABLES.CARDS)
    .select('*')
    .eq(DB_COLUMNS.CARDS.USER_ID, userId)
    .order(sortBy, { ascending: order === 'asc' });

  if (error) {
    console.error('카드 목록 조회 중 에러:', error);
    throw error;
  }

  return cards ?? [];
};
