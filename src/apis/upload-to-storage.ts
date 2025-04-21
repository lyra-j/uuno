import { createClient } from '@/utils/supabase/client';

export const uploadToSupabaseStorage = async (
  bucket: string,
  path: string,
  blob: Blob,
  options?: {
    upsert?: boolean;
    cacheControl?: string;
    contentType?: string;
  }
): Promise<string> => {
  const supabase = createClient();

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, blob, {
      upsert: options?.upsert ?? true,
      cacheControl: options?.cacheControl ?? '3600',
      contentType: options?.contentType ?? 'image/png',
    });

  if (error) throw new Error(error.message);

  const { publicUrl } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path).data;

  return publicUrl;
};
