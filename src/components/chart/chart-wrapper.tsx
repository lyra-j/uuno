import { ChartData, ChartOptions, Plugin } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

interface ChartWrapperProps {
  data: ChartData<'doughnut'>;
  config: {
    options: ChartOptions<'doughnut'>;
  };
  plugins: Plugin<'doughnut'>[];
}

const ChartWrapper = ({ data, config, plugins }: ChartWrapperProps) => {
  return (
    <div>
      <div className='mx-5'>
        <Doughnut data={data} options={config.options} plugins={plugins} />
      </div>
      <div className='mt-4 w-full space-y-2 overflow-auto'>
        {data.labels?.map((label, i) => {
          return (
            <div key={i} className='flex items-center text-label2-regular'>
              {data.datasets && (
                <>
                  <div
                    className='mr-3 h-5 w-5 min-w-5 rounded-sm'
                    style={{
                      backgroundColor: Array.isArray(
                        data.datasets[0].backgroundColor
                      )
                        ? data.datasets[0].backgroundColor[i]
                        : undefined,
                    }}
                  ></div>
                  <p className='text-extra-medium text-gray-60'>
                    {String(label)}
                  </p>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChartWrapper;
