import { MAX_UNSPALSH_API_PAGES, PER_PAGE } from '@/constants/editor.constant';
import ENV from '@/constants/env.constant';
import { UnsplashImage, UnsplashSearchResponse } from '@/types/unsplash';
import { NextResponse } from 'next/server';

/**
 * Unsplash API Route
 *
 * 일반 사진 리스트 가져오기
 * 검색 기반 리시트 가져오기
 * @param request http 요청
 * @returns 쿼리 파라미터에 따라 결과 값 JSON 형태로 반환
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || '';
  const page = Number(searchParams.get('page') || '1');
  const perPage = Number(searchParams.get('per_page') || PER_PAGE);

  //페이지 MAX_UNSPALSH_API_PAGES 넘어가면 요청 막기
  if (page > MAX_UNSPALSH_API_PAGES) {
    return NextResponse.json(
      { error: '요청 페이지 수 제한 초과' },
      { status: 429 }
    );
  }

  const baseURL = query
    ? `https://api.unsplash.com/search/photos`
    : `https://api.unsplash.com/photos`;

  const url =
    `${baseURL}?client_id=${ENV.UNSPLASH_ACCESS_KEY}` +
    `&page=${page}&per_page=${perPage}` +
    (query ? `&query=${encodeURIComponent(query)}` : '');

  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    return NextResponse.json(
      {
        error: '이미지 불러오기 실패',
        details: errorData || res.statusText,
      },
      { status: res.status }
    );
  }

  const json = await res.json();

  //검색
  if (query) {
    const { results, total_pages } = json as UnsplashSearchResponse;
    return NextResponse.json({ results, total_pages });
  }

  // 일반
  return NextResponse.json(json as UnsplashImage[]);
}
