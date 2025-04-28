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
    <div className='flex max-h-56 gap-5 md:flex-col md:gap-0'>
      <div className='relative aspect-square w-2/5 md:h-[118px] md:w-auto lg:mx-5'>
        <Doughnut data={data} options={config.options} plugins={plugins} />
      </div>
      <div className='w-3/5 flex-1 space-y-2 overflow-auto md:mt-4 md:w-full'>
        <div className='grid grid-cols-2 gap-2 md:grid-cols-1'>
          {data.labels?.map((label, i) => {
            return (
              <div key={i} className='flex items-center text-label2-regular'>
                {data.datasets && (
                  <>
                    <div
                      className='mr-1 h-3 w-3 min-w-3'
                      style={{
                        backgroundColor: Array.isArray(
                          data.datasets[0].backgroundColor
                        )
                          ? data.datasets[0].backgroundColor[i]
                          : undefined,
                      }}
                    ></div>
                    <p className='break-keep text-caption-medium text-gray-60 md:text-extra-medium'>
                      {String(label)}
                    </p>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ChartWrapper;
