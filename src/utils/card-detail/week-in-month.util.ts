/**
 * 각 주의 범위를 나타내는 타입입니다.
 * - `start`: 주의 시작일(일요일) 00:00:00.000Z 타임스탬프
 * - `end`  : 주의 종료일(토요일) 23:59:59.999Z 타임스탬프
 */
interface WeekRange {
  start: string;
  end: string;
}
/**
 * @name getWeeksInMonth
 * @description
 * 지정된 연도(year)와 월(month 인덱스 0~11)에 대해
 * 해당 월의 모든 날짜를 **일요일부터 토요일까지**
 * 주 단위로 분할하여 반환합니다.
 * @param year  - 4자리 연도 (예: 2025)
 * @param month - 0(1월)부터 11(12월) 사이의 월 인덱스
 * @returns WeekRange[]  생성된 주 범위 배열
 */
export const getWeeksInMonth = (year: number, month: number): WeekRange[] => {
  if (month < 0 || month > 11) {
    throw new Error('0(1월)~11(12월)사이의 인덱스를 설정해주세요');
  }
  // 월의 첫째 날과 마지막 날 (UTC 기준)
  const firstOfMonth = new Date(Date.UTC(year, month, 1));
  const lastOfMonth = new Date(Date.UTC(year, month + 1, 0, 23, 59, 59, 999));

  // 첫째 날의 요일 (0=Sun, 1=Mon ... 6=Sat)
  const dow = firstOfMonth.getUTCDay();
  // 첫 주 시작을 위한 이전 일요일로 이동할 일 수
  const deltaToSunday = dow;

  // 첫 주의 시작일 (UTC 일요일)
  const weekStart0 = new Date(firstOfMonth);
  weekStart0.setUTCDate(firstOfMonth.getUTCDate() - deltaToSunday);

  const weeks: WeekRange[] = [];
  let cursor = new Date(weekStart0);

  // 커서가 한 달 마지막을 넘지 않을 때까지 반복
  while (cursor <= lastOfMonth) {
    // 주의 시작(일요일)
    const wkStart = new Date(cursor);
    // 주의 종료(토요일)
    const wkEnd = new Date(cursor);
    wkEnd.setUTCDate(wkStart.getUTCDate() + 6);
    wkEnd.setUTCHours(23, 59, 59, 999);

    // 월의 경계 내로 자르기
    const startClamped = wkStart < firstOfMonth ? firstOfMonth : wkStart;
    const endClamped = wkEnd > lastOfMonth ? lastOfMonth : wkEnd;

    weeks.push({
      start: startClamped.toISOString(),
      end: endClamped.toISOString(),
    });

    // 다음 주로 이동
    cursor = new Date(wkStart);
    cursor.setUTCDate(wkStart.getUTCDate() + 7);
  }

  return weeks;
};

/* @example
 * ```ts
 * // 2025년 5월(인덱스 4)을 일요일-토요일 주 단위로 분할
 * const weeks = getWeeksInMonth(2025, 4);
 * console.log(weeks);
 * // [
 * //   { start: '2025-04-27T00:00:00.000Z', end: '2025-05-03T23:59:59.999Z' },
 * //   { start: '2025-05-04T00:00:00.000Z', end: '2025-05-10T23:59:59.999Z' },
 * //   ...
 * // ]
 * ```
 */
