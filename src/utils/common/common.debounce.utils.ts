/**
 *
 * 타입 미쳐버린 디바운싱 함수
 * @param callback : 디바운싱 처리하고 싶은 함수 T
 * @param delay : 지연시간 (ms)
 * @returns
 */

// T는 매개변수 any에 void를 반환하는 함수
export const debounce = <T extends (...args: any[]) => void>(
  //인자로 callback : T, delay : number를 받음
  callback: T,
  delay: number
  // return값은 T의 인자 타입을 그대로 받아 void를 반환
): ((...args: Parameters<T>) => void) => {
  // 타이머를 저장할 변수(브라우저에서는 number, Node에서는 Timeout객체 반환)
  // 그래서 ReturnType<typeof setTimeout>으로 작성 해줘야 함
  let timeoutId: ReturnType<typeof setTimeout>;
  // 디바운스 된 새 함수 반환
  return (...args: Parameters<T>) => {
    // 기존 타이머 제거
    clearTimeout(timeoutId);
    // delay 후 callback 실행
    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};
