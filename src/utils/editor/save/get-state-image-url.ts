import { useEditorStore } from '@/store/editor.store';
import Konva from 'konva';
import { waitForImagesToLoad } from '@/utils/editor/wait-to-load';
import { uploadStageImage } from '@/utils/editor/editor-upload-stage-image';

/**
 * 캔버스 앞/뒷면 이미지 업로드 후 URL 반환
 * @param stage
 * @param userId
 * @param slug
 * @param setCanvasFront
 * @returns
 */
export const getStageImageUrls = async (
  stage: Konva.Stage,
  userId: string,
  slug: string,
  setCanvasFront: (isFront: boolean) => void
): Promise<Record<'front' | 'back', string>> => {
  const originalSide = useEditorStore.getState().isCanvasFront;
  const urls: Record<'front' | 'back', string> = { front: '', back: '' };

  for (const side of ['front', 'back'] as const) {
    //앞 뒤 변경
    setCanvasFront(side === 'front');

    await new Promise((res) => setTimeout(res, 50));
    //대기
    await waitForImagesToLoad(stage);

    //로딩 완료되면 업로드
    urls[side] = await uploadStageImage(stage, userId, slug, side);
  }

  setCanvasFront(originalSide);
  return urls;
};
