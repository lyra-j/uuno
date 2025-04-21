import { uploadToSupabaseStorage } from '@/apis/upload-to-storage';
import Konva from 'konva';

export const uploadStageImage = async (
  stage: Konva.Stage,
  userId: string,
  lastSlug: string,
  label: 'front' | 'back'
): Promise<string> => {
  const dataUrl = stage.toDataURL({ mimeType: 'image/png', pixelRatio: 2 });

  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) u8arr[n] = bstr.charCodeAt(n);
  const blob = new Blob([u8arr], { type: mime });

  const fileName = `${label}_${lastSlug}_img.png`;
  const filePath = `${userId}/${lastSlug}/${fileName}`;

  return uploadToSupabaseStorage('cards', filePath, blob);
};
