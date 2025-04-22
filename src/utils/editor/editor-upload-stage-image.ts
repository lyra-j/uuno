import Konva from 'konva';
import { uploadToSupabaseStorage } from '@/apis/upload-to-storage';

/**
 * - mimeType: 'image/png'으로 설정
 * - pixelRatio: 2로 지정하여 고해상도 이미지를 생성
 * @param stage    Konva.Stage 인스턴스
 * @param userId   업로드할 사용자 ID
 * @param lastSlug 명함의 고유 식별자(slug)
 * @param label    업로드 이미지 라벨 (front | back)
 * @returns        Supabase에 업로드된 이미지의 public URL
 */
export const uploadStageImage = async (
  stage: Konva.Stage,
  userId: string,
  lastSlug: string,
  label: 'front' | 'back'
): Promise<string> => {
  const blob: Blob = await new Promise<Blob>((resolve, reject) => {
    stage.toBlob({
      mimeType: 'image/png',
      pixelRatio: 2,
      callback: (b: Blob | null) => {
        if (b) resolve(b);
        else reject(new Error('Konva.toBlob 반환값이 null입니다.'));
      },
    });
  });

  const fileName = `${label}_${lastSlug}_img.png`;
  const filePath = `${userId}/${lastSlug}/${fileName}`;

  return uploadToSupabaseStorage('cards', filePath, blob);
};
