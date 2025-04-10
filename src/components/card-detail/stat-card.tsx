import React from 'react';

interface Props {
  title: string;
  value?: string | number;
}

const StatCard = ({ title, value = '-' }: Props) => (
  <div className='rounded-lg bg-white p-4'>
    <p className='text-[14px] text-gray-500'>{title}</p>
    <p className='mt-1 text-[18px] font-bold'>{value}</p>
    <p className='text-medium text-[12px]'>-</p>
  </div>
);

export default StatCard;
