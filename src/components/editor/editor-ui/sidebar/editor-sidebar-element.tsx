import ElementsTemplates from '../../elements/templates/elements-templates';
import ElementsUploads from '../../elements/uploads/elements-uploads';
import TextSidebar from '../../elements/text/text-sidebar';
import { useEditorStore } from '@/store/editor.store';
import { CATEGORY } from '@/constants/editor.constant';
import ElementsPictures from '../../elements/pictures/elements-pictures';
import ElementsDiagrams from '../../elements/diagrams/elements-diagrams';
import ElementsBackgrounds from '../../elements/backgrounds/elements-backgrounds';
import ElementsSocials from '../../elements/qr-social/elements-social';

const EditorSidebarElement = ({ category }: { category: string }) => {
  const selectedElementType = useEditorStore(
    (state) => state.selectedElementType
  );
  const convertEngToKor = (type: string | null) => {
    switch (type) {
      case 'text':
        return CATEGORY.TEXT;
      case 'image':
        return CATEGORY.PICTURE;
      case 'upload':
        return CATEGORY.UPLOAD;
    }
  };
  const convertType = convertEngToKor(selectedElementType);

  const finalCategory = selectedElementType ? convertType : category;

  return (
    <div className='flex w-60 flex-col'>
      {finalCategory === CATEGORY.TEMPLATE && <ElementsTemplates />}
      {finalCategory === CATEGORY.PICTURE && <ElementsPictures />}
      {finalCategory === CATEGORY.UPLOAD && <ElementsUploads />}
      {finalCategory === CATEGORY.ELEMENT && <ElementsDiagrams />}
      {finalCategory === CATEGORY.TEXT && <TextSidebar />}
      {finalCategory === CATEGORY.BACKGROUND && <ElementsBackgrounds />}
      {finalCategory === CATEGORY.SOCIAL && <ElementsSocials />}
    </div>
  );
};

export default EditorSidebarElement;
