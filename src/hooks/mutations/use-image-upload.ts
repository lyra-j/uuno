import { uploadMultipleImages } from '@/apis/storage';
import { useMutation } from '@tanstack/react-query';

interface UploadMultipleImagesParams {
  files: File[];
  bucketName: string;
  userId: string;
}

export const useMultipleImageUpload = () => {
  return useMutation({
    mutationFn: (params: UploadMultipleImagesParams) =>
      uploadMultipleImages(params.files, params.bucketName, params.userId),
  });
};
