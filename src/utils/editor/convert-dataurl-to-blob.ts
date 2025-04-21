export const dataURLToBlob = (dataUrl: string): Blob => {
  // Data URL을 쉼표(,) 기준으로 나눔
  // arr[0]: MIME 타입 등 메타데이터
  // arr[1]: base64 인코딩된 실제 데이터
  const arr = dataUrl.split(',');

  // 메타데이터에서 MIME 타입 추출 (예: image/png)
  const mimeMatch = arr[0].match(/:(.*?);/);
  if (!mimeMatch) throw new Error('유효하지 않은 Data URL');

  // 추출된 MIME 타입 (예: "image/png")
  const mime = mimeMatch[1];

  // base64로 인코딩된 문자열을 디코딩 → 이진 문자열로 변환
  const bstr = atob(arr[1]);

  // 이진 문자열을 바이트 배열로 변환
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) u8arr[n] = bstr.charCodeAt(n); // 각 문자의 UTF-16 코드를 저장

  // Uint8Array를 기반으로 Blob 생성 (MIME 타입 설정)
  return new Blob([u8arr], { type: mime });
};
