import { useQuery } from '@tanstack/react-query';
import { UnsplashImage } from '@/types/unsplash';

export const useUnsplashImages = () => {
  return useQuery<UnsplashImage[], Error>({
    queryKey: ['unsplash-images'],
    queryFn: async () => {
      const res = await fetch('/api/unsplash');
      const data = await res.json();
      if (!res.ok) throw new Error('이미지 데이터를 가져오지 못했습니다.');
      return Array.isArray(data) ? data : data.results || [];
    },
    staleTime: 1000 * 60 * 10,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
