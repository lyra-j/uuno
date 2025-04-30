// 배열 비교
export const isSameArray = (a: number[], b: number[]) => {
  return a.length === b.length && a.every((v, i) => v === b[i]);
};
