'use server';

import { COMPLETE_MESSAGE, ERROR_MESSAGES } from '@/constants/messages';
import { ROUTES } from '@/constants/path';
import { TABLES } from '@/constants/tables';
import { LoginType, SignupType } from '@/types/auth.type';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function login(value: LoginType) {
  const supabase = await createClient();

  try {
    const { error } = await supabase.auth.signInWithPassword(value);
    if (error) {
      console.error(ERROR_MESSAGES.LOGIN_ERROR, error);
    }
  } catch (error) {
    // redirect('/error');
    console.error(ERROR_MESSAGES.LOGIN_ERROR, error);
  }
  console.log(COMPLETE_MESSAGE.LOGIN_COMPLETE);

  revalidatePath(ROUTES.HOME, 'layout');
  redirect(ROUTES.HOME);
}

export async function signup(value: SignupType) {
  const supabase = await createClient();

  // 회원가입
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

      // 회원가입 후 자동 로그인
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
}
