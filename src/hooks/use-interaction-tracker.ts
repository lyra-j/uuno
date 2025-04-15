import { useEffect, useRef } from 'react';
import { useIpAddressQuery } from './queries/use-ip-address';
import {
  useEndSessionMutation,
  useInitSessionMutation,
  useLogInteractionMutation,
} from './mutations/use-init-session';
import {
  getEffectiveSessionId,
  storePendingSessionEnd,
} from '@/utils/interaction/session-util';
import useCardSocialList from './queries/use-card-social-list';
import { useCardInteraction } from '@/hooks/queries/use-card-interaction';
import { useImageDownloader } from './use-Image-downloader';
import { useVCardSaver } from './use-vcard-saver';

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

  const sessionInitMutation = useInitSessionMutation(startedAt);
  const endSessionMutation = useEndSessionMutation();
  const { data } = useCardInteraction(slug);
  const cardId = data;
  const { data: socialLinks } = useCardSocialList(cardId || '');

  const logInteractionMutation = useLogInteractionMutation(
    cardId || '',
    ip,
    source,
    startedAt
  );

  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastActivityRef = useRef<Date | null>(null);

  // 세션 초기화
  useEffect(() => {
    if (!ip || !cardId) return;
    sessionInitMutation.mutate();
  }, [ip, cardId]);

  /**
   * 활동 업데이트
   */
  const updateActivity = () => {
    lastActivityRef.current = new Date();
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    inactivityTimerRef.current = setTimeout(
      () => {
        const sessionId = getEffectiveSessionId();
        if (sessionId) {
          endSessionMutation.mutate({ reason: 'inactive', sessionId });
        }
      },
      30 * 60 * 1000
    );
  };

  // 활동 이벤트 설정
  useEffect(() => {
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

    const handleBeforeUnload = () => {
      const currentSessionId = getEffectiveSessionId();
      if (currentSessionId) {
        storePendingSessionEnd(currentSessionId);
        endSessionMutation.mutate({
          reason: 'page-exit',
          sessionId: currentSessionId,
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

      const currentSessionId = getEffectiveSessionId();
      if (currentSessionId) {
        endSessionMutation.mutate({
          reason: 'route-change',
          sessionId: currentSessionId,
        });
      }
    };
  }, []);

  /**
   * 이미지 저장 처리
   */
  const { handleSaveImg } = useImageDownloader(() => {
    logInteractionMutation.mutate({ elementName: 'image', type: 'save' });
    updateActivity();
  });

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
    handleClick,
    handleSaveImg,
    socialLinks,
    handleSaveVCard,
    isLoading: !ip || sessionInitMutation.isPending,
    isError: sessionInitMutation.isError || logInteractionMutation.isError,
  };
};
