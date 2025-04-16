/**
 * 주어진 날짜를 yyyy-mm-dd 형식으로 변환하는 함수입니다.
 *
 * @param {Date} date - 변환할 Date 객체.
 * @returns {string} yyyy-mm-dd 형식으로 변환된 날짜 문자열.
 */
export const formatToDateString = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  const formattedTime = `${hours}:${minutes}:${seconds}`;

  return formattedDate + ' ' + formattedTime;
};

/**
 * 날짜를 "YYYY.MM" 형식으로 변환합니다
 * @param date 날짜 객체 또는 날짜 문자열
 * @returns "YYYY.MM" 형식의 문자열
 */
export const formatYearMonth = (date: Date | string): string => {
  // 문자열인 경우 Date 객체로 변환
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  // 년도와 월 추출
  const year = dateObj.getFullYear();
  // getMonth()는 0부터 시작하므로 1을 더하고, 10보다 작으면 앞에 0을 붙임
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');

  return `${year}.${month}`;
};

// Date 객체를 사용하는 경우 예시 //
const date = new Date();
const yearMonth1 = formatYearMonth(date); // "2025.04"


/**
 * 년월 문자열에서 "YYYY.MM" 형식으로 변환합니다
 * @param yearMonthStr "YYYY-MM" 형식의 문자열
 * @returns "YYYY.MM" 형식의 문자열
 */
export const formatYearMonthString = (yearMonthStr: string): string => {
  // 첫 4자리(년도)와 5-7자리(월) 추출
  const year = yearMonthStr.slice(0, 4);
  const month = yearMonthStr.slice(5, 7);

  return `${year}.${month}`;
};

// 문자열을 사용하는 경우 //
const start = "2025-04-01";
const yearMonth2 = formatYearMonthString(start); // "2025.04"
