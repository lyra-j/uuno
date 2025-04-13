import { useEffect, useRef } from 'react';
import { useIpAddressQuery } from './queries/use-ip-address';
import {
  useDownloadCardImageMutation,
  useEndSessionMutation,
  useInitSessionMutation,
  useLogInteractionMutation,
} from './mutations/use-init-session';
import {
  getEffectiveSessionId,
  storePendingSessionEnd,
} from '@/utils/interaction/session-util';
import useCardInteraction from './queries/use-card-interaction';
import useCardSocialList from './queries/use-card-social-list';

interface InteractionProps {
  slug: string;
  source: 'direct' | 'qr' | 'link' | 'tag' | null | undefined;
  startedAt: Date | null;
}

interface SocialLink {
  elementName: string | null;
  url: string | URL | undefined;
}

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
  const downloadCardImageMutation = useDownloadCardImageMutation();

  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastActivityRef = useRef<Date | null>(null);

  useEffect(() => {
    if (!ip || !cardId) return;
    sessionInitMutation.mutate();
  }, [ip, cardId]);

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

  const handleSaveImg = async () => {
    try {
      const data = await downloadCardImageMutation.mutateAsync();

      const blob = new Blob([data], { type: 'image/jpeg' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'text.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      logInteractionMutation.mutate({ elementName: 'image', type: 'save' });
      updateActivity();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveVCard = async () => {
    try {
      logInteractionMutation.mutate({ elementName: 'vcard', type: 'save' });
      updateActivity();
    } catch (error) {
      console.error(error);
    }
  };

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
