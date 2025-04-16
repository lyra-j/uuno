import { useEffect, useRef } from 'react';

type UseInfiniteScrollOptions = {
  root?: HTMLElement | null;
  hasMore: boolean;
  onIntersect: () => void;
};

export const useInfiniteScroll = ({
  root,
  hasMore,
  onIntersect,
}: UseInfiniteScrollOptions) => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!observerRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onIntersect();
        }
      },
      {
        root: root ?? null,
        threshold: 1,
      }
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [root, hasMore, onIntersect]);

  return observerRef;
};
