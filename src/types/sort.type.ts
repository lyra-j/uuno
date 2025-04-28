/** 
* 명함 목록 정렬 옵션 타입
* SortKey : 정렬할 수 있는 컬럼 키
* SortOption: 드롭다운에 표시될 라벨과 실제 컬럼값
*/
export type SortKey = 'created_at' | 'updated_at';

export interface SortOption {
  label: string;
  value: SortKey
}