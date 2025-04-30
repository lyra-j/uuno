import {
  CARD_VIEW_TYPES,
  DB_COLUMNS,
  SUB_TABLES,
  TABLES,
} from '@/constants/tables.constant';
import { getCurrentMonthRange } from '@/utils/card-detail/month-range.util';
import { createClient } from '@/utils/supabase/client';

/**
 * getMonthSaveCount
 * @description 주어진 카드 ID에 대해 이번 달과 이전 달의 저장(SAVE) 횟수를 집계하고,
 *              두 달 간 차이를 반환합니다.
 * @param cardId 조회할 명함 ID
 * @returns Promise<{
 *   currentMonthCount: number | null;      // 이번 달 저장 횟수
 *   previousMonthCount: number | null;     // 이전 달 저장 횟수
 *   difference: number;                    // 두 달 간 저장 횟수 차이
 * }>
 */
export const getMonthSaveCount = async (cardId: string) => {
  // 이번 달/이전 달 날짜 범위 계산
  const { start, end, beforeStart, beforeEnd } = getCurrentMonthRange();
  const supabase = createClient();

  // 현재 월 저장 횟수 조회
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

  // 이전 월 저장 횟수 조회
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
 * getMonthViewCount
 * @description 주어진 카드 ID에 대해 이번 달과 이전 달의 일별 고유 방문자(unique sessions)를 합산한
 *              조회 수를 집계하고, 두 달 간 차이를 반환합니다.
 * @param cardId 조회할 명함 ID
 * @returns Promise<{
 *   currentMonthViews: number;    // 이번 달 총 조회 수
 *   previousMonthViews: number;   // 이전 달 총 조회 수
 *   viewsDifference: number;      // 두 달 간 조회 수 차이
 * }>
 */
export const getMonthViewCount = async (cardId: string) => {
  // 이번 달/이전 달 날짜 범위 계산
  const { start, end, beforeStart, beforeEnd } = getCurrentMonthRange();
  const supabase = createClient();

  // 현재 월 일별 UNIQUE_SESSIONS 조회
  const { data: currentMonthData, error: currentError } = await supabase
    .from(SUB_TABLES.DAILY_CARD_VIEWS)
    .select(`${DB_COLUMNS.DAILY_CARD_VIEWS.UNIQUE_SESSIONS}`)
    .gte(DB_COLUMNS.DAILY_CARD_VIEWS.VIEW_DATE, `${start}T00:00:00`)
    .lte(DB_COLUMNS.DAILY_CARD_VIEWS.VIEW_DATE, `${end}T23:59:59`)
    .eq(DB_COLUMNS.DAILY_CARD_VIEWS.CARD_ID, cardId);

  if (currentError) throw currentError;

  // 이전 월 일별 UNIQUE_SESSIONS 조회
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

/**
 * getMonthClickCount
 * @description 주어진 카드 ID에 대해 이번 달과 이전 달의 클릭(CLICK) 횟수를 집계하고,
 *              두 달 간 차이를 반환합니다.
 * @param cardId 조회할 명함 ID
 * @returns Promise<{
 *   currentMonthClickCount: number | null;  // 이번 달 클릭 횟수
 *   previousMonthClickCount: number | null; // 이전 달 클릭 횟수
 *   difference: number;                     // 두 달 간 클릭 횟수 차이
 * }>
 */
export const getMonthClickCount = async (cardId: string) => {
  // start/end 이번 달 시작/끝
  // beforeStart, beforeEnd 이전 달 시작/끝
  const { start, end, beforeStart, beforeEnd } = getCurrentMonthRange();
  const supabase = createClient();

  // 현재 월의 클릭 수 조회
  const { count: currentClickCount, error: currentError } = await supabase
    .from(TABLES.CARD_VIEWS)
    .select('*', { count: 'exact', head: true })
    .gte(DB_COLUMNS.CARD_VIEWS.STARTED_AT, (start + 'T00:00:00').toString())
    .lte(DB_COLUMNS.CARD_VIEWS.END_AT, (end + 'T23:59:59').toString())
    .order(DB_COLUMNS.CARD_VIEWS.STARTED_AT, { ascending: true })
    .eq(DB_COLUMNS.CARD_VIEWS.TYPE, CARD_VIEW_TYPES.CLICK)
    .eq(DB_COLUMNS.CARD_VIEWS.CARD_ID, cardId);

  if (currentError) {
    throw currentError;
  }

  // 이전 월의 클릭 수 조회
  const { count: beforeClickCount, error: beforeError } = await supabase
    .from(TABLES.CARD_VIEWS)
    .select('*', { count: 'exact', head: true })
    .gte(
      DB_COLUMNS.CARD_VIEWS.STARTED_AT,
      (beforeStart + 'T00:00:00').toString()
    )
    .lte(DB_COLUMNS.CARD_VIEWS.END_AT, (beforeEnd + 'T23:59:59').toString())
    .order(DB_COLUMNS.CARD_VIEWS.STARTED_AT, { ascending: true })
    .eq(DB_COLUMNS.CARD_VIEWS.TYPE, CARD_VIEW_TYPES.CLICK)
    .eq(DB_COLUMNS.CARD_VIEWS.CARD_ID, cardId);

  if (beforeError) {
    throw beforeError;
  }
  // 변화량
  const clicksDifference = (currentClickCount ?? 0) - (beforeClickCount ?? 0);

  return {
    currentMonthClickCount: currentClickCount,
    previousMonthClickCount: beforeClickCount,
    difference: clicksDifference,
  };
};
