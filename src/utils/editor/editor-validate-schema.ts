import { z } from 'zod';

export const qrSlugSchema = z.object({
  slug: z
    .string()
    .min(1, '슬러그를 입력해주세요.')
    .regex(/^[a-zA-Z0-9-_]+$/, '영문, 숫자, (-), (_)만 가능합니다.'),
});
