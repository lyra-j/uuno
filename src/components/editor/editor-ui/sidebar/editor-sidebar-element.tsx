import ElementsTemplates from '../../elements/templates/elements-templates';
import TextSidebar from '../../elements/text/text-sidebar';
import { useEditorStore } from '@/store/editor.store';
import { CATEGORY } from '@/constants/editor.constant';
import ElementsDiagrams from '../../elements/diagrams/elements-diagrams';
import ElementsSocials from '../../elements/qr-social/elements-social';
import { convertEngToKor } from '@/utils/editor/editor-engtokor.util';
import UploadsSidebar from '../../elements/uploads/uploads-sidebar';
import ElementsImages from '../../elements/images/elements-images';
import BackgroundSidebar from '../../elements/backgrounds/background-sidebar';

const EditorSidebarElement = ({ category }: { category: string }) => {
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
      {finalCategory === CATEGORY.TEMPLATE && <ElementsTemplates />}
      {finalCategory === CATEGORY.IMAGE && <ElementsImages />}
      {finalCategory === CATEGORY.UPLOAD && <UploadsSidebar />}
      {finalCategory === CATEGORY.ELEMENT && <ElementsDiagrams />}
      {finalCategory === CATEGORY.TEXT && <TextSidebar />}
      {finalCategory === CATEGORY.BACKGROUND && <BackgroundSidebar />}
      {finalCategory === CATEGORY.SOCIAL && <ElementsSocials />}
    </div>
  );
};

export default EditorSidebarElement;
