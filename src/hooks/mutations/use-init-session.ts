import {
  downloadCardImage,
  downloadQrImage,
  endSession,
  logInteraction,
} from '@/apis/interaction';
import { useMutation } from '@tanstack/react-query';
import { formatToDateString } from '@/utils/interaction/format-date';
import {
  checkSessionTimeout,
  getEffectiveSessionId,
  initSession,
  updateSessionActivity,
} from '@/utils/interaction/session-util';

interface SessionData {
  sessionId: string;
  startedAt: string;
}

/**
 * 세션 초기화
 */
export const useInitSessionMutation = (startedAt: Date) => {
  return useMutation({
    mutationFn: async (params: {
      cardId: string;
      viewerIp: string;
      source: 'direct' | 'qr' | 'link' | 'tag' | null;
    }): Promise<SessionData> => {
      if (!startedAt) throw new Error('시작 시간이 필요합니다.');

      // 1. 세션 타임아웃 체크
      if (checkSessionTimeout()) {
        const result = initSession(startedAt);
        return {
          sessionId: result.sessionId,
          startedAt: result.startedAt,
        };
      }

      // 2. 기존 세션 확인
      const existingSessionId = getEffectiveSessionId();
      if (existingSessionId) {
        return {
          sessionId: existingSessionId,
          startedAt: formatToDateString(startedAt),
        };
      }

      // 3. 새 세션 생성
      const result = initSession(startedAt);
      return {
        sessionId: result.sessionId,
        startedAt: result.startedAt,
      };
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
 */
export const useLogInteractionMutation = (
  cardId: string,
  viewerIp: string,
  source: 'direct' | 'qr' | 'link' | 'tag' | null | undefined,
  startedAtDate: Date | null
) => {
  return useMutation({
    mutationFn: async ({
      elementName,
      type,
    }: {
      elementName: string | null;
      type: 'click' | 'save' | null | undefined;
    }) => {
      if (!viewerIp || !cardId) {
        throw new Error('Missing required data');
      }
      if (!startedAtDate) {
        throw new Error('startedAt is required');
      }

      const sessionId = getEffectiveSessionId();
      if (!sessionId) {
        throw new Error('No session ID available');
      }

      if (checkSessionTimeout()) {
        throw new Error('Session timed out');
      }

      updateSessionActivity();

      const result = await logInteraction({
        cardId,
        elementName,
        type,
        startedAt: formatToDateString(startedAtDate),
        viewerIp,
        sessionId: sessionId,
        source: source as 'direct' | 'qr' | 'link' | 'tag' | null,
      });

      if (!result) {
        throw new Error('Failed to log interaction');
      }

      return result;
    },
  });
};

/**
 * 명함 이미지 다운로드
 */
export const useDownloadCardImageMutation = (
  userId: string,
  slug: string,
  fileName: Array<string>
) => {
  return useMutation({
    mutationFn: () => downloadCardImage(userId, slug, fileName),
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
