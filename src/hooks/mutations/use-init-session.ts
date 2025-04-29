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
  clearSessionData,
  getEffectiveSessionId,
  initSession,
  isStorageAvailable,
  updateSessionActivity,
} from '@/utils/interaction/session-util';
import { useState } from 'react';

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
export const useInitSessionMutation = (startedAt: Date) => {
  return useMutation({
    mutationFn: async (params: {
      cardId: string;
      viewerIp: string;
      source: 'direct' | 'qr' | 'link' | 'tag' | null;
    }): Promise<SessionData> => {
      const { cardId, viewerIp, source } = params;
      if (!startedAt) throw new Error('시작 시간이 필요합니다.');

      const result = initSession(startedAt);

      if (result.isNewSession && cardId && viewerIp) {
        await logInteraction({
          cardId,
          elementName: null,
          type: null,
          startedAt: formatToDateString(startedAt),
          viewerIp,
          sessionId: result.sessionId,
          source,
        });
      }
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
 *
 * @param cardId 명함 ID
 * @param viewerIp 사용자 IP
 * @param source 접근 출처 (direct, qr, link, tag 등)
 * @param startedAtDate 시작 시간
 * @returns
 */
export const useLogInteractionMutation = (
  cardId: string,
  viewerIp: string,
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

      if (!startedAtDate) {
        throw new Error('startedAt is required to initialize a session');
      }

      const sessionId = getEffectiveSessionId();

      if (!sessionId) throw new Error('No session ID available');

      if (checkSessionTimeout()) {
        throw new Error('Session timed out');
      }

      updateSessionActivity();

      return logInteraction({
        cardId,
        elementName,
        type,
        startedAt: formatToDateString(startedAtDate),
        viewerIp,
        sessionId: sessionId,
        source: source as 'direct' | 'qr' | 'link' | 'tag' | null,
      });
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
