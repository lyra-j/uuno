import { useEffect, useRef } from 'react';
import { useIpAddressQuery } from '@/hooks/queries/use-ip-address';
import {
  useInitSessionMutation,
  useLogInteractionMutation,
} from '@/hooks/mutations/use-init-session';
import { updateSessionActivity } from '@/utils/interaction/session-util';
import { useVCardSaver } from '@/hooks/use-vcard-saver';
import { useSearchParams } from 'next/navigation';
import { authStore } from '@/store/auth.store';
import { useImageDownloader } from '@/hooks/use-Image-downloader';

interface InteractionProps {
  isDetail: boolean;
  slug: string;
  source: 'direct' | 'qr' | 'link' | 'tag' | null | undefined;
  startedAt: Date | null;
}

interface SocialLink {
  elementName: string | null;
  url: string | URL | undefined;
}

const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30분
const MIN_UPDATE_INTERVAL = 5000; // 5초

/**
 * 인터랙션 추적 훅
 */
export const useInteractionTracker = ({
  isDetail,
  slug,
  source: sourceParam,
  startedAt,
}: {
  isDetail: boolean;
  slug: string;
  source: 'direct' | 'qr' | 'link' | 'tag';
  startedAt: Date;
}) => {
  const searchParams = useSearchParams();
  const sourceFromParams = searchParams.get('source') as
    | 'direct'
    | 'qr'
    | 'link'
    | 'tag'
    | null;
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastUpdateTimeRef = useRef<number>(0);
  const isUpdatingRef = useRef(false);
  const sessionStartTimeRef = useRef<Date>(new Date());
  const sessionInitializedRef = useRef(false);
  const sessionIdRef = useRef<string | null>(null);

  const { userId } = authStore();
  const isMyCard = userId === slug;

  const { data: ip } = useIpAddressQuery();

  const initSessionMutation = useInitSessionMutation(
    sessionStartTimeRef.current
  );
  const logInteractionMutation = useLogInteractionMutation(
    slug,
    ip || '',
    sourceFromParams || sourceParam,
    startedAt
  );

  const updateActivity = () => {
    const now = Date.now();
    if (
      now - lastUpdateTimeRef.current < MIN_UPDATE_INTERVAL ||
      isUpdatingRef.current
    ) {
      return;
    }

    isUpdatingRef.current = true;
    try {
      if (sessionIdRef.current) {
        updateSessionActivity();
        lastUpdateTimeRef.current = now;
      }
    } finally {
      isUpdatingRef.current = false;
    }
  };

  const handleInactivity = () => {
    if (sessionIdRef.current && !isMyCard) {
      logInteractionMutation.mutate({
        elementName: 'session-timeout',
        type: null,
      });
    }
  };

  useEffect(() => {
    if (isMyCard || !ip) return;

    const initializeSession = async () => {
      if (sessionInitializedRef.current) return;

      try {
        const result = await initSessionMutation.mutateAsync({
          cardId: slug,
          viewerIp: ip,
          source: sourceFromParams || sourceParam,
        });

        if (result?.sessionId) {
          sessionIdRef.current = result.sessionId;
          sessionInitializedRef.current = true;
          console.log('세션 초기화 성공:', result);
        }
      } catch (error) {
        console.error('세션 초기화 실패:', error);
      }
    };

    initializeSession();

    const handleUserActivity = () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
      updateActivity();
      inactivityTimerRef.current = setTimeout(
        handleInactivity,
        INACTIVITY_TIMEOUT
      );
    };

    const events = [
      'mousedown',
      'mousemove',
      'keypress',
      'scroll',
      'touchstart',
    ];
    events.forEach((event) => {
      window.addEventListener(event, handleUserActivity, { passive: true });
    });

    return () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
      events.forEach((event) => {
        window.removeEventListener(event, handleUserActivity);
      });
    };
  }, [slug, sourceFromParams, sourceParam, isMyCard, ip]);

  /**
   * 이미지 저장 처리
   */
  const { handleSaveImg } = useImageDownloader();

  /**
   * vCard 저장 처리
   */
  const { handleSaveVCard } = useVCardSaver(() => {
    if (!isMyCard && sessionIdRef.current) {
      logInteractionMutation.mutate({ elementName: 'vcard', type: 'save' });
      updateActivity();
    }
  });

  /**
   * 소셜 링크 클릭 처리
   */
  const handleClick = async ({ url, elementName }: SocialLink) => {
    if (!isMyCard && sessionIdRef.current) {
      logInteractionMutation.mutate({ elementName, type: 'click' });
      updateActivity();
    }
    window.open(url, '_blank');
  };

  return {
    updateActivity,
    handleClick,
    handleSaveImg,
    handleSaveVCard,
    logInteraction:
      isMyCard || !sessionIdRef.current
        ? () => {}
        : logInteractionMutation.mutate,
  };
};
