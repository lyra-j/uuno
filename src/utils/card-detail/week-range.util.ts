import { DATE_FORMAT, DateFormatType } from '@/constants/date-format.constant';

/**
 * @description - 날짜와 포맷 타입을 받아서 포맷된 날짜를 반환하는 함수
 * @param date - Date 객체, type - 포맷 타입 (dot 또는 dash)
 * @returns - 포맷된 날짜 문자열
 */
export const formatDate = ({
  date,
  type = DATE_FORMAT.DOT,
}: {
  date: Date;
  type: DateFormatType;
}) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return type === DATE_FORMAT.DOT ? `${mm}.${dd}` : `${yyyy}-${mm}-${dd}`;
};

/**
 * @description 현재 주의 시작일과 종료일을 구하는 함수
 * @param baseDate - 기준 날짜
 * @returns {
 *  start {
 *   display: string; // 포맷된 날짜 (MM.DD)
 *   iso: string; // ISO 포맷된 날짜 (yyyy-mm-ddTHH:mm:ss)
 *  }
 *  end {
 *   display: string; // 포맷된 날짜 (MM.DD)
 *   iso: string; // ISO 포맷된 날짜 (yyyy-mm-ddTHH:mm:ss)
 *  }
 * }
 */
export const getCurrentWeekRange = (baseDate: Date = new Date()) => {
  // 날짜를 복제하여 시간 정보를 초기화 (00:00:00으로 설정)
  const normalizedDate = new Date(baseDate);
  normalizedDate.setHours(0, 0, 0, 0);

  const day = normalizedDate.getDay();

  // 주의 시작일 (일요일) 계산
  const sunday = new Date(normalizedDate);
  sunday.setDate(normalizedDate.getDate() - day);

  // 주의 마지막 날 (토요일) 계산
  const saturday = new Date(sunday);
  saturday.setDate(sunday.getDate() + 6);

  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(sunday);
    date.setDate(sunday.getDate() + i);
    return formatDate({ date, type: 'dash' });
  });

  const isoFormat = (date: Date) => {
    return date.toISOString().split('T')[0] + 'T00:00:00';
  };

  const endIsoFormat = (date: Date) => {
    return date.toISOString().split('T')[0] + 'T23:59:59';
  };

  return {
    start: {
      display: formatDate({ date: sunday, type: DATE_FORMAT.DOT }),
      iso: isoFormat(sunday),
    },
    end: {
      display: formatDate({ date: saturday, type: DATE_FORMAT.DOT }),
      iso: endIsoFormat(saturday),
    },
    weekDates: weekDates,
  };
};
