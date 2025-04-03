'use server';

import { TABLES } from '@/constants/tables';
import { createClient } from './supabase/server';
import { ERROR_MESSAGES } from '@/constants/messages';

export const duplicateEmailValidation = async (email: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from(TABLES.USERS)
    .select('*')
    .eq('email', email)
    .single();

  /** 중복 아님 */
  if (error) {
    return false;
  }

  /** 중복 */
  console.error(ERROR_MESSAGES.EMAIL_DUPLICATED_ERROR, error);
  return !!data;
};

export const duplicateNickNameValidation = async (nick_name: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from(TABLES.USERS)
    .select('*')
    .eq('nick_name', nick_name)
    .single();

  /** 중복 아님 */
  if (error) {
    return false;
  }

  /** 중복 */
  console.error(ERROR_MESSAGES.NICKNAME_DUPLICATED_ERROR, error);
  return !!data;
};
