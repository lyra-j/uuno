import ENV from '@/constants/env.constant';
import { NextResponse } from 'next/server';

/**
 * Unsplash 이미지 검색 및 기본 리스트 반환
 * @param request
 * @returns
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  const endpoint = query
    ? `https://api.unsplash.com/search/photos?query=${query}&per_page=50&client_id=${ENV.UNSPLASH_ACCESS_KEY}`
    : `https://api.unsplash.com/photos?per_page=50&client_id=${ENV.UNSPLASH_ACCESS_KEY}`;

  try {
    const res = await fetch(endpoint);
    const data = await res.json();

    return NextResponse.json(query ? data.results : data);
  } catch (error) {
    console.error('Unsplash API 호출 오류:', error);
    return NextResponse.json(
      { error: '이미지를 가져오는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
