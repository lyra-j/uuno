import React from 'react';
import ChangeUpIcon from '../icons/change-up';
import ChangeDownIcon from '../icons/change-down';
import ChangeNoneIcon from '../icons/change-none';

interface StatCardProps {
  title: string;
  value?: string | number | null;
  statusData?: number | null;
  unit?: '회' | '초';
}

/**
 *
 * @param title 카드 제목
 * @param value 횟수 / 시간
 * @param statusData 이전 달 대비 변화량 (+ 증가, 0 동일 ,- 감소)
 * @param unit 단위 (회, 초)
 * @returns
 */
const StatCard = ({ title, value, statusData, unit = '회' }: StatCardProps) => (
  <div className='rounded-lg bg-white p-4'>
    <p className='text-[14px] text-gray-500'>{title}</p>
    <p className='my-2 text-[18px] font-medium'>{value ? value + unit : '-'}</p>
    <p className='flex items-center gap-1 text-[12px] font-medium text-[#70737C]'>
      {statusData ? (
        statusData > 0 ? (
          <>
            <ChangeUpIcon />
            <span>저번 달 대비</span>
            <span className='text-[#009DD6]'>{statusData + unit} 증가</span>
          </>
        ) : statusData < 0 ? (
          <>
            <ChangeDownIcon />
            <span>저번 달 대비</span>
            <span className='text-[#F93C65]'>
              {Math.abs(statusData) + unit} 감소
            </span>
          </>
        ) : (
          <>
            <ChangeNoneIcon />
            <span>동일</span>
          </>
        )
      ) : (
        '-'
      )}
    </p>
  </div>
);

export default StatCard;
