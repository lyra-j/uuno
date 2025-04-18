import TextSidebar from '../../elements/text/text-sidebar';
import { useEditorStore } from '@/store/editor.store';
import { CATEGORY } from '@/constants/editor.constant';
import ElementsDiagrams from '../../elements/diagrams/elements-diagrams';
import { convertEngToKor } from '@/utils/editor/editor-engtokor.util';
import UploadsSidebar from '../../elements/uploads/uploads-sidebar';
import BackgroundSidebar from '../../elements/backgrounds/background-sidebar';
import TextStyleSidebar from '../../elements/text/text-style-sidebar';
import ImagesSidebar from '../../elements/images/images-sidebar';
import QrsocialSidebar from '../../elements/qr-social/qrsocial-sidebar';
import TemplatesSidebar from '../../elements/templates/templates-sidebar';

const EditorSidebarElement = ({ category }: { category: string }) => {
  const selectedElementId = useEditorStore((state) => state.selectedElementId);
  const selectedElementType = useEditorStore(
    (state) => state.selectedElementType
  );
  const convertType = selectedElementType
    ? convertEngToKor(selectedElementType)
    : null;

  const finalCategory = convertType || category;

  return (
    <div
      className='flex w-60 flex-col'
      style={{ borderRight: '1px solid var(--Gray-20, #DBDCDF)' }}
    >
      {selectedElementId && selectedElementType === 'text' ? (
        <TextStyleSidebar />
      ) : (
        <>
          {finalCategory === CATEGORY.TEMPLATE && <TemplatesSidebar />}
          {finalCategory === CATEGORY.IMAGE && <ImagesSidebar />}
          {finalCategory === CATEGORY.UPLOAD && <UploadsSidebar />}
          {finalCategory === CATEGORY.ELEMENT && <ElementsDiagrams />}
          {finalCategory === CATEGORY.TEXT && <TextSidebar />}
          {finalCategory === CATEGORY.BACKGROUND && <BackgroundSidebar />}
          {finalCategory === CATEGORY.SOCIAL && <QrsocialSidebar />}
        </>
      )}
    </div>
  );
};

export default EditorSidebarElement;
