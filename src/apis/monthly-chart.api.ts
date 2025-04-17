import { DB_COLUMNS, SUB_TABLES, TABLES } from '@/constants/tables.constant';
import { getCurrentMonthRange } from '@/utils/card-detail/month-range.util';
import { createClient } from '@/utils/supabase/client';

/**
 * 월간 라인 차트 데이터
 *
 */
export const getUserMonthlyLineData = async (userId: string) => {
  const supabase = await createClient();
  const { start, end, monthDates } = getCurrentMonthRange();

  // 사용자의 명함 가져오기
  const { data: userCards, error: cardsError } = await supabase
    .from(TABLES.CARDS)
    .select(DB_COLUMNS.CARDS.ID)
    .eq(DB_COLUMNS.CARDS.USER_ID, userId);

  if (cardsError) throw cardsError;
  if (!userCards || userCards.length === 0) {
    return {
      monthDates,
      monthViewCnt: monthDates.map(() => 0),
      monthSaveCnt: monthDates.map(() => 0),
      start,
      end,
    };
  }

  const cardIds = userCards.map((card) => card.id);

  /**
   * 조회 데이터 (DAILY_CARD_VIEWS)
   */
  const { data: viewsData, error: viewsError } = await supabase
    .from(SUB_TABLES.DAILY_CARD_VIEWS)
    .select(
      `${DB_COLUMNS.DAILY_CARD_VIEWS.VIEW_DATE}, ${DB_COLUMNS.DAILY_CARD_VIEWS.UNIQUE_SESSIONS}`
    )
    .gte(DB_COLUMNS.DAILY_CARD_VIEWS.VIEW_DATE, `${start}T00:00:00`)
    .lte(DB_COLUMNS.DAILY_CARD_VIEWS.VIEW_DATE, `${end}T23:59:59`)
    .in(DB_COLUMNS.DAILY_CARD_VIEWS.CARD_ID, cardIds);

  if (viewsError) throw viewsError;

  /**
   * 저장 데이터 (DAILY_CARD_SAVES)
   */
  const { data: savesData, error: savesError } = await supabase
    .from(SUB_TABLES.DAILY_CARD_SAVES)
    .select(
      `${DB_COLUMNS.DAILY_CARD_SAVES.SAVE_DATE}, ${DB_COLUMNS.DAILY_CARD_SAVES.UNIQUE_SAVES}`
    )
    .gte(DB_COLUMNS.DAILY_CARD_SAVES.SAVE_DATE, `${start}T00:00:00`)
    .lte(DB_COLUMNS.DAILY_CARD_SAVES.SAVE_DATE, `${end}T23:59:59`)
    .in(DB_COLUMNS.DAILY_CARD_SAVES.CARD_ID, cardIds);

  if (savesError) throw savesError;

  /**
   * 일자별 합산
   */
  const monthViewCnt = monthDates.map((date) => {
    const rows =
      viewsData?.filter(
        (row) => row[DB_COLUMNS.DAILY_CARD_VIEWS.VIEW_DATE] === date
      ) || [];
    return rows.reduce((sum, row) => {
      return (
        sum + (Number(row[DB_COLUMNS.DAILY_CARD_VIEWS.UNIQUE_SESSIONS]) || 0)
      );
    }, 0);
  });

  const monthSaveCnt = monthDates.map((date) => {
    const rows =
      savesData?.filter(
        (row) => row[DB_COLUMNS.DAILY_CARD_SAVES.SAVE_DATE] === date
      ) || [];
    return rows.reduce((sum, row) => {
      return sum + (Number(row[DB_COLUMNS.DAILY_CARD_SAVES.UNIQUE_SAVES]) || 0);
    }, 0);
  });

  return {
    monthDates,
    monthViewCnt,
    monthSaveCnt,
    start,
    end,
  };
};

/**
 * 월간 통계 : 총 조회/저장 수 + 이전 월 대비 차이
 *
 */
