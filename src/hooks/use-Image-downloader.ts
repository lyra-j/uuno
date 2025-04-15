export const useImageDownloader = (onSuccess?: () => void) => {
  const handleSaveImg = (data: any, filename = 'text.jpg') => {
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
  };

  return { handleSaveImg };
};
