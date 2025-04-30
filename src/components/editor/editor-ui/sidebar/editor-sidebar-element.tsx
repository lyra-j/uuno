import TextSidebar from '@/components/editor/elements/text/text-sidebar';
import { useEditorStore } from '@/store/editor.store';
import { CATEGORY } from '@/constants/editor.constant';
import { convertEngToKor } from '@/utils/editor/editor-engtokor.util';
import UploadsSidebar from '@/components/editor/elements/uploads/uploads-sidebar';
import BackgroundSidebar from '@/components/editor/elements/backgrounds/background-sidebar';
import TextStyleSidebar from '@/components/editor/elements/text/text-style-sidebar';
import ImagesSidebar from '@/components/editor/elements/images/images-sidebar';
import QrsocialSidebar from '@/components/editor/elements/qr-social/qrsocial-sidebar';
import TemplatesSidebar from '@/components/editor/elements/templates/templates-sidebar';
import ElementsSidebar from '@/components/editor/elements/element/element-sidebar';
import ElementStyleSidebar from '@/components/editor/elements/element/element-style-sidebar';

const EditorSidebarElement = ({ category }: { category: string }) => {
  const selectedElementId = useEditorStore((state) => state.selectedElementId);
  const selectedElementType = useEditorStore(
    (state) => state.selectedElementType
  );
  const convertType = selectedElementType
    ? convertEngToKor(selectedElementType)
    : null;

  const finalCategory = convertType || category;

  // Todo 추후 프로젝트가 더 커지면 따로 분리(지금은 txt, ele 2개밖에 없어서 둠)
  const switchSideBar = () => {
    if (selectedElementId) {
      switch (selectedElementType) {
        case 'text':
          return <TextStyleSidebar />;
        case 'element':
          return <ElementStyleSidebar />;
      }
    }

    return (
      <>
        {finalCategory === CATEGORY.TEMPLATE && <TemplatesSidebar />}
        {finalCategory === CATEGORY.IMAGE && <ImagesSidebar />}
        {finalCategory === CATEGORY.UPLOAD && <UploadsSidebar />}
        {finalCategory === CATEGORY.ELEMENT && <ElementsSidebar />}
        {finalCategory === CATEGORY.TEXT && <TextSidebar />}
        {finalCategory === CATEGORY.BACKGROUND && <BackgroundSidebar />}
        {finalCategory === CATEGORY.SOCIAL && <QrsocialSidebar />}
      </>
    );
  };

  return (
    <div
      className='flex w-60 flex-col items-center'
      style={{ borderRight: '1px solid var(--Gray-20, #DBDCDF)' }}
    >
      {switchSideBar()}
    </div>
  );
};

export default EditorSidebarElement;
