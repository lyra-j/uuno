import { deleteCard } from '@/apis/card-delete';
import { getCardSelectList } from '@/apis/card-select-list';
import { QUERY_KEY } from '@/constants/query-key';
import { CardSelectList } from '@/types/supabase.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

interface Props {
  slug: string;
  cardId: string;
  userId: string;
  onDeleteSuccess?: (updatedCardList?: CardSelectList[]) => void;
}

export const useMyCardDelete = ({
  slug,
  cardId,
  userId,
  onDeleteSuccess,
}: Props) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteCard({ cardId, slug, userId }),
    onSuccess: async () => {
      try {
        // 관련 쿼리 무효화
        await Promise.all([
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.CARD_LIST, userId],
          }),
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.CARD_SELECT_LIST, userId],
          }),
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.CARD, cardId],
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
            queryKey: [QUERY_KEY.CARD_INTERACTION, slug],
          }),
        ]);

        // 카드 목록 새로고침
        await queryClient.refetchQueries({
          queryKey: [QUERY_KEY.CARD_LIST, userId],
          type: 'active',
        });

        // 업데이트된 카드 목록 가져오기
        const updatedData = await queryClient.getQueryData<CardSelectList[]>([
          QUERY_KEY.CARD_SELECT_LIST,
          userId,
        ]);

        onDeleteSuccess?.(updatedData);
      } catch (error) {
        console.error('카드 삭제 후 데이터 업데이트 중 오류:', error);
        toast.error('명함 삭제 후 데이터 업데이트에 실패했습니다.');
        onDeleteSuccess?.();
      }
    },
    onError: (error) => {
      console.error('카드 삭제 중 오류 발생 : ', error);
      toast.error('명함 삭제에 실패했습니다.');
    },
  });
};
