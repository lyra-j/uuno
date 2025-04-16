import {
  CARD_VIEW_TYPES,
  DB_COLUMNS,
  SUB_TABLES,
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

/**
 * 명함 ID 월별 조회수
 */
export const getMonthViewCount = async (cardId: string) => {
  const { start, end, beforeStart, beforeEnd } = getCurrentMonthRange();
  const supabase = await createClient();

  // 현재 월 조휘수
  const { data: currentMonthData, error: currentError } = await supabase
    .from(SUB_TABLES.DAILY_CARD_VIEWS)
    .select(`${DB_COLUMNS.DAILY_CARD_VIEWS.UNIQUE_SESSIONS}`)
    .gte(DB_COLUMNS.DAILY_CARD_VIEWS.VIEW_DATE, `${start}T00:00:00`)
    .lte(DB_COLUMNS.DAILY_CARD_VIEWS.VIEW_DATE, `${end}T23:59:59`)
    .eq(DB_COLUMNS.DAILY_CARD_VIEWS.CARD_ID, cardId);

  if (currentError) throw currentError;

  // 이전 월 조회수
  const { data: previousMonthData, error: previousError } = await supabase
    .from(SUB_TABLES.DAILY_CARD_VIEWS)
    .select(`${DB_COLUMNS.DAILY_CARD_VIEWS.UNIQUE_SESSIONS}`)
    .gte(DB_COLUMNS.DAILY_CARD_VIEWS.VIEW_DATE, `${beforeStart}T00:00:00`)
    .lte(DB_COLUMNS.DAILY_CARD_VIEWS.VIEW_DATE, `${beforeEnd}T23:59:59`)
    .eq(DB_COLUMNS.DAILY_CARD_VIEWS.CARD_ID, cardId);

  if (previousError) throw previousError;

  // 현재 월 조회수 합산
  const currentMonthViews = (currentMonthData || []).reduce((sum, row) => {
    return (
      sum + (Number(row[DB_COLUMNS.DAILY_CARD_VIEWS.UNIQUE_SESSIONS]) || 0)
    );
  }, 0);

  // 이전 월 조회수 합산
  const previousMonthViews = (previousMonthData || []).reduce((sum, row) => {
    return (
      sum + (Number(row[DB_COLUMNS.DAILY_CARD_VIEWS.UNIQUE_SESSIONS]) || 0)
    );
  }, 0);

  // 변화량 계산
  const viewsDifference = currentMonthViews - previousMonthViews;

  return {
    currentMonthViews,
    previousMonthViews,
    viewsDifference,
  };
};
