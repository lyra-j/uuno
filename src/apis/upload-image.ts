import { createClient } from '@/utils/supabase/client';
import { v4 as uuidv4 } from 'uuid';

/**
 * 이미지 업로드
 * @param file
 * @param bucketName
 * @param userId
 * @returns
 */
export const uploadMultipleImages = async (
  files: File[],
  bucketName: string = 'images',
  userId: string
) => {
  try {
    const uploadPromises = files.map(async (file) => {
      const supabase = await createClient();
      // 고유한 파일명 생성
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;

      // userId/fileName 형식으로 파일 경로 설정
      const filePath = `${userId}/${fileName}`;

      // 파일 업로드
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) throw error;

      return {
        path: filePath,
        fileName: file.name,
        size: file.size,
        type: file.type,
      };
    });

    // 모든 파일 업로드 병렬 실행
    const results = await Promise.all(uploadPromises);
    return results;
  } catch (error) {
    console.error('다중 이미지 업로드 오류:', error);
    throw error;
  }
};
