import { Templates } from '@/types/supabase.type';
import { createClient as createServerSupabaseClient } from '@/utils/supabase/server';

export const getTemplateList = async (): Promise<Templates[]> => {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from('templates')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('템플릿 불러오기 에러: ', error.message);
    throw new Error(error.message);
  }
  return data ?? [];
};
