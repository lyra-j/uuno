import { SESSION_TIMEOUT } from '@/constants/session.constant';
import { formatToDateString } from './format-date';

/**
 * 유효한 세션 ID를 가져옴
 * 세션 우선, 없으면 로컬
 */
export const getEffectiveSessionId = (): string | null => {
  try {
    if (isStorageAvailable('sessionStorage')) {
      const sessionId = sessionStorage.getItem('current_session_id');
      if (sessionId) return sessionId;
    }
    if (isStorageAvailable('localStorage')) {
      return localStorage.getItem('last_session_id');
    }
    return null;
  } catch (error) {
    console.error('세션 ID 가져오기 오류: ', error);
    return null;
  }
};

/**
 * 세션 타임아웃 확인
 */
export const checkSessionTimeout = (): boolean => {
  try {
    if (!isStorageAvailable('localStorage')) return false;

    const lastActivity = localStorage.getItem('last_activity');
    if (!lastActivity) return false;

    const isTimedOut = Date.now() - parseInt(lastActivity) > SESSION_TIMEOUT;

    if (isTimedOut && isStorageAvailable('sessionStorage')) {
      // 타임아웃된 경우 세션 스토리지 초기화
      sessionStorage.removeItem('current_session_id');
      sessionStorage.removeItem('session_started_at');
    }

    return isTimedOut;
  } catch (e) {
    console.error('세션 타임아웃 확인 오류:', e);
    return false;
  }
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
  sessionStorage.removeItem('current_session_id');
  sessionStorage.removeItem('session_started_at');
};

/**
 * 스토리지 가용성 확인 함수
 *
 * @param type localStorage 또는 sessionStorage
 * @returns 스토리지 사용 가능 여부
 */
export function isStorageAvailable(type: 'localStorage' | 'sessionStorage') {
  try {
    const storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * 세션 활동 시간 업데이트
 */
export const updateSessionActivity = () => {
  try {
    if (isStorageAvailable('localStorage')) {
      localStorage.setItem('last_activity', Date.now().toString());
    }
  } catch (error) {
    console.error('세션 활동 시간 업데이트 오류: ', error);
  }
};

/**
 * 세션 초기화
 */
export const initSession = (startedAt: Date) => {
  const hasSessionStorage = isStorageAvailable('sessionStorage');
  const hasLocalStorage = isStorageAvailable('localStorage');

  // 기존 세션 확인
  let sessionId = null;
  let sessionStartTime = null;
  let isNewSession = false;

  try {
    // 세션 스토리지 우선 확인
    if (hasSessionStorage) {
      sessionId = sessionStorage.getItem('current_session_id');
      sessionStartTime = sessionStorage.getItem('session_started_at');
    }

    // 세션 스토리지에 없다면 로컬 스토리지를 확인
    // 이 경우 세 세션으로 간주 (새탭)
    if (!sessionId && hasLocalStorage) {
      const lastSessionId = localStorage.getItem('last_session_id');

      if (lastSessionId) {
        isNewSession = true;
      }
    }

    if (!isNewSession && sessionStartTime) {
      const lastActivity = localStorage.getItem('last_activity');
      if (lastActivity && Date.now() - Number(lastActivity) > SESSION_TIMEOUT) {
        isNewSession = true;
        sessionId = null;

        if (hasSessionStorage) {
          clearSessionData();
        }
      }
    }

    // 새 세션 생성이 필요한 경우
    if (!sessionId || isNewSession) {
      sessionId = crypto.randomUUID();
      sessionStartTime = formatToDateString(startedAt);

      if (hasSessionStorage) {
        sessionStorage.setItem('current_session_id', sessionId);
        sessionStorage.setItem('session_started_at', sessionStartTime);
      }

      // 시크릿 모드 (세션 스토리지 사용 불가시)
      if (hasLocalStorage) {
        localStorage.setItem('last_session_id', sessionId);
        localStorage.setItem('last_activity', Date.now().toString());
      }
    } else {
      // 기존 세션 활동 시간 업데이트
      updateSessionActivity();
    }
    return {
      sessionId,
      startedAt: sessionStartTime || formatToDateString(startedAt),
      isNewSession,
    };
  } catch (error) {
    // 오류 발생시 임시 세션 발급
    const tempSessionId = crypto.randomUUID();
    return {
      sessionId: tempSessionId,
      startedAt: formatToDateString(startedAt),
      isNewSession: true,
    };
  }
};
