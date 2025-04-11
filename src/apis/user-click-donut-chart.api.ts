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
  };

  // 원하는 표시 순서
  const displayOrder = [
    'vcard',
    'image',
    'kakao',
    'github',
    'notion',
    'instagram',
  ];

  const supabase = await createClient();
  const { data, error } = await supabase
    .from(TABLES.CARD_VIEWS)
    .select(DB_COLUMNS.CARD_VIEWS.ELEMENT_NAME)
    .eq(DB_COLUMNS.CARD_VIEWS.CARD_ID, card_id);

  if (!data || data.length === 0)
    return { interactionCount: [], interactionData: [] };
  const selectedData = data.map((e) => e.element_name);

  const uniqueArr = Array.from(new Set(selectedData)).filter(
    (e): e is string => e !== null
  );

  if (error) {
    console.error('Error fetching data:', error);
  }
  const responses = await Promise.all(
    uniqueArr
      .filter((e): e is string => e !== null)
      .map((e) =>
        supabase
          .from(TABLES.CARD_VIEWS)
          .select('*', { count: 'exact', head: true })
          .eq(DB_COLUMNS.CARD_VIEWS.ELEMENT_NAME, e)
          .eq(DB_COLUMNS.CARD_VIEWS.CARD_ID, card_id)
      )
  );
  const results = responses
    .map((response) => response.count)
    .filter((count): count is number => count !== null);
  if (responses.some((response) => response.error)) {
    console.error('Error fetching data:', responses);
  }
  const mappedLabels = displayOrder
    .filter((key) => uniqueArr.includes(key))
    .map((key) => koreanLabels[key as keyof typeof koreanLabels]);
  console.log('mappedLabels:', mappedLabels);

  return {
    interactionData: mappedLabels,
    interactionCount: results,
  };
};
