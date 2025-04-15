import {
  downloadCardImage,
  downloadQrImage,
  endSession,
  logInteraction,
} from '@/apis/interaction';
import { useMutation } from '@tanstack/react-query';
import { formatToDateString } from '@/utils/interaction/format-date';

interface SessionData {
  sessionId: string;
  startedAt: string;
}

/**
 * 세션 초기화
 *
 * @param startedAt 세션 시작 시간
 * @returns
 */
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

/**
 * 세션 종료를 위한 훅
 */
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

/**
 * 사용자 인터랙션 로깅
 *
 * @param cardId 명함 ID
 * @param viewerIp 사용자 IP
 * @param source 접근 출처 (direct, qr, link, tag 등)
 * @param startedAtDate 시작 시간
 * @returns
 */
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
        source: source as 'direct' | 'qr' | 'link' | 'tag' | null,
      });
    },
  });
};

/**
 * 명함 이미지 다운로드
 */
export const useDownloadCardImageMutation = (
  cardId: string,
  fileName: string
) => {
  return useMutation({
    mutationFn: () => downloadCardImage(cardId, fileName),
  });
};

/**
 * 명함 이미지 다운로드
 */
export const useDownloadQrImageMutation = (
  cardId: string,
  fileName: string
) => {
  return useMutation({
    mutationFn: () => downloadQrImage(cardId, fileName),
  });
};
