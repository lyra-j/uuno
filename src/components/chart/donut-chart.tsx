'use client';
import useClickTotalChart from '@/hooks/queries/use-click-total-chart';
import { useParams } from 'next/navigation';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartWrapper from './chart-wrapper';

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = () => {
  const { id } = useParams();
  const {
    data: donutData,
    isPending,
    error,
  } = useClickTotalChart(id && Array.isArray(id) ? id[0] : '');

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
          '#FF143F',
          '#FF7800',
          '#FFB30A',
          '#6FD7AE',
          '#64B0F9',
          '#6792CF',
          '#8690EE',
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
        ctx.fillStyle = '#70737C';
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
