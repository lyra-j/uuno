import { DB_COLUMNS, TABLES } from '@/constants/tables.constant';
import { createClient } from '@/utils/supabase/client';

interface DonutChartDataParams {
  interactionData: string[];
  interactionCount: number[];
}

export const getUserClickDonutChartData = async (
  card_id: string
): Promise<DonutChartDataParams | undefined> => {
  // 한글 매핑 객체
  const koreanLabels = {
    vcard: '연락처 저장',
    image: '이미지 저장',
    kakao: '카카오톡',
    github: '깃허브',
    notion: '노션',
    instagram: '인스타',
    linkedin: '링크드인',
    youtube: '유튜브',
  };

  // 원하는 표시 순서
  const displayOrder = [
    'vcard',
    'image',
    'kakao',
    'github',
    'notion',
    'instagram',
    'linkedin',
    'youtube',
  ];

  const supabase = createClient();

  // 카드 ID 기준으로 element_name만 가져오기
  const { data: rawData, error: rawError } = await supabase
    .from(TABLES.CARD_VIEWS)
    .select(DB_COLUMNS.CARD_VIEWS.ELEMENT_NAME)
    .eq(DB_COLUMNS.CARD_VIEWS.CARD_ID, card_id);

  if (rawError) {
    console.error('Error fetching raw data:', rawError);
    return { interactionCount: [], interactionData: [] };
  }

  // element_name 별로 카운트하기
  const countsMap = new Map<string, number>();
  rawData?.forEach((item) => {
    const element = item.element_name;
    if (element && displayOrder.includes(element)) {
      countsMap.set(element, (countsMap.get(element) || 0) + 1);
    }
  });

  // displayOrder 기준으로 정렬 및 데이터 추출
  const orderedElements = displayOrder.filter((key) => countsMap.has(key));
  const interactionData = orderedElements.map(
    (key) => koreanLabels[key as keyof typeof koreanLabels]
  );
  const interactionCount = orderedElements.map(
    (key) => countsMap.get(key) || 0
  );

  return {
    interactionData,
    interactionCount,
  };
};
