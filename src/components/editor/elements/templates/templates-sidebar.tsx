'use client';

import { useTemplateList } from '@/hooks/queries/use-template-list';
import { sideBarStore } from '@/store/editor.sidebar.store';
import { useEditorStore } from '@/store/editor.store';
import { CardContent } from '@/types/editor.type';
import { Templates } from '@/types/supabase.type';
import { sweetComingSoonAlert } from '@/utils/common/sweet-coming-soon-alert';

const TemplateSidebar = () => {
  const { data: templates, isPending, isError } = useTemplateList();

  const setTemplate = useEditorStore((state) => state.setTemplate);
  const setCanvasElements = useEditorStore((state) => state.setCanvasElements);
  const setCanvasBackElements = useEditorStore(
    (state) => state.setCanvasBackElements
  );
  const setBackgroundColor = useEditorStore(
    (state) => state.setBackgroundColor
  );
  const setBackgroundColorBack = useEditorStore(
    (state) => state.setBackgroundColorBack
  );

  //템플릿 적용 핸들러
  const handleApplyTemplate = (template: Templates) => {
    if (!template.content) return;
    const content = template.content as CardContent;
    setTemplate(template);

    if (content.canvasElements) {
      setCanvasElements(content.canvasElements);
    }
    if (content.backgroundColor) {
      setBackgroundColor(content.backgroundColor);
    }
    if (content.canvasBackElements) {
      setCanvasBackElements(content.canvasBackElements);
    }
    if (content.backgroundColorBack) {
      setBackgroundColorBack(content.backgroundColorBack);
    }
  };

  if (isPending) return <p>불러오는 중...</p>;
  if (isError) return <p>불러오기에 실패</p>;

  return (
    <div className='mt-[14px] h-full w-full space-y-4 overflow-auto px-[18px]'>
      <p className='text-caption-medium'>템플릿</p>
      {templates?.data.slice().map((template, idx) => (
        <div
          key={template.id}
          onClick={
            idx === 0
              ? () => handleApplyTemplate(template)
              : sweetComingSoonAlert
          }
          className='cursor-pointer space-y-[14px] border'
        >
          <img
            src={template.thumbnail || ''}
            alt={template.name}
            className='aspect-[3/2] w-full rounded object-cover px-2'
          />
        </div>
      ))}
    </div>
  );
};

export default TemplateSidebar;
