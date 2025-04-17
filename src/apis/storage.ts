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
      const { error } = await supabase.storage
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

/**
 * 특정 폴더의 스토리지 사용량을 조회
 * @param buckName
 * @param folderPath
 * @returns
 */
export const getFolderSize = async (buckName: string, folderPath: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase.storage
    .from(buckName)
    .list(folderPath);

  if (error) throw error;

  let totalBytes = 0;

  if (data && data.length > 0) {
    for (const file of data) {
      if (!file.id) continue;

      totalBytes += file.metadata?.size || 0;
    }
  }

  // 바이트를 GB로 변환 (1GB = 1,073,741,824 바이트)
  const sizeInGB = totalBytes / 1073741824;

  return { totalBytes, sizeInGB, fileCount: data?.length || 0 };
};

/**
 * 특정 버킷 폴더의 모든 파일 삭제
 * @param buckname
 * @param folderPath
 * @returns
 */
export const deleteAllFilesInFolder = async (
  buckname: string,
  folderPath: string
) => {
  const supabase = await createClient();

  const { data, error } = await supabase.storage
    .from(buckname)
    .list(folderPath);

  if (error) throw error;

  if (data && data.length > 0) {
    const filePath = data.map((file) => `${folderPath}/${file.name}`);

    // 일괄 삭제
    const { error: deleteError } = await supabase.storage
      .from(buckname)
      .remove(filePath);

    if (deleteError) throw error;

    return {
      success: true,
      count: filePath.length,
    };
  }
  return {
    success: true,
    count: 0,
  };
};

/**
 * 특정 사용자의 폴더에 있는 이미지 목록 가져오기
 * @param bucketName
 * @param userId
 * @returns
 */
export const fetchUserImages = async (bucketName: string, userId: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase.storage.from(bucketName).list(userId, {
    sortBy: { column: 'created_at', order: 'desc' }, // 최신순 정렬
  });

  if (error) throw error;

  if (!data || data.length === 0) {
    return [];
  }

  const imageFiles = data.filter(
    (file) =>
      !file.metadata?.mimetype || file.metadata.mimetype.startsWith('image/')
  );

  const images = imageFiles.map((file) => {
    // 파일 URL 생성
    const { data: urlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(`${userId}/${file.name}`);

    return {
      id: file.id,
      name: file.name,
      previewUrl: urlData.publicUrl,
      size: file.metadata?.size || 0,
      createdAt: file.created_at,
      path: `${userId}/${file.name}`,
    };
  });

  return images;
};
