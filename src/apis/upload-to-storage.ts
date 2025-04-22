import { createClient } from '@/utils/supabase/client';
import { v4 } from 'uuid';

/**
 * Supabase Storage에 파일을 업로드하고 공개 URL을 반환합니다.
 * @param bucket 업로드할 버킷 이름
 * @param path 저장될 파일 경로
 * @param blob 업로드할 파일 데이터 (Blob)
 * @param options 업로드 옵션 (upsert, cacheControl, contentType)
 * @returns 업로드된 파일의 공개 URL
 * @throws 유효하지 않은 입력값이나 업로드 실패 시 오류
 */
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

  if (error) {
    if (error.message.includes('storage quota')) {
      throw new Error('스토리지 용량 초과: ' + error.message);
    } else if (error.message.includes('unauthorized')) {
      throw new Error('접근 권한 없음: ' + error.message);
    } else {
      throw new Error('파일 업로드 실패: ' + error.message);
    }
  }

  if (!data?.path) {
    throw new Error('업로드 응답에 파일 경로가 없습니다.');
  }

  const { data: publicUrlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path);

  if (!publicUrlData?.publicUrl) {
    throw new Error('public url 가져오기 실패');
  }

  return `${publicUrlData.publicUrl}?v=${v4()}`;
};
