import {
  CARD_VIEW_TYPES,
  DB_COLUMNS,
  TABLES,
} from '@/constants/tables.constant';
import { getCurrentMonthRange } from '@/utils/card-detail/month-range.util';
import { createClient } from '@/utils/supabase/client';

export const getMonthSaveCount = async (cardId: string) => {
  const { start, end, beforeStart, beforeEnd } = getCurrentMonthRange();
  const supabase = await createClient();

  const { count, error } = await supabase
    .from(TABLES.CARD_VIEWS)
    .select('*', { count: 'exact', head: true })
    .gte(DB_COLUMNS.CARD_VIEWS.STARTED_AT, (start + 'T00:00:00').toString())
    .lte(DB_COLUMNS.CARD_VIEWS.END_AT, (end + 'T23:59:59').toString())
    .order(DB_COLUMNS.CARD_VIEWS.STARTED_AT, { ascending: true })
    .eq(DB_COLUMNS.CARD_VIEWS.TYPE, CARD_VIEW_TYPES.SAVE)
    .eq(DB_COLUMNS.CARD_VIEWS.CARD_ID, cardId);
  if (error) {
    throw error;
  }

  const { count: beforeCount, error: beforeError } = await supabase
    .from(TABLES.CARD_VIEWS)
    .select('*', { count: 'exact', head: true })
    .gte(
      DB_COLUMNS.CARD_VIEWS.STARTED_AT,
      (beforeStart + 'T00:00:00').toString()
    )
    .lte(DB_COLUMNS.CARD_VIEWS.END_AT, (beforeEnd + 'T23:59:59').toString())
    .order(DB_COLUMNS.CARD_VIEWS.STARTED_AT, { ascending: true })
    .eq(DB_COLUMNS.CARD_VIEWS.TYPE, CARD_VIEW_TYPES.SAVE)
    .eq(DB_COLUMNS.CARD_VIEWS.CARD_ID, cardId);

  if (beforeError) {
    throw beforeError;
  }
  return {
    currentMonthCount: count,
    previousMonthCount: beforeCount,
    difference: (count || 0) - (beforeCount || 0),
  };
};
