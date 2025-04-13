import { getIpAddress } from '@/apis/interaction';
import { QUERY_KEY } from '@/constants/query-key';
import { useQuery } from '@tanstack/react-query';

export const useIpAddressQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEY.USER_IP],
    queryFn: getIpAddress,
    staleTime: Infinity,
    retry: 3,
  });
};
