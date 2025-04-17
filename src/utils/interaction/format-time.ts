/**
 * 초(seconds)를 분(minutes) 단위로 변환합니다.
 * @param seconds 초 단위 숫자
 * @returns minutes (소수점 2자리까지)
 */
export const secondsToMinutes = (seconds: number): number => {
  return parseFloat((seconds / 60).toFixed(2))
}