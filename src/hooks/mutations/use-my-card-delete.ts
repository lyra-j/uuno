import { deleteCard } from '@/apis/card-delete';
import { QUERY_KEY } from '@/constants/query-key';
import { toastError } from '@/lib/toast-util';
import { Cards } from '@/types/supabase.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useMyCardDelete = (
  cardId: string,
  slug: string,
  userId: string,
  onDeleteSuccess?: (updatedData: Cards[]) => void
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteCard({ cardId, slug, userId }),
    onSuccess: async () => {
      // 모든 관련 쿼리 무효화
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.CARD_LIST, userId],
        }),
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.MOST_VIEW, userId],
        }),
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.MONTH_CHART, userId],
        }),
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.MONTH_STATS, userId],
        }),
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.SORT_CARD, userId],
        }),
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.CARD_SELECT_LIST, userId],
        }),
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.CARD, cardId],
        }),
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.CARD_INTERACTION, slug],
        }),
      ]);

      // 업데이트된 데이터 가져오기
      const updatedData = await queryClient.fetchQuery<Cards[]>({
        queryKey: [QUERY_KEY.CARD_SELECT_LIST, userId],
      });

      if (onDeleteSuccess) {
        onDeleteSuccess(updatedData);
      }
    },
    onError: (error) => {
      console.error('카드 삭제 중 오류 발생 : ', error);
      toastError('명함 삭제에 실패했습니다.');
    },
  });
};

export default useMyCardDelete;
