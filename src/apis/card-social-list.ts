import { DB_COLUMNS, TABLES } from '@/constants/tables.constant';
import { createClient } from '@/utils/supabase/client';

export const getCardSocialLists = async (card_id: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from(TABLES.LINKS)
    .select('*')
    .eq(DB_COLUMNS.LINKS.CARD_ID, card_id);

  if (error) throw error;

  console.log(data);

  return data;
};
