'use server';

import {
  COMPLETE_MESSAGE,
  ERROR_MESSAGES,
  VALIDATE,
} from '@/constants/auth.messages.constant';
import { ROUTES } from '@/constants/path.constant';
import { TABLES } from '@/constants/tables.constant';
import { LoginType, SignupType } from '@/types/auth.type';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

/**
 * 로그인
 * @param value  : {email : "", password : ""}
 */
export const login = async (value: LoginType) => {
  const supabase = await createClient();

  try {
    const { error } = await supabase.auth.signInWithPassword(value);
    if (error) {
      return { success: false, message: VALIDATE.INVALID_USER + error };
    }
  } catch (error) {
    // redirect('/error');
    return { success: false, message: ERROR_MESSAGES.SYSTEM_ERROR };
  }
  await supabase.auth.getUser();
  return { success: true, message: COMPLETE_MESSAGE.LOGIN_COMPLETE };
};

/**
 * 회원가입
 * @param value : {email : "", password : "", nick_name : ""}
 */
export const signup = async (value: SignupType) => {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase.auth.signUp({
      email: value.email,
      password: value.password,
      options: {
        data: {
          nick_name: value.nick_name,
        },
      },
    });

    if (error) {
      console.error(ERROR_MESSAGES.SIGNUP_ERROR, error);
    }

    if (data.user) {
      const userId = data.user?.id;

      // public users에 데이터 삽입
      const { error: insertError } = await supabase.from(TABLES.USERS).insert([
        {
          id: userId,
          nick_name: value.nick_name,
          email: value.email,
        },
      ]);
      if (insertError) {
        console.error(ERROR_MESSAGES.USERS_TABLE_INSERT_ERROR, insertError);
      }

      // 회원가입 후 자동 로그인 (자동 로그인 추후 고민)
      const { error } = await supabase.auth.signInWithPassword(
        value as LoginType
      );

      if (error) {
        console.error(ERROR_MESSAGES.LOGIN_ERROR, error);
      }
    }
  } catch (error) {
    // redirect('/error');
    console.error(ERROR_MESSAGES.SYSTEM_ERROR, error);
  }

  revalidatePath(ROUTES.HOME, 'layout');
  redirect(ROUTES.HOME);
};

/**
 * 로그아웃
 */
export const logout = async () => {
  const supabase = await createClient();

  try {
    const { data } = await supabase.auth.getUser();

    if (data.user) {
      await supabase.auth.signOut();
      return { success: true, message: COMPLETE_MESSAGE.LOGOUT_COMPLETE };
    }
    revalidatePath(ROUTES.HOME, 'layout');
    return { success: false, message: ERROR_MESSAGES.LOGIN_ERROR };
  } catch (error) {
    return { success: false, message: ERROR_MESSAGES.SYSTEM_ERROR };
  }
};
