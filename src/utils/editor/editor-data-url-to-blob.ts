/**
 * 데이터 URL 문자열을 Blob 객체로 변환합니다.
 *
 * @param dataURL - 변환할 데이터 URL 문자열
 * @returns Promise<Blob> - 변환된 Blob 객체를 반환하는 Promise
 */
export const dataURLtoBlob = (dataURL: string): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    try {
      const arr = dataURL.split(',');
      const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      resolve(new Blob([u8arr], { type: mime }));
    } catch (error) {
      reject(error);
    }
  });
};
