import ChangeUpIcon from '@/components/icons/change-up';
import ChangeDownIcon from '@/components/icons/change-down';
import ChangeNoneIcon from '@/components/icons/change-none';

interface StatCardProps {
  title: string;
  value?: string | number | null;
  statusData?: number | null;
  unit?: '회' | '초' | '분';
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
  <div className='rounded-lg bg-white px-[24px] py-[14px]'>
    <p className='text-label2-regular text-gray-50'>{title}</p>
    <p className='my-2 text-body-medium'>{value ? value + unit : '-'}</p>
    <p className='flex items-center gap-1 text-caption-medium text-gray-70'>
      {statusData ? (
        statusData > 0 ? (
          <>
            <ChangeUpIcon />
            <span>저번 달 대비</span>
            <span className='text-chart1-increase'>
              {statusData + unit} 증가
            </span>
          </>
        ) : statusData < 0 ? (
          <>
            <ChangeDownIcon />
            <span>저번 달 대비</span>
            <span className='text-chart1-decrease'>
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
