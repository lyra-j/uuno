'use client';

import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useWeeklySourceCounts } from '@/hooks/queries/use-source-count';
import { useParams } from 'next/navigation';
import { useCardDataStore } from '@/store/card-data.store';

// Chart.js 모듈 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// 막대 차트 색상
const chart1Colors = {
  qr: '#FFA69B', // 막대차트/QR
  link: '#657AFF', // 막대차트/Link
  tag: '#FFD548', // 막대차트/Tag
  direct: '#00D7C0', // 막대차트/Direct
};

interface StackedChartProps {
  period: string;
}

export const StackedChart = ({ period }: StackedChartProps) => {
  const { id } = useParams();
  const setHasData = useCardDataStore((state) => state.setHasData);
  const { data, isPending, error } = useWeeklySourceCounts(
    id && Array.isArray(id) ? id[0] : ''
  );

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 768
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isPending) {
      setHasData(Array.isArray(data) && data.length > 0);
    }
  }, [data, isPending, setHasData]);

  if (isPending)
    return (
      <div className='flex h-full w-full items-center justify-center'>
        로딩 중...
      </div>
    );
  if (error)
    return (
      <div className='flex h-full w-full items-center justify-center text-error'>
        Error: {error.message}
      </div>
    );
  if (!data) return null;

  const filteredData =
    period === '1'
      ? data // 현재 월 데이터 (API에서 가져옴)
      : data.slice(-24); // 최근 6개월 (24주)

  // chart.js에 넘길 데이터 형태로 가공
  const labels = filteredData.map((d) => d.weekLabel);
  const datasets = [
    {
      label: 'QR',
      data: filteredData.map((d) => d.qr),
      backgroundColor: chart1Colors.qr,
    },
    {
      label: 'Link',
      data: filteredData.map((d) => d.link),
      backgroundColor: chart1Colors.link,
    },
    {
      label: 'Tag',
      data: filteredData.map((d) => d.tag),
      backgroundColor: chart1Colors.tag,
    },
    {
      label: 'Direct',
      data: filteredData.map((d) => d.direct),
      backgroundColor: chart1Colors.direct,
    },
  ];

  // 각 주차별 총합을 계산하여 최대값 찾기
  const maxTotal = Math.max(
    ...filteredData.map((d) => d.qr + d.link + d.tag + d.direct)
  );

  // 최대값을 기준으로 적절한 눈금 간격 계산
  const suggestedMax = Math.ceil(maxTotal * 1.1); // 최대값보다 10% 더 큰 값으로 설정
  const stepSize = Math.ceil(suggestedMax / 5); // 5등분

  const chartData = { labels, datasets };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            return `${label}: ${value}`;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: windowWidth < 768 ? 11 : 12,
            family: 'Pretendard',
          },
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        grid: {
          color: '#AEB0B6', //gray-40
        },
        ticks: {
          stepSize: stepSize,
          precision: 0,
          font: {
            size: windowWidth < 768 ? 11 : 12,
            family: 'Pretendard',
          },
        },
        max: stepSize * 5, // 5등분되도록 최대값 설정
      },
    },
  };

  return (
    <div className='h-full w-full'>
      <Bar data={chartData} options={options} />
    </div>
  );
};
