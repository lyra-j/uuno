import { DB_COLUMNS, STORAGE, TABLES } from '@/constants/tables.constant';
import { formatToDateString } from '@/utils/interaction/format-date';
import { createClient } from '@/utils/supabase/client';

interface LogInteractionParams {
  cardId: string;
  elementName: string | null;
  type: 'click' | 'save' | null | undefined;
  startedAt: string;
  viewerIp: string;
  sessionId: string;
  source: 'direct' | 'qr' | 'link' | 'iframe' | null;
}

export const getIpAddress = async (): Promise<string> => {
  const res = await fetch('https://api.ipify.org?format=json');
  const data = await res.json();
  return data.ip;
};

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

  const supabase = await createClient();

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

export const endSession = async (sessionId: string, reason: string) => {
  const now = formatToDateString(new Date());
  const supabase = await createClient();

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

export const downloadCardImage = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.storage
    .from(STORAGE.CARDS)
    .download('card_test.jpg');

  if (error) throw error;

  return data;
};
