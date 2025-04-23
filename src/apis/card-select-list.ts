import { DB_COLUMNS, TABLES } from '@/constants/tables.constant';
import { createClient } from '@/utils/supabase/client';

export const getCardSelectList = async (user_id: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from(TABLES.CARDS)
    .select(`${DB_COLUMNS.CARDS.TITLE}, ${DB_COLUMNS.CARDS.ID}`)
    .eq(DB_COLUMNS.CARDS.USER_ID, user_id);

  if (error) {
    throw error;
  }

  return data;
};
