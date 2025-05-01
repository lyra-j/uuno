import { DB_COLUMNS, STORAGE, TABLES } from '@/constants/tables.constant';
import { CardData } from '@/types/cards.type';
import { CardContent } from '@/types/editor.type';
import { formatToDateString } from '@/utils/interaction/format-date';
import { createClient } from '@/utils/supabase/client';

interface LogInteractionParams {
  cardId: string;
  elementName: string | null;
  type: 'click' | 'save' | null | undefined;
  startedAt: string;
  viewerIp: string;
  sessionId: string;
  source: 'direct' | 'qr' | 'link' | 'tag' | null;
}

/**
 * 사용자 IP 주소 조회
 */
export const getIpAddress = async (): Promise<string> => {
  try {
    const res = await fetch('https://api.ipify.org?format=json');
    if (!res.ok) {
      throw new Error(`IP 주소 조회 실패: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    if (!data || !data.ip) {
      throw new Error('IP 주소가 응답에 포함되어 있지 않습니다.');
    }
    return data.ip;
  } catch (error) {
    console.error('IP 주소 조회 중 오류 발생:', error);
    throw new Error('IP 주소를 가져오는 데 실패했습니다.');
  }
};

/**
 * 사용자 인터랙션 로깅
 */
export const logInteraction = async ({
  cardId,
  elementName,
  type,
  startedAt,
  viewerIp,
  sessionId,
  source,
}: LogInteractionParams) => {
  const now = formatToDateString(new Date());
  const supabase = createClient();

  // 세션 ID로 기존 데이터 확인
  const { data: existingData, error: checkError } = await supabase
    .from(TABLES.CARD_VIEWS)
    .select('*')
    .eq(DB_COLUMNS.CARD_VIEWS.SESSION_ID, sessionId)
    .single();

  if (checkError && checkError.code !== 'PGRST116') {
    throw checkError;
  }

  // 이미 존재하는 세션인 경우 업데이트
  if (existingData) {
    const { error: updateError } = await supabase
      .from(TABLES.CARD_VIEWS)
      .update({
        element_name: elementName,
        occurred_at: now,
        end_at: now,
        type: type,
      })
      .eq(DB_COLUMNS.CARD_VIEWS.SESSION_ID, sessionId);

    if (updateError) throw updateError;
    return existingData;
  }

  // 새로운 세션인 경우에만 insert
  const { data, error } = await supabase.from(TABLES.CARD_VIEWS).insert({
    card_id: cardId,
    element_name: elementName,
    occurred_at: now,
    started_at: startedAt,
    end_at: now,
    source: source,
    type: type,
    viewer_id: null,
    viewer_ip: viewerIp,
    session_id: sessionId,
  });

  if (error) throw error;
  return data;
};

/**
 * 세션 종료 처리
 */
export const endSession = async (sessionId: string, reason: string) => {
  const now = formatToDateString(new Date());
  const supabase = createClient();

  if (reason === 'page-exit') {
    navigator.sendBeacon(
      '/api/log-exit',
      JSON.stringify({
        session_id: sessionId,
        end_at: now,
      })
    );
    return { success: true };
  } else {
    const { error } = await supabase
      .from(TABLES.CARD_VIEWS)
      .update({ end_at: now })
      .eq(DB_COLUMNS.CARD_VIEWS.SESSION_ID, sessionId);

    if (error) throw error;
    return { success: true };
  }
};

/**
 * 명함 이미지 다운로드
 */
export const downloadCardImage = async (
  userId: string,
  slug: string,
  fileNames: Array<string>
) => {
  const downloadPromises = fileNames.map(async (fileName) => {
    const supabase = createClient();
    const { data, error } = await supabase.storage
      .from(STORAGE.CARDS)
      .download(`${userId}/${slug}/${fileName}`);

    if (error) throw error;

    return { data, fileName };
  });

  // 모든 다운로드가 완료될 때까지 기다림
  return Promise.all(downloadPromises);
};

/**
 * 명함 QR이미지 다운로드
 */
export const downloadQrImage = async (cardId: string, fileName: string) => {
  const supabase = createClient();
  const { data, error } = await supabase.storage
    .from(STORAGE.QRCODES)
    .download(`${cardId}/${fileName}`);

  if (error) throw error;

  return data;
};

/**
 * 명함 콘텐츠 받아오기
 */
export const getCardContent = async (slug: string): Promise<CardData> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from(TABLES.CARDS)
    .select('*')
    .eq(DB_COLUMNS.CARDS.SLUG, slug)
    .single();

  if (error) throw error;

  return {
    ...data,
    content: data.content as CardContent,
  } as CardData;
};
