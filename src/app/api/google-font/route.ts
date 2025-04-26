import { NextResponse } from 'next/server';

export async function GET() {
  const key = process.env.GOOGLE_FONTS_API_KEY;
  const url = `https://www.googleapis.com/webfonts/v1/webfonts?key=${key}&sort=popularity`;
  const res = await fetch(url, {
    signal: AbortSignal.timeout(5000),
  }).catch(() => null);
  if (!res || !res.ok) {
    return NextResponse.json(
      { error: 'Failed to fetch fonts' },
      { status: 500 }
    );
  }
  const data = await res.json();

  const koreanFonts = data.items
    .filter((f: { subsets: string[] }) => f.subsets.includes('korean'))
    .map((f: { family: string }) => f.family);
  return NextResponse.json(koreanFonts, {
    headers: {
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
