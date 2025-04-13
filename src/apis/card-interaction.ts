import { DB_COLUMNS, TABLES } from '@/constants/tables.constant';
import { createClient } from '@/utils/supabase/client';

export const getCardId = async (slug: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from(TABLES.CARDS)
    .select(DB_COLUMNS.CARDS.ID)
    .eq(DB_COLUMNS.CARDS.SLUG, slug);

  if (error) {
    throw error;
  }

  return data[0].id;
};
