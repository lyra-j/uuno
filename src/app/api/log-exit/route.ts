import { DB_COLUMNS, TABLES } from '@/constants/tables.constant';
import { createClient } from '@/utils/supabase/client';
import { NextResponse } from 'next/server';

/**
 * 세션 종료 시 명함 조회 정보를 업데이트
 *
 * @param request
 * @returns 성공 시 {success: true}, 실패 시 에러 메시지와 적절한 상태 코드
 */
export async function POST(request: Request) {
  try {
    // 요청 본문에서 세션 ID와 종료 시간 추출
    const { session_id, end_at } = await request.json();
    const supabase = await createClient();

    if (!session_id || !end_at) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from(TABLES.CARD_VIEWS)
      .update({ end_at })
      .eq(DB_COLUMNS.CARD_VIEWS.SESSION_ID, session_id);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error details:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
