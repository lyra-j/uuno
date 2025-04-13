import ElementsTemplates from '../../elements/templates/elements-templates';
import TextSidebar from '../../elements/text/text-sidebar';
import { useEditorStore } from '@/store/editor.store';
import { CATEGORY } from '@/constants/editor.constant';
import ElementsPictures from '../../elements/pictures/elements-pictures';
import ElementsDiagrams from '../../elements/diagrams/elements-diagrams';
import ElementsBackgrounds from '../../elements/backgrounds/elements-backgrounds';
import ElementsSocials from '../../elements/qr-social/elements-social';
import { convertEngToKor } from '@/utils/editor/editor-engtokor.util';
import UploadsSidebar from '../../elements/uploads/uploads-sidebar';

const EditorSidebarElement = ({ category }: { category: string }) => {
  const selectedElementType = useEditorStore(
    (state) => state.selectedElementType
  );
  const convertType = selectedElementType
    ? convertEngToKor(selectedElementType)
    : null;

  const finalCategory = convertType || category;
  console.log(finalCategory);

  return (
    <div className='flex w-60 flex-col'>
      {finalCategory === CATEGORY.TEMPLATE && <ElementsTemplates />}
      {finalCategory === CATEGORY.PICTURE && <ElementsPictures />}
      {finalCategory === CATEGORY.UPLOAD && <UploadsSidebar />}
      {finalCategory === CATEGORY.ELEMENT && <ElementsDiagrams />}
      {finalCategory === CATEGORY.TEXT && <TextSidebar />}
      {finalCategory === CATEGORY.BACKGROUND && <ElementsBackgrounds />}
      {finalCategory === CATEGORY.SOCIAL && <ElementsSocials />}
    </div>
  );
};

export default EditorSidebarElement;
