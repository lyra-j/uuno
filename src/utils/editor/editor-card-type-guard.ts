import { CardContent } from '@/types/editor.type';

export const isCardContent = (content: unknown): content is CardContent => {
  return (
    typeof content === 'object' &&
    content !== null &&
    ('canvasElements' in content ||
      'canvasBackElements' in content ||
      'backgroundColor' in content ||
      'backgroundColorBack' in content ||
      'isTemplate' in content)
  );
};
