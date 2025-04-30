import { SESSION_TIMEOUT } from '@/constants/session.constant';
import { formatToDateString } from './format-date';

const SESSION_ID_KEY = 'session_id';
const SESSION_START_KEY = 'session_start';
const PENDING_SESSION_END_KEY = 'pending_session_end';

/**
 * 유효한 세션 ID를 가져옴
 * 세션 우선, 없으면 로컬
 */
export const getEffectiveSessionId = (): string | null => {
  try {
    return sessionStorage.getItem(SESSION_ID_KEY);
  } catch (error) {
    console.error('세션 ID 조회 실패:', error);
    return null;
  }
};

/**
 * 세션 시작 시간 가져오기
 */
export const getSessionStartTime = (): string | null => {
  try {
    return sessionStorage.getItem(SESSION_START_KEY);
  } catch (error) {
    console.error('세션 시작 시간 조회 실패:', error);
    return null;
  }
};

/**
 * 세션 타임아웃 확인
 */
export const checkSessionTimeout = (): boolean => {
  try {
    const startTime = getSessionStartTime();
    if (!startTime) return true;

    const start = new Date(startTime).getTime();
    const now = new Date().getTime();
    return now - start > SESSION_TIMEOUT;
  } catch (error) {
    console.error('세션 타임아웃 체크 실패:', error);
    return true;
  }
};

/**
 * 세션 종료 데이터 저장
 */
export const storePendingSessionEnd = (sessionId: string, reason: string) => {
  try {
    const pendingEnds = JSON.parse(
      localStorage.getItem(PENDING_SESSION_END_KEY) || '[]'
    );
    pendingEnds.push({
      sessionId,
      reason,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem(PENDING_SESSION_END_KEY, JSON.stringify(pendingEnds));
  } catch (error) {
    console.error('대기 중인 세션 종료 저장 실패:', error);
  }
};

/**
 * 세션 데이터 삭제
 */
export const clearSessionData = (): void => {
  sessionStorage.removeItem(SESSION_ID_KEY);
  sessionStorage.removeItem(SESSION_START_KEY);
};

/**
 * 세션 초기화
 */
export const initSession = (startedAt: Date) => {
  try {
    const sessionId = crypto.randomUUID();
    const startedAtString = startedAt.toISOString();

    sessionStorage.setItem(SESSION_ID_KEY, sessionId);
    sessionStorage.setItem(SESSION_START_KEY, startedAtString);

    return {
      sessionId,
      startedAt: startedAtString,
    };
  } catch (error) {
    console.error('세션 초기화 실패:', error);
    throw error;
  }
};

/**
 * 세션 종료
 */
export const endSession = (sessionId: string) => {
  try {
    if (getEffectiveSessionId() === sessionId) {
      sessionStorage.removeItem(SESSION_ID_KEY);
      sessionStorage.removeItem(SESSION_START_KEY);
    }
  } catch (error) {
    console.error('세션 종료 실패:', error);
  }
};

/**
 * 세션 활동 업데이트
 */
export const updateSessionActivity = () => {
  try {
    const sessionId = getEffectiveSessionId();
    if (!sessionId) return;

    const startTime = getSessionStartTime();
    if (!startTime) return;

    // 세션 시작 시간 업데이트
    sessionStorage.setItem(SESSION_START_KEY, new Date().toISOString());
  } catch (error) {
    console.error('세션 활동 업데이트 실패:', error);
  }
};

/**
 * 대기 중인 세션 종료 가져오기
 */
export const getPendingSessionEnds = () => {
  try {
    return JSON.parse(localStorage.getItem(PENDING_SESSION_END_KEY) || '[]');
  } catch (error) {
    console.error('대기 중인 세션 종료 조회 실패:', error);
    return [];
  }
};

/**
 * 대기 중인 세션 종료 삭제
 */
export const clearPendingSessionEnds = () => {
  try {
    localStorage.removeItem(PENDING_SESSION_END_KEY);
  } catch (error) {
    console.error('대기 중인 세션 종료 삭제 실패:', error);
  }
};

/**
 * 스토리지 가용성 확인 함수
 *
 * @param type localStorage 또는 sessionStorage
 * @returns 스토리지 사용 가능 여부
 */
export function isStorageAvailable(type: 'localStorage' | 'sessionStorage') {
  try {
    if (typeof window === 'undefined') return false;

    const storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (error) {
    return false;
  }
}
