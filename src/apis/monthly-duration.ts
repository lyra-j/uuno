import { DB_COLUMNS, TABLES } from '@/constants/tables.constant';
import { getCurrentMonthRange } from '@/utils/card-detail/month-range.util';
import { secondsToMinutes } from '@/utils/interaction/format-time';
import { createClient } from '@/utils/supabase/client';

export interface MonthlyDurationStats {
  currentMonthAvg: number; // 이번 달 총 duration (초)
  previousMonthAvg: number; // 지난 달 총 duration (초)
  difference: number; // currentMonth - previousMonth
  // 분 단위
  currentMonthAvgMin: number; // 이번 달 평균 duration (분)
  previousMonthAvgMin: number; // 지난 달 평균 duration (분)
  differenceMin: number; // 분 단위 차이
}

export const getMonthAvgDuration = async (
  cardId: string
): Promise<MonthlyDurationStats> => {
  const { start, end, beforeStart, beforeEnd } = getCurrentMonthRange();
  const supabase = await createClient();

  // 이번 달 데이터 조회
  const { data: currRows, error: currErr } = await supabase
    .from(TABLES.CARD_VIEWS)
    .select(DB_COLUMNS.CARD_VIEWS.DURATION)
    .gte(DB_COLUMNS.CARD_VIEWS.STARTED_AT, `${start}T00:00:00`)
    .lte(DB_COLUMNS.CARD_VIEWS.STARTED_AT, `${end}T23:59:59`)
    .eq(DB_COLUMNS.CARD_VIEWS.CARD_ID, cardId);

  if (currErr) throw currErr;

  // 지난 달 데이터 조회
  const { data: prevRows, error: prevErr } = await supabase
    .from(TABLES.CARD_VIEWS)
    .select(DB_COLUMNS.CARD_VIEWS.DURATION)
    .gte(DB_COLUMNS.CARD_VIEWS.STARTED_AT, `${beforeStart}T00:00:00`)
    .lte(DB_COLUMNS.CARD_VIEWS.STARTED_AT, `${beforeEnd}T23:59:59`)
    .eq(DB_COLUMNS.CARD_VIEWS.CARD_ID, cardId);

  if (prevErr) throw prevErr;

  // 합계·개수 계산 helpers
  const sumDur = (rows: Array<{ duration: number | null }> = []) =>
    rows.reduce((acc, { duration }) => acc + (duration ?? 0), 0);
  const countDur = (rows: Array<{ duration: number | null }> = []) =>
    rows.filter((r) => r.duration != null).length;

  const currSum = sumDur(currRows);
  const currCount = countDur(currRows);
  const prevSum = sumDur(prevRows);
  const prevCount = countDur(prevRows);

  // 평균·차이 계산
  const currentMonthAvg = currCount ? currSum / currCount : 0;
  const previousMonthAvg = prevCount ? prevSum / prevCount : 0;
  const difference = currentMonthAvg - previousMonthAvg;

  // 분 단위로 변환
  const currentMonthAvgMin = secondsToMinutes(currentMonthAvg);
  const previousMonthAvgMin = secondsToMinutes(previousMonthAvg);
  const differenceMin = secondsToMinutes(difference);

  return {
    currentMonthAvg,
    previousMonthAvg,
    difference,
    currentMonthAvgMin,
    previousMonthAvgMin,
    differenceMin,
  };
};
