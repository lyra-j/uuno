export const useImageDownloader = () => {
  const handleSaveImg = (data: Blob | ArrayBuffer, filename = 'image.jpg') => {
    try {
      const blob =
        data instanceof Blob ? data : new Blob([data as ArrayBuffer]);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename || 'download';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('이미지 다운로드 중 오류가 발생했습니다:', error);
    }
  };

  return { handleSaveImg };
};
