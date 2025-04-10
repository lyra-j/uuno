import { ERROR_MESSAGES } from '@/constants/auth.messages.constant';
import { createClient } from '@/utils/supabase/client';

export const signupGoogle = async () => {
  const supabase = createClient();

  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    if (error) {
      console.error(ERROR_MESSAGES.GOOGLE_SIGNUP_ERROR, error);
    }
  } catch (error) {
    console.error(ERROR_MESSAGES.SYSTEM_ERROR, error);
  }
};

export const signupKakao = async () => {
  const supabase = createClient();

  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    if (error) {
      console.error(ERROR_MESSAGES.KAKAO_SIGNUP_ERROR, error);
    }
  } catch (error) {
    console.error(ERROR_MESSAGES.SYSTEM_ERROR, error);
  }
};
