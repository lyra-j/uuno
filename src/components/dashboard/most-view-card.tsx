'use client';

import { ROUTES } from '@/constants/path.constant';
import { useMostViewedCard } from '@/hooks/queries/use-month-chart';
import { Icon } from '@iconify/react/dist/iconify.js';
import Image from 'next/image';
import Link from 'next/link';

interface MostViewedCardProps {
  userId: string;
}

const MostViewCard = ({ userId }: MostViewedCardProps) => {
  const { data, isLoading, error } = useMostViewedCard(userId);

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>가장 조회수가 높은 명함 가져오는 중 오류 발생</div>;
  if (!data) return <div>명함이 없어요</div>;

  const { title, id: cardId } = data;

  return (
    <div className='rounded-xl bg-white p-[14px]'>
      <div className='flex items-center justify-between'>
        <p className='text-label2-medium text-gray-70'>
          가장 조회 수가 높은 명함
        </p>
        <Link href={`${ROUTES.MYCARD}/${cardId}`}>
          <Icon icon='tdesign:arrow-right' width='20' height='20' />
        </Link>
      </div>
      <Link href={`${ROUTES.MYCARD}/${cardId}`}>
        <h3 className='text-label1-semi text-black'>{title}</h3>
      </Link>
      <div className='flex flex-col justify-end'>
        <div className='relative mt-[35px] h-[88px] w-[226px]'>
          <Image
            src='/minichart.png'
            alt='가장 조회수가 높은 명함 그래프'
            fill
            className='object-cover'
          />
        </div>
        <p className='text-end text-caption-medium text-gray-30'>1 month</p>
      </div>
    </div>
  );
};

export default MostViewCard;
