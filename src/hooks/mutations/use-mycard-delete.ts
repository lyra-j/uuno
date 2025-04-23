import { deleteCard } from '@/apis/card-delete';
import { QUERY_KEY } from '@/constants/query-key';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface Props {
  slug: string;
  cardId: string;
  userId: string;
}

export const useMyCardDelete = ({ cardId, slug, userId }: Props) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteCard({ cardId, slug, userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        // 명함 목록 다시 가져오기
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
        });
    },
    onError: (error) => {
      console.error('카드 삭제 중 오류 발생 : ', error);
    },
  });
};
