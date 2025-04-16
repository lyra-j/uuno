import { Templates } from '@/types/supabase.type';
import { createClient } from '@/utils/supabase/client';

export const getClientTemplateList = async (): Promise<{
  data: Templates[];
}> => {
  const supabase = createClient();
  const { data, error } = await supabase.from('templates').select('*');

  if (error) {
    console.error('템플릿 로드 실패:', error.message);
    return { data: [] };
  }

  return { data: data ?? [] };
};
