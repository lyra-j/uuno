import { CardContent } from '@/types/editor.type';

export const isCardContent = (content: unknown): content is CardContent => {
  return (
    typeof content === 'object' && content !== null && 'isTemplate' in content
  );
};
