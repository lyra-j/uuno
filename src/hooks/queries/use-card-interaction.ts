import {
  getCardId,
  getCardTitle,
  getUserNickName,
} from '@/apis/card-interaction';
import { getCardContent } from '@/apis/interaction';
import { QUERY_KEY } from '@/constants/query-key';
import { useQuery } from '@tanstack/react-query';

/**
 * 슬러그를 기반으로 명함 ID를 조회하는 쿼리 훅
 *
 * @param slug 명함 슬러그 문자열
 * @returns
 */
export const useCardInteraction = (slug: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.CARD_INTERACTION, slug],
    queryFn: async () => getCardId(slug),
    enabled: !!slug, // slug가 존재할 때만 쿼리 활성화
  });
};

/**
 * 슬러그를 기반으로 사용자 닉네임을 조회하는 쿼리 훅
 *
 * @param slug 명함 슬러그 문자열
 * @returns
 */
export const useGetUserNickName = (slug: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.CARD_NICK_NAME, slug],
    queryFn: async () => getUserNickName(slug),
    enabled: !!slug,
  });
};

/**
 * 명함Id를 기반으로 명함 제목을 조회하는 쿼리 훅
 *
 * @param cardId 명함 Id
 * @returns
 */
export const useGetCardTitle = (cardId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.CARD_TITLE, cardId],
    queryFn: async () => getCardTitle(cardId),
    enabled: !!cardId,
  });
};

/**
 * 명함 콘텐츠 받아오기
 *
 * @param slug 명함 slug
 * @returns
 */
export const useCardContent = (slug: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.CARD_CONTENT, slug],
    queryFn: async () => getCardContent(slug),
    enabled: !!slug,
  });
};
