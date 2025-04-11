import { DB_COLUMNS, TABLES } from '@/constants/tables.constant';
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

  const weekViewCnt = await Promise.all(
    weekDates.map(async (date) => {
      const { count, error } = await supabase
        .from(TABLES.CARD_VIEWS)
        .select('*', { count: 'exact', head: true })
        .gte(DB_COLUMNS.CARD_VIEWS.STARTED_AT, (date + 'T00:00:00').toString())
        .lte(DB_COLUMNS.CARD_VIEWS.END_AT, (date + 'T23:59:59').toString())
        .order(DB_COLUMNS.CARD_VIEWS.STARTED_AT, { ascending: true })
        .eq(DB_COLUMNS.CARD_VIEWS.CARD_ID, card_id);
      if (error) {
        console.error(error);
        return 0;
      }
      return count;
    })
  );
  const weekSaveCnt = await Promise.all(
    weekDates.map(async (date) => {
      const { count, error } = await supabase
        .from(TABLES.CARD_VIEWS)
        .select('*', { count: 'exact', head: true })
        .gte(DB_COLUMNS.CARD_VIEWS.STARTED_AT, (date + 'T00:00:00').toString())
        .lte(DB_COLUMNS.CARD_VIEWS.END_AT, (date + 'T23:59:59').toString())
        .order(DB_COLUMNS.CARD_VIEWS.STARTED_AT, { ascending: true })
        .eq(DB_COLUMNS.CARD_VIEWS.CARD_ID, card_id)
        .eq('type', 'save');
      if (error) {
        console.error(error);
        return;
      }
      return count;
    })
  );

  return {
    weekViewCnt,
    weekSaveCnt,
    start,
    end,
    weekDates,
  };
};
