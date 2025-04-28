'use client';

import { useState } from 'react';
import { StackedChart } from './stacked-chart';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Button } from '../ui/button';
import { useSheetStore } from '@/store/sheet.store';
import { cn } from '@/lib/utils';

const chart1Colors = {
  qr: '#FFA69B', // 막대차트/QR
  link: '#657AFF', // 막대차트/Link
  tag: '#FFD548', // 막대차트/Tag
  direct: '#00D7C0', // 막대차트/Direct
};

// 범례 데이터 정의
const legends = [
  { id: 'qr', label: 'QR', color: chart1Colors.qr },
  { id: 'link', label: 'Link', color: chart1Colors.link },
  { id: 'tag', label: 'Tag', color: chart1Colors.tag },
  { id: 'direct', label: 'Direct', color: chart1Colors.direct },
] as const;

interface PeriodOption {
  value: string;
  label: string;
  disabled?: boolean;
}

// 기간 옵션 정의
const periodOptions: PeriodOption[] = [
  { value: '1', label: '최근 1개월', disabled: false },
  { value: '6', label: '6개월(준비중)', disabled: true },
];

/**
 * StackedChartWrapper 컴포넌트
 *
 * 스택형 차트의 상위 컴포넌트:
 * 기간 선택 드롭다운 (1개월/6개월)
 * 차트 범례 표시
 * 실제 차트 렌더링
 */
export const StackedChartWrapper = () => {
  // 선택된 기간 상태 관리 (기본값: 1개월)
  const [period, setPeriod] = useState('1');
  const openSheet = useSheetStore((state) => state.open);
  const close = useSheetStore((state) => state.close);

  // 선택된 기간 옵션 객체
  const selectedPeriodOption = periodOptions.find(
    (option) => option.value === period
  );

  const handleOpenBottomSheet = () => {
    openSheet({
      side: 'bottom',
      title: '정렬',
      showCloseButton: false,
      content: (
        <ul className='px-[18px]'>
          {periodOptions.map((option) => (
            <li
              key={option.value}
              onClick={() => {
                if (!option.disabled) {
                  setPeriod(option.value);
                  close();
                }
              }}
              data-disabled={option.disabled}
              className={cn(
                `py-3 text-label2-medium ${option.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`,
                option.label === selectedPeriodOption?.label &&
                  'text-label2-medium text-sm font-medium leading-5 text-primary-40'
              )}
            >
              {option.label}
            </li>
          ))}
        </ul>
      ),
    });
  };

  return (
    <div className='flex flex-col'>
      {/* 상단 컨트롤 영역: 범례와 기간 선택 */}
      <div className='mb-[21px] flex h-[25px] items-end justify-between md:mb-4 md:h-auto md:items-center'>
        {/* 왼쪽: 차트 범례 */}
        <div className='flex gap-3'>
          {legends.map((legend) => (
            <div key={legend.id} className='flex items-center gap-1'>
              <div
                className='h-3 w-3'
                style={{ backgroundColor: legend.color }}
              />
              <span className='text-[11px] font-medium leading-[14px] text-gray-70 md:text-caption-medium'>
                {legend.label}
              </span>
            </div>
          ))}
        </div>

        {/* 오른쪽: 기간 선택 드롭다운 */}
        <>
          <div className='hidden md:block'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='outline'
                  className='flex w-24 items-center px-4 !text-caption-medium'
                  aria-label='기간 옵션 선택'
                >
                  {selectedPeriodOption?.label}
                  <Icon
                    icon='tdesign:caret-down-small'
                    width='24'
                    height='24'
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-[114px]' align='end'>
                {periodOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => !option.disabled && setPeriod(option.value)}
                    disabled={option.disabled}
                    className='text-caption-medium'
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className='block md:hidden'>
            <Button
              onClick={handleOpenBottomSheet}
              variant='outline'
              className='flex w-24 items-center px-4 !text-caption-medium'
              aria-label='기간 옵션 선택'
            >
              {selectedPeriodOption?.label}
              <Icon icon='tdesign:caret-down-small' width='24' height='24' />
            </Button>
          </div>
        </>
      </div>

      {/* 차트 영역 */}
      <div className='h-[155px] md:h-[226px]'>
        <StackedChart period={period} />
      </div>
    </div>
  );
};
