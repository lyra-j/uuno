import { useEffect, useMemo, useRef, useState } from 'react';
import { useIpAddressQuery } from './queries/use-ip-address';
import {
  useEndSessionMutation,
  useInitSessionMutation,
  useLogInteractionMutation,
} from './mutations/use-init-session';
import {
  getEffectiveSessionId,
  storePendingSessionEnd,
  updateSessionActivity,
} from '@/utils/interaction/session-util';
import { useCardInteraction } from '@/hooks/queries/use-card-interaction';
import { useImageDownloader } from './use-Image-downloader';
import { useVCardSaver } from './use-vcard-saver';
import { SESSION_TIMEOUT } from '@/constants/session.constant';

interface InteractionProps {
  slug: string;
  source: 'direct' | 'qr' | 'link' | 'tag' | null | undefined;
  startedAt: Date | null;
}

interface SocialLink {
  elementName: string | null;
  url: string | URL | undefined;
}

/**
 * 인터랙션 추적 훅
 */
export const useInteractionTracker = ({
  slug,
  source,
  startedAt,
}: InteractionProps) => {
  const { data: ip } = useIpAddressQuery();
  const { data: cardId } = useCardInteraction(slug);

  // 세션 초기화
  const {
    mutate: initSession,
    isPending,
    isError,
    setSessionParams,
  } = useInitSessionMutation(startedAt || new Date());

  // 세션 종료
  const endSessionMutation = useEndSessionMutation();

  // 인터렉션 로깅
  const logInteractionMutation = useMemo(() => {
    return cardId && ip
      ? useLogInteractionMutation(cardId, ip, source, startedAt)
      : null;
  }, [cardId, ip, source, startedAt]);

  if (!logInteractionMutation) {
    throw new Error('Log interaction mutation is not initialized properly.');
  }
  // 활동 추적
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastActivityRef = useRef<Date | null>(null);
  const [sessionInitialized, setSessionInitialized] = useState(false);

  // 세션 초기화
  useEffect(() => {
    if (!ip || !cardId || sessionInitialized) return;

    // 세션 초기화 파라미터 설정
    setSessionParams({
      cardId,
      viewerIp: ip,
      source: source || null,
    });

    initSession(
      { cardId, viewerIp: ip, source: source || null },
      {
        onSuccess: () => {
          setSessionInitialized(true);
        },
      }
    );
  }, [ip, cardId, source, sessionInitialized]);

  /**
   * 활동 업데이트
   */
  const updateActivity = () => {
    lastActivityRef.current = new Date();

    // 세션 활동 시간 업데이트
    updateSessionActivity();

    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    // 비활동 타임아웃
    inactivityTimerRef.current = setTimeout(() => {
      const sessionId = getEffectiveSessionId();
      if (sessionId) {
        // 타임아웃 처리
        endSessionMutation.mutate({ reason: 'inactive', sessionId });

        // 세션 초기화
        setSessionInitialized(false);
      }
    }, SESSION_TIMEOUT);
  };

  // 활동 이벤트 설정
  useEffect(() => {
    // 세션 초기화 확인
    if (!sessionInitialized) return;

    const sessionId = getEffectiveSessionId();
    if (!sessionId) return;

    const activityEvents = [
      'mousemove',
      'mousedown',
      'keypress',
      'scroll',
      'touchstart',
    ];

    activityEvents.forEach((event) => {
      window.addEventListener(event, updateActivity);
    });

    updateActivity();

    // 페이지 언로드 처리
    const handleBeforeUnload = () => {
      const current_session_id = getEffectiveSessionId();
      if (current_session_id) {
        storePendingSessionEnd(current_session_id);
        endSessionMutation.mutate({
          reason: 'page-exit',
          sessionId: current_session_id,
        });
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      activityEvents.forEach((event) => {
        window.removeEventListener(event, updateActivity);
      });
      window.removeEventListener('beforeunload', handleBeforeUnload);

      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }

      const current_session_id = getEffectiveSessionId();
      if (current_session_id) {
        endSessionMutation.mutate({
          reason: 'route-change',
          sessionId: current_session_id,
        });
      }
    };
  }, [sessionInitialized]);

  /**
   * 이미지 저장 처리
   */
  const { handleSaveImg } = useImageDownloader();

  /**
   * vCard 저장 처리
   */
  const { handleSaveVCard } = useVCardSaver(() => {
    logInteractionMutation.mutate({ elementName: 'vcard', type: 'save' });
    updateActivity();
  });

  /**
   * 소셜 링크 클릭 처리
   */
  const handleClick = async ({ url, elementName }: SocialLink) => {
    logInteractionMutation.mutate({ elementName, type: 'click' });
    window.open(url, '_blank');
    updateActivity();
  };

  return {
    updateActivity,
    handleClick,
    handleSaveImg,
    handleSaveVCard,
    isLoading: !ip || isPending,
    isError: isError || logInteractionMutation.isError,
  };
};
