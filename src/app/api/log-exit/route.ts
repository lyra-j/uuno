import { DB_COLUMNS, TABLES } from '@/constants/tables.constant';
import { createClient } from '@/utils/supabase/client';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { session_id, end_at } = await request.json();
    const supabase = await createClient();

    if (!session_id || !end_at) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 슈파베이스에 데이터 저장
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
