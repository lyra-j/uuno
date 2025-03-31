'use client';
import { useForm, FieldValues } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signup } from '../actions';
import AuthForm from '@/components/auth/AuthForm';

// const signUpSchema = z.object({
//   email: z.string().email({ message: '유효하지 않은 이메일 형식' }),
//   password: z.string().min(1, { message: '1글자 이상 입력' }),
//   nick_name: z.string().min(1, { message: '1글자 이상 입력' }),
// });

export default function SignUpPage() {
  // const { register, handleSubmit, formState } = useForm({
  //   mode: 'onBlur',
  //   resolver: zodResolver(signUpSchema),
  // });

  // const handleSignUp = async (value: FieldValues) => {
  //   await signup(value);
  // };
  return (
    <AuthForm type='signup' />
    // <form onSubmit={handleSubmit(handleSignUp)}>
    //   <label htmlFor='nick_name'>nickname:</label>
    //   <input id='nick_name' {...register('nick_name')} />
    //   {formState.errors.nick_name && (
    //     <p style={{ color: 'red' }}>{formState.errors.nick_name.message}</p>
    //   )}
    //   <label htmlFor='email'>Email:</label>
    //   <input id='email' {...register('email')} />
    //   {formState.errors.email && (
    //     <p style={{ color: 'red' }}>{formState.errors.email.message}</p>
    //   )}
    //   <label htmlFor='password'>Password:</label>
    //   <input id='password' {...register('password')} />
    //   {formState.errors.password && (
    //     <p style={{ color: 'red' }}>{formState.errors.password.message}</p>
    //   )}

    //   <button type='submit'>sign up</button>
    // </form>
  );
}
