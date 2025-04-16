'use client';

import { useTemplateList } from '@/hooks/queries/use-template-list';
import { useEditorStore } from '@/store/editor.store';

const TemplateSidebar = () => {
  const { data: templates, isLoading, isError } = useTemplateList();

  if (isLoading) return <p>불러오는 중...</p>;
  if (isError) return <p>불러오기에 실패했습니다.</p>;

  return (
    <div className='mt-[14px] h-full w-full space-y-4 overflow-auto px-[18px]'>
      <p className='text-caption-medium'>앞면 템플릿</p>
      {templates?.data
        .slice()
        .reverse()
        .map((template) => (
          <div
            key={template.id}
            className='cursor-pointer space-y-[14px] border'
          >
            <img
              src={template.thumbnail || '/default-thumbnail.jpg'}
              alt={template.name}
              className='aspect-[3/2] w-full rounded object-cover px-2'
            />
          </div>
        ))}
    </div>
  );
};

export default TemplateSidebar;
