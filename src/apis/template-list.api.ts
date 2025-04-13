import { TABLES } from '@/constants/tables.constant';
import { Templates } from '@/types/supabase.type';
import { createClient as createServerSupabaseClient } from '@/utils/supabase/server';

interface GetTemplateListOptions {
  style?: 'simple' | 'trendy';
  limit?: number;
  offset?: number;
}
export interface GetTemplateListResponse {
  data: Templates[];
  count: number;
}

export const getTemplateList = async (
  options?: GetTemplateListOptions
): Promise<GetTemplateListResponse> => {
  const supabase = await createServerSupabaseClient();

  let query = supabase.from(TABLES.TEMPLATES).select('*', { count: 'exact' });

  // style 옵션이 주어진 경우 필터링
  if (options?.style) {
    query = query.eq('style', options.style);
  }

  query = query.order('name', { ascending: true });

  // limit 옵션이 주어진 경우
  if (options?.limit) {
    query = query.limit(options.limit);
  }

  // offset이 주어진 경우, offset과 limit을 조합하여 특정 범위 데이터를 가져오기
  if (options?.offset) {
    const limit = options.limit ?? 9;
    query = query.range(options.offset, options.offset + limit - 1);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error('템플릿 불러오기 에러: ', error.message);
    return { data: [], count: 0 };
    // throw new Error(error.message);
  }
  return { data: data ?? [], count: count ?? 0 };
};
