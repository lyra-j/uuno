'use server';

import { TABLES } from '@/constants/tables';
import { ERROR_MESSAGES } from '@/constants/messages';
import { User } from '@/types/supabase.type';
import { getSingleData } from '@/services/common.dto';

export const duplicateEmailValidation = async (email: string) => {
  const { data, error } = await getSingleData<User>({
    table: TABLES.USERS,
    field: 'email',
    value: email,
  });

  /** 중복 아님 */
  if (error) {
    return false;
  }

  /** 중복 */
  console.error(ERROR_MESSAGES.EMAIL_DUPLICATED_ERROR, error);
  return !!data;
};

export const duplicateNickNameValidation = async (nick_name: string) => {
  const { data, error } = await getSingleData<User>({
    table: TABLES.USERS,
    field: 'nick_name',
    value: nick_name,
  });

  /** 중복 아님 */
  if (error) {
    return false;
  }

  /** 중복 */
  console.error(ERROR_MESSAGES.NICKNAME_DUPLICATED_ERROR, error);
  return !!data;
};
