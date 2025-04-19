'use client';

import React, { useEffect } from 'react';
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

export const StackedChart = () => {
  const { id } = useParams();
  const setHasData = useCardDataStore((state) => state.setHasData);
  const { data, isLoading, error } = useWeeklySourceCounts(
    id && Array.isArray(id) ? id[0] : ''
  );

  useEffect(() => {
    if (!isLoading) {
      // data 가 빈 배열이 아니라면 hasData = true
      setHasData(Array.isArray(data) && data.length > 0);
    }
  }, [data, isLoading, setHasData]);

  if (isLoading) return <p>Loading…</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return null;

  // chart.js에 넘길 데이터 형태로 가공
  const labels = data.map((d) => d.weekLabel);
  const datasets = [
    {
      label: 'QR',
      data: data.map((d) => d.qr),
      backgroundColor: chart1Colors.qr,
    },
    {
      label: 'Link',
      data: data.map((d) => d.link),
      backgroundColor: chart1Colors.link,
    },
    {
      label: 'Tag',
      data: data.map((d) => d.tag),
      backgroundColor: chart1Colors.tag,
    },
    {
      label: 'Direct',
      data: data.map((d) => d.direct),
      backgroundColor: chart1Colors.direct,
    },
  ];

  const chartData = { labels, datasets };

  // 스택형 옵션
  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
    },
    scales: {
      x: { stacked: true },
      y: { stacked: true, beginAtZero: true },
    },
  };

  return <Bar data={chartData} options={options} />;
};
