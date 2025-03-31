'use client';
import { useForm, FieldValues } from 'react-hook-form';
import { login } from '../actions';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import AuthForm from '@/components/auth/AuthForm';

// const loginSchema = z.object({
//   email: z.string().email({ message: 'invalid email' }),
//   password: z.string().min(6, { message: '6글자 이상 입력' }),
// });

export default function LoginPage() {
  // const { register, handleSubmit, formState } = useForm({
  //   mode: 'onBlur',
  //   resolver: zodResolver(loginSchema),
  // });

  // const handleLogin = async (value: FieldValues) => {
  //   console.log(formState);
  //   // await login(value);
  // };
  return (
    <AuthForm type='login' />
    // <form onSubmit={handleSubmit(handleLogin)}>
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

    //   <button type='submit'>Log in</button>
    // </form>
  );
}
