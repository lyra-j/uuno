import { createClient } from '@/utils/supabase/client';
import { STORAGE } from '@/constants/tables.constant';

export const getPublicUrlsFromStorage = (
  paths: Array<string | null>
): Array<string | null> => {
  const supabase = createClient();

  return paths.map((path: string | null): string | null => {
    if (!path) return null;
    const {
      data: { publicUrl },
    } = supabase.storage.from(STORAGE.UPLOADIMG).getPublicUrl(path);

    return publicUrl;
  });
};
