import { deleteAllFilesInFolder, uploadMultipleImages } from '@/apis/storage';
import { useMutation } from '@tanstack/react-query';

interface UploadMultipleImagesParams {
  files: File[];
  bucketName: string;
  userId: string;
}

/**
 * 여러 파일 업로드
 * @returns
 */
export const useMultipleImageUpload = () => {
  return useMutation({
    mutationFn: (params: UploadMultipleImagesParams) =>
      uploadMultipleImages(params.files, params.bucketName, params.userId),
  });
};

/**
 * 버컷 폴더 내 이미지 삭제
 * @returns
 */
export const useDeleteAllFiles = () => {
  return useMutation({
    mutationFn: ({
      bucketName,
      userId,
    }: {
      bucketName: string;
      userId: string;
    }) => deleteAllFilesInFolder(bucketName, userId),
  });
};
