import { TablesInsert } from '@/types/supabase';
import { createClient } from '@/utils/supabase/client';

export const saveCard = async (payload: TablesInsert<'cards'>) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('cards')
    .insert([payload])
    .select();

  if (error) {
    throw error;
  }

  return data?.[0];
};
