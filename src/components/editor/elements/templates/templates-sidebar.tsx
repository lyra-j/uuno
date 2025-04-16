'use client';
import React from 'react';
import { useTemplateList } from '@/hooks/queries/use-template-list';

const TemplateSidebar = () => {
  const { data, isLoading, isError } = useTemplateList();

  return (
    <div className='h-full w-full p-[18px]'>
      <h2 className='mb-4 text-lg font-bold'>템플릿</h2>

      {isLoading && <p>불러오는 중...</p>}
      {isError && <p>불러오는데 실패했습니다.</p>}

      <div className='grid grid-cols-2 gap-2'>
        {data?.data.map((template) => (
          <div key={template.id} className='relative cursor-pointer border p-2'>
            {/* <img
              src={template.thumbnailUrl || '/default-thumbnail.jpg'}
              alt={template.name}
              className='w-full object-cover'
            /> */}
            <p className='mt-1 text-sm'>{template.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSidebar;
