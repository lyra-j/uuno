'use server';
import { DB_COLUMNS, TABLES } from '@/constants/tables.constant';
import { createClient } from '@/utils/supabase/server';
import { deleteAllFilesInFolder } from '@/apis/storage';

interface Props {
  slug: string;
  cardId: string;
  userId: string;
}

export const deleteCard = async ({ cardId, slug, userId }: Props) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from(TABLES.CARDS)
    .delete()
    .eq(DB_COLUMNS.CARDS.ID, cardId);

  if (error) throw error;

  const folderPath = `${userId}/${slug}`;
  await deleteAllFilesInFolder('cards', folderPath);

  return data;
};
