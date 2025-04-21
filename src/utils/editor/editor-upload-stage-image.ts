import Konva from 'konva';
import { dataURLToBlob } from './convert-dataurl-to-blob';
import { uploadToSupabaseStorage } from '@/apis/upload-to-storage';

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
