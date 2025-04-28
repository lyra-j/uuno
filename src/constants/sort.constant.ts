import { SortOption } from '@/types/sort.type';

/**
 * 정렬 드롭사운에 사용될 옵션 목록
 * label: 사용자에게 보여줄 이름
 * value: SortKey
 */
export const SORT_OPTIONS: SortOption[] = [
  { label: '최근 생성 순', value: 'created_at' },
  { label: '최근 수정 순', value: 'updated_at' },
];
