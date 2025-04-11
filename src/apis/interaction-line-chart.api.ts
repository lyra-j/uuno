import {
  CARD_VIEW_TYPES,
  DB_COLUMNS,
  TABLES,
} from '@/constants/tables.constant';
import { getCurrentWeekRange } from '@/utils/card-detail/week-range.util';
import { createClient } from '@/utils/supabase/client';

interface InteractionLineChartDataParams {
  card_id: string;
}

export const getInteractionLineChartData = async ({
  card_id,
}: InteractionLineChartDataParams) => {
  const { start, end, weekDates } = getCurrentWeekRange();
  const supabase = await createClient();

  // 공통 함수로 추출
  const getCountByDate = async (date: string, type?: 'click' | 'save') => {
    let query = supabase
      .from(TABLES.CARD_VIEWS)
      .select('*', { count: 'exact', head: true })
      .gte(DB_COLUMNS.CARD_VIEWS.STARTED_AT, (date + 'T00:00:00').toString())
      .lte(DB_COLUMNS.CARD_VIEWS.END_AT, (date + 'T23:59:59').toString())
      .order(DB_COLUMNS.CARD_VIEWS.STARTED_AT, { ascending: true })
      .eq(DB_COLUMNS.CARD_VIEWS.CARD_ID, card_id);

    if (type) {
      query = query.eq('type', type);
    }

    const { count, error } = await query;
    if (error) {
      console.error(error);
      return;
    }
    return count;
  };

  const weekViewCnt = await Promise.all(
    weekDates.map((date) => getCountByDate(date))
  );

  const weekSaveCnt = await Promise.all(
    weekDates.map((date) => getCountByDate(date, CARD_VIEW_TYPES.SAVE))
  );

  return {
    weekViewCnt,
    weekSaveCnt,
    start,
    end,
    weekDates,
  };
};
