import { VALIDATE } from '@/constants/auth.messages.constant';
import { z } from 'zod';

const commonSchema = {
  email: z.string().email({ message: VALIDATE.INVALID_EMAIL }),
  password: z
    .string()
    .min(VALIDATE.MIN_PASSWORD_LENGTH, {
      message: VALIDATE.MIN_PASSWORD_MESSAGE,
    })
    .max(VALIDATE.MAX_PASSWORD_LENGTH, {
      message: VALIDATE.MAX_PASSWORD_MESSAGE,
    })
    .regex(VALIDATE.STRING_PASSWORD_REGEX, {
      message: VALIDATE.STRING_PASSWORD_MESSAGE,
    })
    .regex(VALIDATE.NUMBER_PASSWORD_REGEX, {
      message: VALIDATE.STRING_PASSWORD_MESSAGE,
    }),
};

export const loginSchema = z.object(commonSchema);

export const signUpSchema = z
  .object({
    ...commonSchema,
    confirmPassword: z
      .string()
      .min(VALIDATE.MIN_PASSWORD_LENGTH, {
        message: VALIDATE.MIN_PASSWORD_MESSAGE,
      })
      .max(VALIDATE.MAX_PASSWORD_LENGTH, {
        message: VALIDATE.MAX_PASSWORD_MESSAGE,
      })
      .regex(VALIDATE.STRING_PASSWORD_REGEX, {
        message: VALIDATE.STRING_PASSWORD_MESSAGE,
      })
      .regex(VALIDATE.NUMBER_PASSWORD_REGEX, {
        message: VALIDATE.STRING_PASSWORD_MESSAGE,
      }),
    nick_name: z
      .string()
      .min(VALIDATE.MIN_NICKNAME_LENGTH, {
        message: VALIDATE.MIN_NICKNAME_MESSAGE,
      })
      .max(VALIDATE.MAX_NICKNAME_LENGTH, {
        message: VALIDATE.MAX_NICKNAME_MESSAGE,
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: VALIDATE.INVALID_PASSWORD,
    path: ['confirmPassword'],
  });

export const nickNameSchema = z
  .string()
  .min(VALIDATE.MIN_NICKNAME_LENGTH, {
    message: VALIDATE.MIN_NICKNAME_MESSAGE,
  })
  .max(VALIDATE.MAX_NICKNAME_LENGTH, {
    message: VALIDATE.MAX_NICKNAME_MESSAGE,
  });
