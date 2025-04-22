import Konva from 'konva';
import { uploadToSupabaseStorage } from '@/apis/upload-to-storage';

/**
 * Konva Stage를 Blob으로 바로 만들고,
 * Supabase Storage에 업로드한 뒤 URL을 반환합니다.
 *
 * pixelRatio 옵션은 사용하지 않고, mimeType 문자열만 전달합니다.
 */
export const uploadStageImage = async (
  stage: Konva.Stage,
  userId: string,
  lastSlug: string,
  label: 'front' | 'back'
): Promise<string> => {
  // 1) toBlob → Promise<Blob> 래핑
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

  // 2) 업로드 경로 / 파일명 생성
  const fileName = `${label}_${lastSlug}_img.png`;
  const filePath = `${userId}/${lastSlug}/${fileName}`;

  // 3) Supabase Storage에 업로드 후 public URL 반환
  return uploadToSupabaseStorage('cards', filePath, blob);
};
