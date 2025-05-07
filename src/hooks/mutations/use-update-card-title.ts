import { patchCardTitle } from '@/apis/dashboard.client.api';
import { QUERY_KEY } from '@/constants/query-key';
import { authStore } from '@/store/auth.store';
import { Cards } from '@/types/supabase.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface UpdateCardTitleParams {
  cardId: string;
  newTitle: string;
}

export const useUpdateCardTitle = (sortKey: string) => {
  const queryClient = useQueryClient();

  const userId = authStore((state) => state.userId);

  return useMutation({
    mutationFn: ({ cardId, newTitle }: UpdateCardTitleParams) =>
      patchCardTitle(cardId, newTitle),
    onMutate: async ({ cardId, newTitle }) => {
      // 쿼리 취소
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY.SORT_CARD, userId, sortKey],
      });

      // 스냅샷
      const prevSorted = queryClient.getQueryData<Cards[]>([
        QUERY_KEY.SORT_CARD,
        userId,
        sortKey,
      ]);

      // 옵티미스틱
      const now = new Date().toISOString();
      queryClient.setQueryData<Cards[]>(
        [QUERY_KEY.SORT_CARD, userId, sortKey],
        (list) =>
          list?.map((card) =>
            card.id === cardId
              ? { ...card, title: newTitle, updated_at: now }
              : card
          ) ?? []
      );
      // 롤백 컨텍스트
      return { prevSorted, cardId };
    },
    onError: (_err, _vars, context: any) => {
      // 롤백
      if (context?.prevSorted) {
        queryClient.setQueryData(
          [QUERY_KEY.SORT_CARD, userId, sortKey],
          context.prevSorted
        );
      }
    },
    onSettled: (_data, _error, variables) => {
      // 서버 동기화
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.SORT_CARD, userId, sortKey],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.CARD, variables.cardId],
      });
    },
  });
};
