import Konva from 'konva';
import { v4 as uuidv4 } from 'uuid';
import { createClient } from '@/utils/supabase/client';

export const uploadStageImage = async (
  stage: Konva.Stage,
  userId: string,
  label: 'front' | 'back'
): Promise<string> => {
  const supabase = createClient();

  const dataUrl = stage.toDataURL({ mimeType: 'image/png', pixelRatio: 2 });

  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) u8arr[n] = bstr.charCodeAt(n);
  const blob = new Blob([u8arr], { type: mime });

  const fileName = `${label}_${uuidv4()}.png`;
  const filePath = `${userId}/${fileName}`;

  const { data, error } = await supabase.storage
    .from('cards')
    .upload(filePath, blob, {
      upsert: false,
      cacheControl: '3600',
      contentType: 'image/png',
    });

  if (error) throw new Error(error.message);

  const { publicUrl } = supabase.storage
    .from('cards')
    .getPublicUrl(data.path).data;

  return publicUrl;
};
