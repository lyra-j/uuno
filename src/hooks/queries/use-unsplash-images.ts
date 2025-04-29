import { useInfiniteQuery } from '@tanstack/react-query';
import { UnsplashImage, UnsplashSearchResponse } from '@/types/unsplash';

const PER_PAGE = 30;

export const useUnsplashImages = (query: string) => {
  return useInfiniteQuery<UnsplashImage[], Error>({
    queryKey: ['unsplash-images', query] as const,

    queryFn: async ({ pageParam = 1 }) => {
      const params = new URLSearchParams({
        page: String(pageParam),
        per_page: String(PER_PAGE),
      });
      if (query) params.set('query', query);

      const res = await fetch(`/api/unsplash?${params.toString()}`, {
        next: { revalidate: 60 },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || '이미지 로드 실패');

      if (query) {
        const { results } = data as UnsplashSearchResponse;
        return results;
      }

      return data as UnsplashImage[];
    },

    getNextPageParam: (_, allPages) => allPages.length + 1,

    initialPageParam: 1,

    staleTime: 1000 * 60 * 10,
    retry: 1,
  });
};
