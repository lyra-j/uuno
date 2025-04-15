// 이미지 다운로드
export function downloadImage(
  data: BlobPart,
  filename: string,
  type = 'image/jpeg'
) {
  const blob = new Blob([data], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
