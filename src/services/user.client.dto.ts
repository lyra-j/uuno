'use client';
import { ERROR_MESSAGES } from '@/constants/auth.messages.constant';
import { createClient } from '@/utils/supabase/client';

export const getUserDataClient = async () => {
  const supabase = createClient();
  try {
    const { data, error: getUserError } = await supabase.auth.getUser();

    if (getUserError) {
      return {
        user: null,
        message: ERROR_MESSAGES.GET_USER_DATA_ERROR + getUserError,
      };
    }

    return { user: data.user, message: null };
  } catch (error) {
    return { user: null, message: ERROR_MESSAGES.SYSTEM_ERROR };
  }
};
