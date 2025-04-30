import { DB_COLUMNS, TABLES } from '@/constants/tables.constant';
import { createClient } from '@/utils/supabase/client';

export const patchCardTitle = async (cardId: string, newTitle: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from(TABLES.CARDS)
    .update({ title: newTitle, updated_at: new Date().toISOString() })
    .eq(DB_COLUMNS.CARDS.ID, cardId)
    .select()
    .single();

  if (error) {
    throw error;
  }
  return data;
};
