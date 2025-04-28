'use client';

import { useCardDataStore } from '@/store/card-data.store';
import CsvIcon from '@/components/icons/csv-icon';
import PdfIcon from '@/components/icons/pdf-icon';
import CsvDisableIcon from '@/components/icons/csv-disable-icon';
import PdfDisableIcon from '@/components/icons/pdf-disable-icon';
import { sweetComingSoonAlert } from '@/utils/common/sweet-coming-soon-alert';
import DownloadIcon from '@/components/icons/card-detail/download-icon';

const ExportButtons = () => {
  const hasData = useCardDataStore((state) => state.hasData);

  return (
    <div className='flex gap-2'>
      {!hasData ? (
        <>
          <div className='hidden md:flex'>
            <button
              className='flex gap-1 px-2 py-1 text-label2-regular text-gray-40'
              disabled
              aria-label='CSV 내보내기 (데이터 없음)'
            >
              <CsvDisableIcon />
              CSV
            </button>
            <button
              className='flex gap-1 px-2 py-1 text-label2-regular text-gray-40'
              disabled
              aria-label='PDF 내보내기 (데이터 없음)'
            >
              <PdfDisableIcon />
              PDF
            </button>
          </div>
          <div className='mr-5 block md:hidden'>
            <button disabled>
              <DownloadIcon isActive={false} />
            </button>
          </div>
        </>
      ) : (
        <>
          <div className='hidden md:flex'>
            <button
              onClick={sweetComingSoonAlert}
              className='flex gap-1 px-2 py-1 text-label2-regular text-primary-40'
            >
              <CsvIcon />
              CSV
            </button>
            <button
              onClick={sweetComingSoonAlert}
              className='flex gap-1 px-2 py-1 text-label2-regular text-primary-40'
            >
              <PdfIcon />
              PDF
            </button>
          </div>
          <div className='mr-5 block md:hidden'>
            <button onClick={sweetComingSoonAlert}>
              <DownloadIcon isActive={true} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ExportButtons;
