import { useState, useEffect } from 'react';

/**
 * 주어진 CSS 미디어쿼리에 따라 true/false를 반환하는 커스텀 훅
 * @param query 감지할 미디어쿼리 문자열
 * @returns  true, false
 */
export function useMediaQuery(query: string): boolean {
  //  window가 없으면(false), 있으면 현재 매칭 여부를 확인
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === 'undefined') {
      // 서버 = false
      return false;
    }
    // 클라이언트 = 실제 매칭 값 반환
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      // 서버 환경 체크
      return;
    }

    //  MediaQueryList 객체 생성
    const mql = window.matchMedia(query);

    const handler = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', handler);
    } else {
      mql.onchange = handler;
    }

    setMatches(mql.matches);

    return () => {
      if (typeof mql.removeEventListener === 'function') {
        mql.removeEventListener('change', handler);
      } else {
        mql.onchange = null;
      }
    };
  }, [query]);

  return matches;
}

/**
 * 화면 너비가 768px 이하인 경우 true를 반환하는 훅
 */
export const useIsMobile = (): boolean => useMediaQuery('(max-width: 768px)');
