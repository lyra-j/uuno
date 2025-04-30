import { createClient } from '@/utils/supabase/client';

export const userNameUpdate = async (changeValue: string) => {
  const supabase = createClient();

  await supabase.auth.updateUser({
    data: {
      full_name: changeValue,
    },
  });
};
