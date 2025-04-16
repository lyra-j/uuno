import { createClient } from '@/utils/supabase/client';

export const getClientTemplateList = async () => {
  const supabase = createClient();
  const { data, error, count } = await supabase
    .from('templates')
    .select('*', { count: 'exact' })
    .order('name', { ascending: true });

  if (error) {
    console.error('템플릿 로드 실패:', error.message);
    return { data: [], count: 0 };
  }

  return { data: data ?? [], count: count ?? 0 };
};
