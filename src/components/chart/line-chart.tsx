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
import useWeekChart from '@/hooks/queries/use-week-chart';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  weekViewCnt: (number | null | undefined)[];
  weekSaveCnt: (number | null | undefined)[];
  weekDates: string[];
}

const LineChart = ({ weekViewCnt, weekSaveCnt, weekDates }: LineChartProps) => {
  const data = {
    labels: weekDates.map((date) => date.split('-')[2]),
    datasets: [
      {
        label: '주간 조회 수',
        data: weekViewCnt,
        borderColor: '#64B0F9',
        backgroundColor: '#64B0F9',
      },
      {
        label: '주간 저장 수',
        data: weekSaveCnt,
        borderColor: '#FF143F',
        backgroundColor: '#FF143F',
      },
    ],
  };
  const config = {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          max:
            weekViewCnt.filter(
              (value): value is number => typeof value === 'number' && value > 0
            ).length > 0
              ? Math.max(
                  ...weekViewCnt.filter(
                    (value): value is number =>
                      typeof value === 'number' && value > 0
                  )
                ) + 1
              : 5,
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
          },
        },
      },
    },
  };
  return (
    <div aria-label='주간 조회 및 저장 통계 차트' role='figure'>
      {weekViewCnt.length === 0 && weekSaveCnt.length === 0 ? (
        <div className='py-4 text-center'>데이터가 없습니다.</div>
      ) : (
        <Line data={data} options={config.options} />
      )}
    </div>
  );
};

export default LineChart;
