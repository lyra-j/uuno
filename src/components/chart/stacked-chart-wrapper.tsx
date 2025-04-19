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
  { value: '6', label: '6개월', disabled: true },
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

  return (
    <div className='flex flex-col'>
      {/* 상단 컨트롤 영역: 범례와 기간 선택 */}
      <div className='mb-4 flex items-center justify-between'>
        {/* 왼쪽: 차트 범례 */}
        <div className='flex gap-3'>
          {legends.map((legend) => (
            <div key={legend.id} className='flex items-center gap-1'>
              <div
                className='h-3 w-3'
                style={{ backgroundColor: legend.color }}
              />
              <span className='text-caption-medium text-gray-70'>
                {legend.label}
              </span>
            </div>
          ))}
        </div>

        {/* 오른쪽: 기간 선택 드롭다운 */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
          <Button variant='outline' className='flex items-center w-24 px-4 text-caption-medium' aria-label='기간 옵션 선택'>
            {periodOptions.find((option) => option.value === period)?.label}
            <Icon icon="tdesign:caret-down-small" width="24" height="24" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-[114px]' align='end' >
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

      {/* 차트 영역 */}
      <div className='h-[250px]'>
        <StackedChart period={period} />
      </div>
    </div>
  );
};
