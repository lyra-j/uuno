'use server';

import { TABLES } from '@/constants/tables';
import { createClient } from './supabase/server';
import { ERROR_MESSAGES } from '@/constants/messages';

export const duplicateValidation = async (email: string) => {
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
