import { deleteCard } from '@/apis/card-delete';
import { QUERY_KEY } from '@/constants/query-key';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface Props {
  slug: string;
  cardId: string;
}

export const useMyCardDelete = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ slug, cardId }: Props) =>
      deleteCard({ cardId, slug, userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.CARD_LIST, userId],
      });
    },
    onError: (error) => {
      console.error('카드 삭제 중 오류 발생 : ', error);
    },
  });
};
