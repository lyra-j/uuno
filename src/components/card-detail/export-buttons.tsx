'use client';

import { useCardDataStore } from '@/store/card-data.store';
import CsvIcon from '@/components/icons/csv-icon';
import PdfIcon from '@/components/icons/pdf-icon';
import CsvDisableIcon from '@/components/icons/csv-disable-icon';
import PdfDisableIcon from '@/components/icons/pdf-disable-icon';
import sweetAlertUtil from '@/utils/common/sweet-alert-util';

const ExportButtons = () => {
  const hasData = useCardDataStore((state) => state.hasData);
  const handleComingSoon = () => {
    sweetAlertUtil.info('곧 만나요!', '해당 기능은 곧 업데이트될 예정입니다');
  };

  return (
    <div className='flex gap-2'>
      {!hasData ? (
        <>
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
        </>
      ) : (
        <>
          <button
            onClick={handleComingSoon}
            className='flex gap-1 px-2 py-1 text-label2-regular text-primary-40'
          >
            <CsvIcon />
            CSV
          </button>
          <button
            onClick={handleComingSoon}
            className='flex gap-1 px-2 py-1 text-label2-regular text-primary-40'
          >
            <PdfIcon />
            PDF
          </button>
        </>
      )}
    </div>
  );
};

export default ExportButtons;
