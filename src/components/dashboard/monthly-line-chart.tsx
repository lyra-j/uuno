'use client';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { ResponsiveContainer } from 'recharts';

// 차트 색상 참조
const chartColors = {
  primary: '#4880FF', // primary-40에 가까운 색상
  orange: '#F06A2A', // chart2-image와 비슷한 주황색
};

// ChartJS에 필요한 모듈
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface MonthlyLineChartProps {
  monthViewCnt: (number | null | undefined)[];
  monthSaveCnt: (number | null | undefined)[];
  monthDates: string[];
}

const MonthlyLineChart = ({
  monthViewCnt,
  monthSaveCnt,
  monthDates,
}: MonthlyLineChartProps) => {
  // 차트에 사용할 데이터 구성
  const data = {
    labels: monthDates.map((date) => date.split('-')[2]),
    datasets: [
      {
        label: '조회 수',
        data: monthViewCnt,
        borderColor: chartColors.primary,
        backgroundColor: chartColors.primary,
      },
      {
        label: '저장 수',
        data: monthSaveCnt,
        borderColor: chartColors.orange,
        backgroundColor: chartColors.orange,
      },
    ],
  };

  // 차트 설정 (옵션) 구성
  const config = {
    type: 'line', // 선(line) 차트 타입
    data: data,
    options: {
      responsive: true, // 반응형 디자인 적용
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false, // 범례(legend) 표시 안함
        },
      },
      scales: {
        y: {
          max:
            monthViewCnt.length > 0 && monthSaveCnt.length > 0
              ? Math.max(
                  ...[
                    ...monthViewCnt.filter(
                      (value): value is number =>
                        typeof value === 'number' && value > 0
                    ),
                    ...monthSaveCnt.filter(
                      (value): value is number =>
                        typeof value === 'number' && value > 0
                    ),
                  ]
                ) + 1
              : undefined,
          beginAtZero: true, // 0에서 시작하도록 설정
          ticks: {
            stepSize: 1,
            precision: 0,
            // 또는 눈금 값 직접 지정
            callback: function (value: number | string) {
              // 필요한 경우 음수 값 숨기기
              if (typeof value === 'number' && value < 0) return '';
              return value;
            },
            color: '#AEB0B6',
            font: {
              size: 12,
              family: 'Pretendard',
              weight: 500 as const,
            },
          },
          grid: {
            drawBorder: false,
            display: true, // 가로 그리드 라인은 유지
          },
        },
        x: {
          ticks: {
            color: '#AEB0B6',
            font: {
              size: 12,
              family: 'Pretendard',
              weight: 500 as const,
            },
          },
          grid: {
            display: false, // 세로 그리드 라인 제거
            drawBorder: false,
          },
        },
      },
      // 차트 요소 설정: 데이터 포인트와 선에 대한 세부 옵션
      elements: {
        point: {
          radius: 0, // 데이터 포인트 원의 반지름
          hitRadius: 10, // 포인트 주변의 마우스 감지 영역
          hoverRadius: 5, // 마우스 호버 시 포인트 원의 반지름
        },
        line: {
          borderWidth: 2, // 선의 두께
        },
      },
    },
  };

  return (
    <div
      aria-label='전체 명함 월간 조회 및 저장 통계 차트'
      role='figure'
      className='flex-1'
    >
      {/* 월간 조회수 데이터가 없으면 안내 메시지, 있으면 차트 렌더링 */}
      {monthViewCnt.length === 0 && monthSaveCnt.length === 0 ? (
        <div className='py-4 text-center'>데이터가 없습니다.</div>
      ) : (
        // TODO: 차트 비율 및 반응형 관련해서 더 찾아보기
        <div className='max-h-[108px] w-full md:max-h-[128px]'>
          <Line
            data={data}
            options={config.options}
            // className='mx-auto w-full'
          />
        </div>
      )}
    </div>
  );
};

export default MonthlyLineChart;
