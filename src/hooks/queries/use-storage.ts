import { getFolderSize } from '@/apis/storage';
import { QUERY_KEY } from '@/constants/query-key';
import { useQuery } from '@tanstack/react-query';

/**
 * 버킷 스토리지 사용량 조회
 * @param buckName
 * @param userId
 * @returns
 */
export const useStorageUsage = (buckName: string, userId: string | null) => {
  return useQuery({
    queryKey: [QUERY_KEY.STORAGEUSAGE, buckName, userId],
    queryFn: async () => {
      if (!userId) return { sizeInGB: 0, totalBytes: 0, fileCount: 0 };
      return getFolderSize(buckName, userId);
    },
    enabled: !!userId,
  });
};
