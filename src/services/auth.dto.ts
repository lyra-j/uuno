'use server';

import { LoginType, SignupType } from '@/types/auth.type';
import { createClient } from '@/utils/supabase/server';

export async function login(value: LoginType) {
  const supabase = await createClient();

  try {
    const { error } = await supabase.auth.signInWithPassword(value);
    if (error) {
      console.log('로그인 에러', error);
      return { error };
    }
  } catch (error) {
    // redirect('/error');
    console.log('로그인 에러', error);
  }
  console.log('로그인 성공');

  // revalidatePath('/', 'layout');
  // redirect('/account');
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
      if (error.status === 429) {
        console.log('요청이 너무 많습니다. 잠시 후 다시 시도해주세요', error);
      } else {
        console.log('회원가입 실패', error);
      }
    }

    if (data.user) {
      const userId = data.user?.id;

      // public users에 데이터 삽입
      const { error: insertError } = await supabase.from('users').insert([
        {
          id: userId,
          nick_name: value.nick_name,
          email: value.email,
        },
      ]);
      if (insertError) {
        console.log('users테이블 데이터 삽입 실패', insertError);
      }

      // 회원가입 후 자동 로그인
      const { error } = await supabase.auth.signInWithPassword(
        value as LoginType
      );

      if (error) {
        console.log('로그인 에러', error);
        return { error };
      }
    }
  } catch (error) {
    // redirect('/error');
    console.log('회원가입 실패', error);
  }

  // revalidatePath('/', 'layout');
  // redirect('/account');
}
