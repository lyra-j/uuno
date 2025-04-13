import { getIpAddress } from '@/apis/interaction';
import { QUERY_KEY } from '@/constants/query-key';
import { useQuery } from '@tanstack/react-query';

/**
 * 사용자 IP 주소를 조회하는 쿼리 훅
 *
 * @returns IP 주소 정보를 포함한 쿼리 결과
 */
export const useIpAddressQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEY.USER_IP],
    queryFn: getIpAddress,
    staleTime: Infinity, // IP는 세션 동안 변경되지 않으므로 무한 캐시
    retry: 3, // 실패 시 최대 3번 재시도
  });
};
