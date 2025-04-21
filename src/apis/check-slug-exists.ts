import { DB_COLUMNS, TABLES } from '@/constants/tables.constant';
import { createClient } from '@/utils/supabase/client';

export const checkSlugExists = async (slug: string): Promise<boolean> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from(TABLES.CARDS)
    .select(DB_COLUMNS.CARDS.SLUG)
    .eq(DB_COLUMNS.CARDS.SLUG, slug)
    .limit(1)
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (data === null) {
    return false;
  }
  return true;
};
