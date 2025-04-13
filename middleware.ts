import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';

// 기존 경로 목록
const existingRoutes = ['/card', '/editor', '/template-list'];

export const middleware = async (request: NextRequest) => {
  // 사용자 인증 세션 업데이트 (기존 기능 유지)
  const response = await updateSession(request);

  // NextResponse가 아닌 경우 (예: 리디렉션이 발생한 경우) 해당 응답 반환
  if (!(response instanceof NextResponse)) {
    return response;
  }

  const pathname = request.nextUrl.pathname;

  // 기존 명시적 라우트는 그대로 처리
  if (
    existingRoutes.some(
      (route) => pathname === route || pathname.startsWith(`${route}/`)
    )
  ) {
    return response;
  }

  return response;
};

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
