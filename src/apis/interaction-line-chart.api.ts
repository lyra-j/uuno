import { DB_COLUMNS, SUB_TABLES } from '@/constants/tables.constant';
import { getCurrentWeekRange } from '@/utils/card-detail/week-range.util';
import { createClient } from '@/utils/supabase/client';

interface InteractionLineChartDataParams {
  card_id: string;
}

export const getInteractionLineChartData = async ({
  card_id,
}: InteractionLineChartDataParams) => {
  const { start, end, weekDates } = getCurrentWeekRange();
  const supabase = createClient();

  // 한 번에 주간 조회 데이터 가져오기
  const { data: viewsData, error: viewsError } = await supabase
    .from(SUB_TABLES.DAILY_CARD_VIEWS)
    .select(
      `${DB_COLUMNS.DAILY_CARD_VIEWS.VIEW_DATE}, ${DB_COLUMNS.DAILY_CARD_VIEWS.UNIQUE_SESSIONS}`
    )
    .gte(DB_COLUMNS.DAILY_CARD_VIEWS.VIEW_DATE, start.iso)
    .lte(DB_COLUMNS.DAILY_CARD_VIEWS.VIEW_DATE, end.iso)
    .eq(DB_COLUMNS.DAILY_CARD_VIEWS.CARD_ID, card_id);

  if (viewsError) {
    console.error('Views query error:', viewsError);
  }

  // 한 번에 주간 저장 데이터 가져오기
  const { data: savesData, error: savesError } = await supabase
    .from(SUB_TABLES.DAILY_CARD_SAVES)
    .select(
      `${DB_COLUMNS.DAILY_CARD_SAVES.SAVE_DATE}, ${DB_COLUMNS.DAILY_CARD_SAVES.UNIQUE_SAVES}`
    )
    .gte(DB_COLUMNS.DAILY_CARD_SAVES.SAVE_DATE, start.iso)
    .lte(DB_COLUMNS.DAILY_CARD_SAVES.SAVE_DATE, end.iso)
    .eq(DB_COLUMNS.DAILY_CARD_SAVES.CARD_ID, card_id);

  if (savesError) {
    console.error('Saves query error:', savesError);
  }

  // 결과를 날짜별로 정리
  const weekViewCnt = weekDates.map((date) => {
    const found = viewsData?.find(
      (item) => item[DB_COLUMNS.DAILY_CARD_VIEWS.VIEW_DATE] === date
    );
    return found ? found[DB_COLUMNS.DAILY_CARD_VIEWS.UNIQUE_SESSIONS] : 0;
  });

  const weekSaveCnt = weekDates.map((date) => {
    const found = savesData?.find(
      (item) => item[DB_COLUMNS.DAILY_CARD_SAVES.SAVE_DATE] === date
    );
    return found ? found[DB_COLUMNS.DAILY_CARD_SAVES.UNIQUE_SAVES] : 0;
  });

  return {
    weekViewCnt,
    weekSaveCnt,
    start,
    end,
    weekDates,
  };
};
