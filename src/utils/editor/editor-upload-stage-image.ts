import Konva from 'konva';
import { dataURLToBlob } from './convert-dataurl-to-blob';
import { uploadToSupabaseStorage } from '@/apis/upload-to-storage';

/**
 * Konva Stage를 이미지로 변환 후 Supabase Storage에 업로드하고 URL 반환
 * @param stage Konva Stage 객체
 * @param userId 사용자 ID
 * @param lastSlug 명함 slug
 * @param label 이미지 라벨 (front | back)
 * @returns 업로드된 이미지의 public URL
 */
export const uploadStageImage = async (
  stage: Konva.Stage,
  userId: string,
  lastSlug: string,
  label: 'front' | 'back'
): Promise<string> => {
  const dataUrl = stage.toDataURL({ mimeType: 'image/png', pixelRatio: 2 });
  const blob = dataURLToBlob(dataUrl);
  const fileName = `${label}_${lastSlug}_img.png`;
  const filePath = `${userId}/${lastSlug}/${fileName}`;

  return uploadToSupabaseStorage('cards', filePath, blob);
};
