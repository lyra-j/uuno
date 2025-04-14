import ENV from '@/constants/env.constant';
import { UnsplashImage } from '@/types/unsplash';
import { NextResponse } from 'next/server';

const ACCESS_KEY = ENV.UNSPLASH_ACCESS_KEY;
const BASE_URL = 'https://api.unsplash.com/photos';

/**
 * Unsplash 이미지 4페이지(200장) 미리 받아오기
 * @returns 이미지 배열
 */
export async function GET() {
  try {
    const allImages: UnsplashImage[] = [];

    const pageRequests = Array.from({ length: 4 }, (_, i) =>
      fetch(
        `${BASE_URL}?page=${i + 1}&per_page=50&client_id=${ACCESS_KEY}`
      ).then((res) => res.json())
    );

    const results = await Promise.all(pageRequests);

    for (const pageData of results) {
      if (Array.isArray(pageData)) {
        allImages.push(...(pageData as UnsplashImage[]));
      }
    }

    return NextResponse.json(allImages);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
