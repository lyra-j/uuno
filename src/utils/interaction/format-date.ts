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
