import { getCurrentMonthRange } from '@/utils/card-detail/month-range.util';
import { createClient } from '@/utils/supabase/client';

export const getMonthSaveCount = async (cardId: string) => {
  const { start, end, beforeStart, beforeEnd } = getCurrentMonthRange();
  const supabase = await createClient();

  const { count, error } = await supabase
    .from('card_views')
    .select('*', { count: 'exact', head: true })
    .gte('started_at', (start + 'T00:00:00').toString())
    .lte('end_at', (end + 'T23:59:59').toString())
    .order('started_at', { ascending: true })
    .eq('type', 'save')
    .eq('card_id', cardId);
  if (error) {
    throw error;
  }

  const { count: beforeCount, error: beforeError } = await supabase
    .from('card_views')
    .select('*', { count: 'exact', head: true })
    .gte('started_at', (beforeStart + 'T00:00:00').toString())
    .lte('end_at', (beforeEnd + 'T23:59:59').toString())
    .order('started_at', { ascending: true })
    .eq('type', 'save')
    .eq('card_id', cardId);

  if (beforeError) {
    throw beforeError;
  }
  return {
    currentMonthCount: count,
    previousMonthCount: beforeCount,
    difference: (count || 0) - (beforeCount || 0),
  };
};
