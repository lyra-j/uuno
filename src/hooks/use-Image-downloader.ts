export const useImageDownloader = (onSuccess?: () => void) => {
  const handleSaveImg = (data: Blob | ArrayBuffer, filename = 'text.jpg') => {
    try {
      const blob = new Blob([data], { type: 'image/jpeg' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('이미지 다운로드 중 오류가 발생했습니다:', error);
    }
  };

  return { handleSaveImg };
};
