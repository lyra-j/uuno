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
  const { data, isPending, error } = useMostViewedCard(userId);

  if (isPending)
    return (
      <div className='rounded-xl bg-white p-4'>
        <div className='mb-4 h-6 w-1/3 animate-pulse rounded bg-gray-10' />
        <div className='h-[120px] w-full animate-pulse rounded bg-gray-5' />
      </div>
    );

  if (error)
    return (
      <div className='mb-6 rounded-xl bg-red-50 p-4 text-error'>
        <p>가장 조회수가 높은 명함 가져오는 중 오류 발생</p>
        <p className='text-label2-regular'>{error.message}</p>
      </div>
    );

  // 유효 데이터 확인
  const hasData = !!data && data.totalMonthViews > 0;
  const titleText = hasData ? data?.title : '-';
  const cardLink = hasData ? `${ROUTES.MYCARD}/${data.id}` : '#';

  return (
    <div className='rounded-xl bg-white p-[14px] max-md:px-[18px] max-md:py-4'>
      {/* PC.ver UI */}
      <div className='max-md:hidden'>
        <div className='flex items-center justify-between'>
          <p className='text-label2-medium text-gray-70'>
            가장 조회 수가 높은 명함
          </p>
          <Link href={cardLink}>
            <Icon icon='tdesign:arrow-right' width='20' height='20' />
          </Link>
        </div>
        <Link href={cardLink}>
          <h3 className='truncate text-label1-semi text-black'>{titleText}</h3>
        </Link>
        <div className='flex flex-col justify-end'>
          <div className='relative mt-[13px] aspect-[226/88] w-full'>
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

      {/* Mobile.ver UI */}
      <div className='flex gap-3 md:hidden'>
        {/* 왼쪽 제목과 링크 */}
        <div className='flex w-2/5 flex-col justify-between gap-2'>
          <p className='text-label2-medium text-gray-70'>
            가장 조회 수가 높은 명함
          </p>

          <Link href={cardLink}>
            <h3 className='truncate text-label1-semi text-black'>
              {titleText}
            </h3>
          </Link>

          <Link href={cardLink}>
            <Icon icon='tdesign:arrow-right' width='20' height='20' />
          </Link>
        </div>

        {/* 오른쪽 차트 그림 */}
        <div className='flex w-full flex-col'>
          <div className='relative aspect-[172/58] min-h-[58px]'>
            <Image
              src='/minichartm.svg'
              alt='가장 조회수가 높은 명함 그래프'
              fill
              className='object-cover'
            />
          </div>
          <p className='text-end text-caption-medium text-gray-30'>1 month</p>
        </div>
      </div>
    </div>
  );
};

export default MostViewCard;
