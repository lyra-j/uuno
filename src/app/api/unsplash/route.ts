// app/api/unsplash/route.ts
import ENV from '@/constants/env.constant';
import { UnsplashImage, UnsplashSearchResponse } from '@/types/unsplash';
import { NextResponse } from 'next/server';

const ACCESS_KEY = ENV.UNSPLASH_ACCESS_KEY;

/**
 *
 * @param request
 * @returns
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || '';
  const page = Number(searchParams.get('page') || '1');
  const perPage = Number(searchParams.get('per_page') || '30');

  const baseURL = query
    ? `https://api.unsplash.com/search/photos`
    : `https://api.unsplash.com/photos`;

  const url =
    `${baseURL}?client_id=${ACCESS_KEY}` +
    `&page=${page}&per_page=${perPage}` +
    (query ? `&query=${encodeURIComponent(query)}` : '');

  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) {
    return NextResponse.json(
      { error: '이미지 불러오기 실패' },
      { status: res.status }
    );
  }

  const json = await res.json();

  if (query) {
    // 검색 결과: { total, total_pages, results: UnsplashImage[] }
    const { results, total_pages } = json as UnsplashSearchResponse;
    return NextResponse.json({ results, total_pages });
  }

  // 일반 목록 (UnsplashImage[])
  return NextResponse.json(json as UnsplashImage[]);
}
