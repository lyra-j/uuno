import { NextResponse } from 'next/server';
// The client you created from the Server-Side Auth instructions
import { createClient } from '@/utils/supabase/server';
import { ERROR_MESSAGES } from '@/constants/messages';
import { duplicateEmailValidation } from '@/utils/duplicate-validation';
import { postUserData } from '@/services/user.server.dto';

export const GET = async (request: Request) => {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';
  const supabase = await createClient();

  if (!code) {
    /** 에러 페이지는 나중에 같이 고민해봐야 할 듯 */
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  if (code) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const userData = {
        userId: data.user?.id,
        nick_name: data.user.user_metadata.full_name,
        email: data.user.email!,
      };

      /** forwardedHost : localhost:3000 */
      const forwardedHost = request.headers.get('x-forwarded-host');
      /** 개발 환경인지 */
      const isLocalEnv = process.env.NODE_ENV === 'development';

      if (!userData.email) {
        throw new Error(ERROR_MESSAGES.NONE_EMAIL_ERROR);
      }

      /** 중복이 아닐시 */
      if (!(await duplicateEmailValidation(userData.email))) {
        // public users에 데이터 삽입
        const { success, error } = await postUserData(userData);
        if (!success) {
          console.error(ERROR_MESSAGES.USERS_TABLE_INSERT_ERROR, error);
        }
      }

      if (isLocalEnv) {
        /** 개발 환경일 시 localhost:3000 으로 이동 */
        await supabase.auth.getUser();
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        /** 개발환경 아닐 시 "/" 로 이동 */
        await supabase.auth.getUser();
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        await supabase.auth.getUser();
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }
};
