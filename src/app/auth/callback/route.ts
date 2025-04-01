import { NextResponse } from 'next/server';
// The client you created from the Server-Side Auth instructions
import { createClient } from '@/utils/supabase/server';
import { ERROR_MESSAGES } from '@/constants/messages';
import { TABLES } from '@/constants/tables';
import { duplicateValudation } from '@/utils/duplicate-validation';

export const GET = async (request: Request) => {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';

  if (!code) {
    /** 에러 페이지는 나중에 같이 고민해봐야 할 듯 */
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const userId = data.user?.id;
      const nick_name = data.user.user_metadata.full_name;
      const email = data.user.email;

      /** forwardedHost : localhost:3000 */
      const forwardedHost = request.headers.get('x-forwarded-host');
      /** 개발 환경인지 */
      const isLocalEnv = process.env.NODE_ENV === 'development';

      if (!email) {
        throw new Error(ERROR_MESSAGES.NONE_EMAIL_ERROR);
      }

      /** 중복이 아닐시 */
      if (!(await duplicateValudation(email))) {
        // public users에 데이터 삽입
        const { error: insertError } = await supabase
          .from(TABLES.USERS)
          .insert([
            {
              id: userId,
              nick_name,
              email,
            },
          ]);
        if (insertError) {
          console.error(ERROR_MESSAGES.USERS_TABLE_INSERT_ERROR, insertError);
        }
      }

      if (isLocalEnv) {
        /** 개발 환경일 시 localhost:3000 으로 이동 */
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        /** 개발환경 아닐 시 "/" 로 이동 */
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }
};
