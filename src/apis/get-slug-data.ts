import { DB_COLUMNS, TABLES } from '@/constants/tables.constant';
import { createClient } from '@/utils/supabase/client';

export const getSlugData = async (cardId: string) => {
  if (!cardId) return null;

  const supabase = createClient();
  const { data, error } = await supabase
    .from(TABLES.CARDS)
    .select(DB_COLUMNS.CARDS.SLUG)
    .eq(DB_COLUMNS.CARDS.ID, cardId)
    .single();

  if (error) {
    throw error;
  }

  return data.slug;
};
