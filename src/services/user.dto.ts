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


