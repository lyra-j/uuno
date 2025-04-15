// src/hooks/mutations/use-card-save.ts
import { useMutation } from '@tanstack/react-query';
import { TablesInsert } from '@/types/supabase';
import { saveCard } from '@/apis/card-save';

export const useCardSave = () => {
  return useMutation({
    mutationFn: (payload: TablesInsert<'cards'>) => saveCard(payload),
  });
};
