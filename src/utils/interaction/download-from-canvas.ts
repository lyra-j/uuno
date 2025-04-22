/**
 * 캔버스 요소로부터 PNG 이미지 데이터를 생성하고,
 * 자동으로 파일 다운로드를 트리거하는 유틸 함수
 *
 * @param canvas   QR 코드나 기타 이미지를 렌더링한 HTMLCanvasElement
 * @param filename 다운로드할 파일명 (예: 'card-qr.png')
 */
export const downloadPngFromCanvas = (
  canvas: HTMLCanvasElement,
  filename: string
) => {
  // 캔버스로부터 PNG 포맷의 Data URL(베이스64 문자열) 생성
  const pngUrl = canvas
    .toDataURL('image/png')
    // 브라우저가 링크를 여는 대신 순수 다운로드로 인식하도록 MIME 타입 변경
    .replace('image/png', 'image/octet-stream');
  const link = document.createElement('a');
  // href에 Data URL 할당
  link.href = pngUrl;
  // download 속성에 파일명 지정
  link.download = filename;
  // 문서에 추가하지 않고도 클릭 이벤트만으로 다운로드 실행
  link.click();
};
