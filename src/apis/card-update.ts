import { createClient } from '@/utils/supabase/client';
import { CardData } from '@/types/cards.type';
import { TablesUpdate } from '@/types/supabase';

export const updateCard = async ({
  id,
  payload,
}: {
  id: string;
  payload: TablesUpdate<'cards'>;
}) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('cards')
    .update(payload)
    .eq('id', id)
    .single<CardData>();

  if (error) throw error;
  return data!;
};
