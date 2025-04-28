/**
 * 주간 통계 데이터의 합계를 계산하는 함수
 * @param data - 합계를 계산할 데이터 배열
 * @returns 합계 값
 */
export const calculateTotal = (data: (number | null | undefined)[]): number => {
  return data
    .filter((v): v is number => v !== null && v !== undefined)
    .reduce((a, c) => a + c, 0);
};

/**
 * 주간 통계 데이터의 합계를 계산하고 단위를 붙여 반환하는 함수
 * @param data - 합계를 계산할 데이터 배열
 * @param unit - 단위 (기본값: '회')
 * @returns 합계 값과 단위가 붙은 문자열
 */
export const calculateTotalWithUnit = (
  data: (number | null | undefined)[],
  unit: string = '회'
): string => {
  const total = calculateTotal(data);
  return `${total}${unit}`;
};

/**
 * 주간 통계 데이터의 합계를 계산하고 단위를 붙여 반환하는 함수
 * @param data - 합계를 계산할 데이터 배열
 * @param unit - 단위 (기본값: '회')
 * @returns 합계 값과 단위가 붙은 문자열, 그리고 합계가 0인지 여부
 */
export const calculateTotalWithUnitAndStatus = (
  data: (number | null | undefined)[],
  unit: string = '회'
): { text: string; isEmpty: boolean } => {
  const total = calculateTotal(data);
  return {
    text: `${total}${unit}`,
    isEmpty: total === 0,
  };
};
