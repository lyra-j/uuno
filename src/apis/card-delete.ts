import { DB_COLUMNS, TABLES } from '@/constants/tables.constant';
import { createClient } from '@/utils/supabase/client';

export const deleteCard = async (card_id: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from(TABLES.CARDS)
    .delete()
    .eq(DB_COLUMNS.CARDS.ID, card_id);

  if (error) throw error;

  return data;
};
