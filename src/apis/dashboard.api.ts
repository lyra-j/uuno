'use server';

import { ROUTES } from '@/constants/path.constant';
import { DB_COLUMNS, TABLES } from '@/constants/tables.constant';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

/**
 * 주어진 카드 ID에 해당하는 카드를 삭제
 * @param cardId 삭제할 카드의 ID
 * @returns 삭제 결과 데이터
 */
export const deleteCard = async (cardId: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from(TABLES.CARDS)
    .delete()
    .eq(DB_COLUMNS.CARDS.ID, cardId);

  if (error) {
    throw error;
  }
  revalidatePath(ROUTES.DASHBOARD.MYCARDS);
  return { success: true };
};

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
