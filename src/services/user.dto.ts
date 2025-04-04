import { ERROR_MESSAGES } from '@/constants/messages';
import { TABLES } from '@/constants/tables';
import { createClient } from '@/utils/supabase/server';

interface UserDataProps {
  userId: string;
  nick_name: string;
  email: string;
}

interface SingleDataProps<T> {
  table: (typeof TABLES)[keyof typeof TABLES];
  field: string;
  value: string;
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
    console.log(ERROR_MESSAGES.SYSTEM_ERROR, error);
    return { success: false };
  }
};

export const getSingleData = async <T>({
  table,
  field,
  value,
}: SingleDataProps<T>) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .eq(field, value)
    .single<T>();

  return { data, error };
};
