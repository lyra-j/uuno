'use client';
import useClickTotalChart from '@/hooks/queries/use-click-total-chart';
import { useParams } from 'next/navigation';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartWrapper from './chart-wrapper';
import { useCardDataStore } from '@/store/card-data.store';
import { useEffect } from 'react';

// chart2 색상 객체 참조
const chart2Colors = {
  vcard: '#FF143F', // chart2-vcard
  image: '#FF7800', // chart2-image
  kakao: '#FFB30A', // chart2-kakao
  github: '#6FD7AE', // chart2-github
  notion: '#64B0F9', // chart2-notion
  insta: '#6792CF', // chart2-insta
  linkedin: '#8690EE', // chart2-linkedin
};

// gray 색상 참조
const grayColors = {
  70: '#70737C', // gray-70
};

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = () => {
  const { id } = useParams();
  const setHasData = useCardDataStore((state) => state.setHasData);
  const {
    data: donutData,
    isPending,
    error,
  } = useClickTotalChart(id && Array.isArray(id) ? id[0] : '');
  useEffect(() => {
    if (donutData) {
      setHasData(!!donutData);
    }
  }, [donutData, setHasData]);

  if (isPending)
    return (
      <div className='mb-6 rounded-xl bg-white p-4'>
        <div className='mb-4 h-6 w-1/3 animate-pulse rounded bg-gray-10'></div>
        <div className='h-40 animate-pulse rounded bg-gray-5'></div>
      </div>
    );
  if (error)
    return (
      <div className='mb-6 rounded-xl bg-red-50 p-4 text-error'>
        <p>데이터를 불러오는 중 오류가 발생했습니다.</p>
        <p className='text-label2-regular'>{error.message}</p>
      </div>
    );

  const { interactionData, interactionCount } = donutData || {
    interactionData: [],
    interactionCount: [],
  };
  const data = {
    labels: interactionData,
    datasets: [
      {
        data: interactionCount.filter(
          (count): count is number => count !== null
        ),
        backgroundColor: [
          chart2Colors.vcard, // #FF143F
          chart2Colors.image, // #FF7800
          chart2Colors.kakao, // #FFB30A
          chart2Colors.github, // #6FD7AE
          chart2Colors.notion, // #64B0F9
          chart2Colors.insta, // #6792CF
          chart2Colors.linkedin, // #8690EE
        ],
      },
    ],
  };
  const options = {
    responsive: true,
    cutout: '60%',
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  const plugins = [
    {
      id: 'centerText',
      beforeDraw: (chart: ChartJS) => {
        const { width, height, ctx, data } = chart;
        ctx.restore();
        const fontSize = '1';
        ctx.fillStyle = grayColors[70]; // gray-70 색상 사용
        ctx.font = `bold ${fontSize}em Pretendard`;
        ctx.textBaseline = 'middle';
        const totalCnt = data.datasets[0].data
          .filter((value): value is number => typeof value === 'number')
          .reduce((a, c) => a + c, 0);

        const text = `총 ${totalCnt}회`;
        const textX = Math.round(width / 2 - ctx.measureText(text).width / 2);

        const textY = Math.round(height / 2) + 2;

        ctx.fillText(text, textX, textY);
        ctx.save();
      },
    },
  ];
  const config = {
    type: 'doughnut',
    data: data,
    options: options,
  };
  return <ChartWrapper data={data} config={config} plugins={plugins} />;
};

export default DonutChart;
