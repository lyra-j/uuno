import {
  downloadCardImage,
  endSession,
  logInteraction,
} from '@/apis/interaction';
import { formatToDateString } from '@/utils/interaction/format-date';
import { useMutation } from '@tanstack/react-query';

interface SessionData {
  sessionId: string;
  startedAt: string;
}

export const useInitSessionMutation = (startedAt: Date | null) => {
  return useMutation({
    mutationFn: async (): Promise<SessionData> => {
      const existingSessionId =
        sessionStorage.getItem('currentSessionId') ||
        localStorage.getItem('backup_session_id') ||
        null;

      if (!startedAt) {
        throw new Error('startedAt is required to initialize a session');
      }

      if (existingSessionId) {
        return {
          sessionId: existingSessionId,
          startedAt:
            sessionStorage.getItem('session_started_at') ||
            formatToDateString(startedAt),
        };
      }

      const startTime = formatToDateString(startedAt);
      const uuid = crypto.randomUUID();

      sessionStorage.setItem('currentSessionId', uuid);
      sessionStorage.setItem('session_started_at', startTime);
      localStorage.setItem('backup_session_id', uuid);

      return { sessionId: uuid, startedAt: startTime };
    },
  });
};

export const useEndSessionMutation = () => {
  return useMutation({
    mutationFn: ({
      reason,
      sessionId,
    }: {
      reason: string;
      sessionId: string;
    }) => {
      return endSession(sessionId, reason);
    },
  });
};

export const useLogInteractionMutation = (
  cardId: string,
  viewerIp: string | undefined,
  source: 'direct' | 'qr' | 'link' | 'tag' | null | undefined,
  startedAtDate: Date | null
) => {
  return useMutation({
    mutationFn: ({
      elementName,
      type,
    }: {
      elementName: string | null;
      type: 'click' | 'save' | null | undefined;
    }) => {
      if (!viewerIp || !cardId) throw new Error('Missing required data');

      const effectiveSessionId =
        sessionStorage.getItem('currentSessionId') ||
        localStorage.getItem('backup_session_id') ||
        null;
      if (!startedAtDate) {
        throw new Error('startedAt is required to initialize a session');
      }

      if (!effectiveSessionId) throw new Error('No session ID available');

      return logInteraction({
        cardId,
        elementName,
        type,
        startedAt: formatToDateString(startedAtDate),
        viewerIp,
        sessionId: effectiveSessionId,
        source: source as 'direct' | 'qr' | 'link' | 'iframe' | null,
      });
    },
  });
};

export const useDownloadCardImageMutation = () => {
  return useMutation({
    mutationFn: downloadCardImage,
  });
};
