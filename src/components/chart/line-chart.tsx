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

const LineChart = () => {
  const { data: weekChartData, isPending, error } = useWeekChart();

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const {
    weekViewCnt = [],
    weekSaveCnt = [],
    weekDates = [],
  } = weekChartData || {};

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
          max: Math.max(...(weekViewCnt.filter(Boolean) as number[])) + 1,
          beginAtZero: true, // 실제로는 0에서 시작하지 않도록
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
    <>
      <Line data={data} options={config.options} />
    </>
  );
};

export default LineChart;
