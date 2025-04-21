import { createClient } from '@/utils/supabase/client';
import { DB_COLUMNS, TABLES } from '@/constants/tables.constant';
import { getWeeksInMonth } from '@/utils/card-detail/week-in-month.util';

interface WeeklySourceCount {
  weekLabel: string;
  month: string;
  qr: number;
  link: number;
  tag: number;
  direct: number;
}

/**
 * @name getWeeklySourceCounts
 * @description
 * 현재 시점 기준으로 **해당 월**의 명함 조회 데이터를
 * **일요일(Sunday)부터 토요일(Saturday)** 단위로 분할하여,
 * 각 주별 `weekLabel`, `month`, `qr`, `link`, `tag`, `direct` 소스의 조회 수를 집계해 반환합니다.
 *
 * 처리 과정:
 * 1. `getWeeksInMonth(year, month)`로 해당 월의 모든 주(Sunday~Saturday) 범위를 구함
 * 2. 첫 주 시작일부터 마지막 주 종료일 사이의 모든 레코드를 Supabase에서 한 번에 조회
 * 3. 조회된 데이터의 타임스탬프(`started_at`)를 각 주 범위에 매핑해 필터링
 * 4. 필터링된 각 주별 레코드에서 소스별 건수를 계산해 `WeeklySourceCount[]`로 반환
 *
 * @param cardId - 조회할 명함의 고유 ID (문자열)
 * @returns Promise<WeeklySourceCount[]>
 */
export const getWeeklySourceCounts = async (
  cardId: string
): Promise<WeeklySourceCount[]> => {
  const supabase = await createClient();

  // UTC 기준 현재 연도/월 추출
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = now.getUTCMonth(); // 0=1월, 11=12월

  // 월별 주 범위 계산 (일요일~토요일)
  const weeks = getWeeksInMonth(year, month);

  // 월 전체 범위 (첫 주 시작 ~ 마지막 주 종료)
  const monthStart = weeks[0].start;
  const monthEnd = weeks[weeks.length - 1].end;

  // Supabase에서 해당 기간의 조회 데이터 조회
  const { data, error } = await supabase
    .from(TABLES.CARD_VIEWS)
    .select(
      `${DB_COLUMNS.CARD_VIEWS.SOURCE}, ${DB_COLUMNS.CARD_VIEWS.STARTED_AT}`
    )
    .eq(DB_COLUMNS.CARD_VIEWS.CARD_ID, cardId)
    .gte(DB_COLUMNS.CARD_VIEWS.STARTED_AT, monthStart)
    .lte(DB_COLUMNS.CARD_VIEWS.STARTED_AT, monthEnd);

  if (error) {
    console.error('유입경로 페칭 오류 : ', error);
    throw error;
  }

  // 주별 및 소스별 집계
  return weeks.map(({ start, end }) => {
    // 해당 주 범위에 속한 레코드 필터링
    const rows = (data || []).filter((record) => {
      const startedAtDate = new Date(record[DB_COLUMNS.CARD_VIEWS.STARTED_AT]!);
      return startedAtDate >= new Date(start) && startedAtDate <= new Date(end);
    });

    // 주 내 특정 소스 카운트 계산기
    const countSource = (source: string) =>
      rows.filter((row) => row[DB_COLUMNS.CARD_VIEWS.SOURCE] === source).length;

    // 차트 레이블 포맷터: "D일~D일"
    const labelFormatter= (iso: string) => {
      const d = new Date(iso);
      const dd = String(d.getUTCDate());
      return dd;
    };

    const startDate =labelFormatter(start);
    const endDate =labelFormatter(end);

    // 월 정보 추출
    const monthStr = String(new Date(start).getUTCMonth() + 1);

    return {
      weekLabel: `${startDate}일~${endDate}일`,
      month: `${monthStr}월`,
      qr: countSource('qr'),
      link: countSource('link'),
      tag: countSource('tag'),
      direct: countSource('direct'),
    };
  });
};

/**
 *  *
 * @example
 * ```ts
 * const counts = await getWeeklySourceCounts('card-xyz');
 * console.log(counts);
 * // [
 * //   { weekLabel: '1일~7일',  month: '4월', qr: 12, link: 7,  tag: 3, direct: 5 },
 * //   { weekLabel: '8일~14일', month: '4월', qr:  9, link: 4,  tag: 2, direct: 6 },
 * //   ...
 * // ]
 * ```
 */