export const getUserMonthlyStats = async (userId: string) => {
  const supabase = await createClient();
  const { start, end, beforeStart, beforeEnd } = getCurrentMonthRange();

  // 사용자 명함 가져오기
  const { data: userCards, error: cardsError } = await supabase
    .from(TABLES.CARDS)
    .select(DB_COLUMNS.CARDS.ID)
    .eq(DB_COLUMNS.CARDS.USER_ID, userId);

  if (cardsError) throw cardsError;
  if (!userCards || userCards.length === 0) {
    return {
      totalMonthViews: 0,
      totalMonthSaves: 0,
      viewsDifference: 0,
      savesDifference: 0,
    };
  }

  const cardIds = userCards.map((card) => card.id);

  // 현재 월 조회 합산
  const { data: monthViewsData } = await supabase
    .from(SUB_TABLES.DAILY_CARD_VIEWS)
    .select(`${DB_COLUMNS.DAILY_CARD_VIEWS.UNIQUE_SESSIONS}`)
    .gte(DB_COLUMNS.DAILY_CARD_VIEWS.VIEW_DATE, `${start}T00:00:00`)
    .lte(DB_COLUMNS.DAILY_CARD_VIEWS.VIEW_DATE, `${end}T23:59:59`)
    .in(DB_COLUMNS.DAILY_CARD_VIEWS.CARD_ID, cardIds);

  const totalMonthViews = (monthViewsData || []).reduce((sum, row) => {
    return (
      sum + (Number(row[DB_COLUMNS.DAILY_CARD_VIEWS.UNIQUE_SESSIONS]) || 0)
    );
  }, 0);

  // 현재 월 저장 합산
  const { data: monthSavesData } = await supabase
    .from(SUB_TABLES.DAILY_CARD_SAVES)
    .select(`${DB_COLUMNS.DAILY_CARD_SAVES.UNIQUE_SAVES}`)
    .gte(DB_COLUMNS.DAILY_CARD_SAVES.SAVE_DATE, `${start}T00:00:00`)
    .lte(DB_COLUMNS.DAILY_CARD_SAVES.SAVE_DATE, `${end}T23:59:59`)
    .in(DB_COLUMNS.DAILY_CARD_SAVES.CARD_ID, cardIds);

  const totalMonthSaves = (monthSavesData || []).reduce((sum, row) => {
    return sum + (Number(row[DB_COLUMNS.DAILY_CARD_SAVES.UNIQUE_SAVES]) || 0);
  }, 0);

  // 이전 월 조회 합산
  const { data: prevMonthViewsData } = await supabase
    .from(SUB_TABLES.DAILY_CARD_VIEWS)
    .select(`${DB_COLUMNS.DAILY_CARD_VIEWS.UNIQUE_SESSIONS}`)
    .gte(DB_COLUMNS.DAILY_CARD_VIEWS.VIEW_DATE, `${beforeStart}T00:00:00`)
    .lte(DB_COLUMNS.DAILY_CARD_VIEWS.VIEW_DATE, `${beforeEnd}T23:59:59`)
    .in(DB_COLUMNS.DAILY_CARD_VIEWS.CARD_ID, cardIds);

  const totalPrevMonthViews = (prevMonthViewsData || []).reduce((sum, row) => {
    return (
      sum + (Number(row[DB_COLUMNS.DAILY_CARD_VIEWS.UNIQUE_SESSIONS]) || 0)
    );
  }, 0);

  // 이전 월 저장 합산
  const { data: prevMonthSavesData } = await supabase
    .from(SUB_TABLES.DAILY_CARD_SAVES)
    .select(`${DB_COLUMNS.DAILY_CARD_SAVES.UNIQUE_SAVES}`)
    .gte(DB_COLUMNS.DAILY_CARD_SAVES.SAVE_DATE, `${beforeStart}T00:00:00`)
    .lte(DB_COLUMNS.DAILY_CARD_SAVES.SAVE_DATE, `${beforeEnd}T23:59:59`)
    .in(DB_COLUMNS.DAILY_CARD_SAVES.CARD_ID, cardIds);

  const totalPrevMonthSaves = (prevMonthSavesData || []).reduce((sum, row) => {
    return sum + (Number(row[DB_COLUMNS.DAILY_CARD_SAVES.UNIQUE_SAVES]) || 0);
  }, 0);

  return {
    totalMonthViews,
    totalMonthSaves,
    viewsDifference: totalMonthViews - totalPrevMonthViews,
    savesDifference: totalMonthSaves - totalPrevMonthSaves,
  };
};

/**
 * 가장 조회수가 높은 명함
 *
 */
export const getMostViewedCard = async (userId: string) => {
  const supabase = await createClient();
  const { start, end, beforeStart, beforeEnd } = getCurrentMonthRange();

  // [사용자 소유 명함 가져오기
  const { data: userCards } = await supabase
    .from(TABLES.CARDS)
    .select('id, title')
    .eq(DB_COLUMNS.CARDS.USER_ID, userId);

  if (!userCards || userCards.length === 0) {
    return null;
  }

  // 각 명함별 현재 월 조회 수
  const cardViews = await Promise.all(
    userCards.map(async (card) => {
      const { data: monthViewsData } = await supabase
        .from(SUB_TABLES.DAILY_CARD_VIEWS)
        .select(`${DB_COLUMNS.DAILY_CARD_VIEWS.UNIQUE_SESSIONS}`)
        .gte(DB_COLUMNS.DAILY_CARD_VIEWS.VIEW_DATE, `${start}T00:00:00`)
        .lte(DB_COLUMNS.DAILY_CARD_VIEWS.VIEW_DATE, `${end}T23:59:59`)
        .eq(DB_COLUMNS.DAILY_CARD_VIEWS.CARD_ID, card.id);

      const monthViewCount = (monthViewsData || []).reduce((sum, row) => {
        return (
          sum + (Number(row[DB_COLUMNS.DAILY_CARD_VIEWS.UNIQUE_SESSIONS]) || 0)
        );
      }, 0);

      return { id: card.id, title: card.title, monthViewCount };
    })
  );

  // 가장 조회 수 높은 명함
  const mostViewedCard = cardViews.reduce((prev, current) => {
    return prev.monthViewCount > current.monthViewCount ? prev : current;
  });

  if (!mostViewedCard) return null;

  // 이전 월 조회 수
  const { data: prevMonthData } = await supabase
    .from(SUB_TABLES.DAILY_CARD_VIEWS)
    .select(`${DB_COLUMNS.DAILY_CARD_VIEWS.UNIQUE_SESSIONS}`)
    .gte(DB_COLUMNS.DAILY_CARD_VIEWS.VIEW_DATE, `${beforeStart}T00:00:00`)
    .lte(DB_COLUMNS.DAILY_CARD_VIEWS.VIEW_DATE, `${beforeEnd}T23:59:59`)
    .eq(DB_COLUMNS.DAILY_CARD_VIEWS.CARD_ID, mostViewedCard.id);

  const previousMonthViews = (prevMonthData || []).reduce((sum, row) => {
    return (
      sum + (Number(row[DB_COLUMNS.DAILY_CARD_VIEWS.UNIQUE_SESSIONS]) || 0)
    );
  }, 0);

  const viewsDifference = mostViewedCard.monthViewCount - previousMonthViews;

  return {
    id: mostViewedCard.id,
    title: mostViewedCard.title,
    totalMonthViews: mostViewedCard.monthViewCount,
    previousMonthViews,
    viewsDifference,
  };
};
