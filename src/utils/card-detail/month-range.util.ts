import { formatDate } from './week-range.util';

/**
 * @description 현재 월의 시작일과 종료일을 구하는 함수
 * @param baseDate - 기준 날짜
 * @returns {
 *  start: string; // 현재 월의 시작일 (yyyy-mm-dd)
 *  end: string; // 현재 월의 종료일 (yyyy-mm-dd)
 *  beforeStart: string; // 이전 월의 시작일 (yyyy-mm-dd)
 *  beforeEnd: string; // 이전 월의 종료일 (yyyy-mm-dd)
 * }
 */
export const getCurrentMonthRange = (baseDate: Date = new Date()) => {
  const year = baseDate.getFullYear();
  const month = baseDate.getMonth();
  const beforeMonth = baseDate.getMonth() - 1;
  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0);
  const beforeStartDate = new Date(year, beforeMonth, 1);
  const beforeEndDate = new Date(year, month, 0);

  return {
    start: formatDate({ date: startDate, type: 'dash' }),
    end: formatDate({ date: endDate, type: 'dash' }),
    beforeStart: formatDate({ date: beforeStartDate, type: 'dash' }),
    beforeEnd: formatDate({ date: beforeEndDate, type: 'dash' }),
  };
};
