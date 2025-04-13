import { formatToDateString } from './format-date';

export const getEffectiveSessionId = (): string | null => {
  return (
    sessionStorage.getItem('currentSessionId') ||
    localStorage.getItem('backup_session_id') ||
    null
  );
};

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

export const clearSessionData = (): void => {
  sessionStorage.removeItem('currentSessionId');
  sessionStorage.removeItem('session_started_at');
};
