'use client';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className='flex h-[calc(100vh-64px)] items-center justify-center'>
      <Loader2 className='h-16 w-16 animate-spin text-primary-40' />
    </div>
  );
};

export default LoadingSpinner;
