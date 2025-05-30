import { TABLES } from '@/constants/tables.constant';
import { TablesInsert } from '@/types/supabase';
import { createClient } from '@/utils/supabase/client';

export const saveCard = async (card: TablesInsert<'cards'>) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from(TABLES.CARDS)
    .insert([card])
    .select();

  if (error) {
    throw error;
  }

  return data?.[0];
};
