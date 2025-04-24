import { TABLES } from '@/constants/tables.constant';
import { createClient } from '@/utils/supabase/client';

interface SingleDataProps<T> {
  table: (typeof TABLES)[keyof typeof TABLES];
  field: string;
  value: string;
}

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
