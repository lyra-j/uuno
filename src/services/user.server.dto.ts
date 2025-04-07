import { ERROR_MESSAGES } from '@/constants/messages';
import { TABLES } from '@/constants/tables';
import { createClient } from '@/utils/supabase/server';

interface UserDataProps {
  userId: string;
  nick_name: string;
  email: string;
}

export const postUserData = async (userData: UserDataProps) => {
  const supabase = await createClient();
  try {
    const { error } = await supabase.from(TABLES.USERS).insert([
      {
        id: userData.userId,
        nick_name: userData.nick_name,
        email: userData.email,
      },
    ]);
    if (error) {
      return { success: false, error: error };
    }
    return { success: true };
  } catch (error) {
    console.error(ERROR_MESSAGES.SYSTEM_ERROR, error);
    return { success: false };
  }
};

export const getUserData = async () => {
  const supabase = await createClient();
  try {
    const { data, error: getUserError } = await supabase.auth.getUser();

    if (getUserError) {
      return {
        user: null,
        error: '사용자 데이터를 가져오기 못했습니다.' + getUserError.message,
      };
    }

    return { user: data.user, error: null };
  } catch (error) {
    return { user: null, error: ERROR_MESSAGES.SYSTEM_ERROR };
  }
};
