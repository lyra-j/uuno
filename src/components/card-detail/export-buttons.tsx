'use client';

import { useCardDataStore } from '@/store/card-data.store';
import CsvIcon from '../icons/csv-icon';
import PdfIcon from '../icons/pdf-icon';
import CsvDisableIcon from '../icons/csv-disable-icon';
import PdfDisableIcon from '../icons/pdf-disable-icon';

const ExportButtons = () => {
  const hasData = useCardDataStore((state) => state.hasData);

  return (
    <div className='flex gap-2'>
      {!hasData ? (
        <>
          <button className='flex gap-1 px-2 py-1 text-label2-regular text-gray-40'>
            <CsvIcon />
            CSV
          </button>
          <button className='flex gap-1 px-2 py-1 text-label2-regular text-gray-40'>
            <PdfIcon />
            PDF
          </button>
        </>
      ) : (
        <>
          <button className='flex gap-1 px-2 py-1 text-label2-regular text-primary-40'>
            <CsvDisableIcon />
            CSV
          </button>
          <button className='flex gap-1 px-2 py-1 text-label2-regular text-primary-40'>
            <PdfDisableIcon />
            PDF
          </button>
        </>
      )}
    </div>
  );
};

export default ExportButtons;
