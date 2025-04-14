import { DB_COLUMNS, TABLES } from '@/constants/tables.constant';
import { createClient } from '@/utils/supabase/client';

export const getSlugData = async (card_id: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from(TABLES.CARDS)
    .select(DB_COLUMNS.CARDS.SLUG)
    .eq(DB_COLUMNS.CARDS.ID, card_id)
    .single();

  if (error) {
    throw error;
  }

  return { data };
};
