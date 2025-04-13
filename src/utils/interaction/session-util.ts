import { formatToDateString } from './format-date';

/**
 * 유효한 세션 ID를 가져옴
 */
export const getEffectiveSessionId = (): string | null => {
  return (
    sessionStorage.getItem('currentSessionId') ||
    localStorage.getItem('backup_session_id') ||
    null
  );
};

/**
 * 세션 종료 데이터 저장
 */
export const storePendingSessionEnd = (sessionId: string): void => {
  localStorage.setItem(
    'pending_end_session',
    JSON.stringify({
      session_id: sessionId,
      end_at: formatToDateString(new Date()),
      timestamp: Date.now(),
    })
  );
};

/**
 * 세션 데이터 삭제
 */
export const clearSessionData = (): void => {
  sessionStorage.removeItem('currentSessionId');
  sessionStorage.removeItem('session_started_at');
};
