import { CATEGORY } from '@/constants/editor.constant';
import ElementsBackgrounds from '../../elements/backgrounds/elements-backgrounds';
import ElementsDiagrams from '../../elements/diagrams/elements-diagrams';
import ElementsPictures from '../../elements/pictures/elements-pictures';
import ElementsSocials from '../../elements/qr-social/elements-social';
import ElementsTemplates from '../../elements/templates/elements-templates';
import ElementsUploads from '../../elements/uploads/elements-uploads';

const EditorSidebarElement = ({ category }: { category: string }) => {
  return (
    <div className='flex w-60 flex-col'>
      {category === CATEGORY.TEMPLATE && <ElementsTemplates />}
      {category === CATEGORY.PICTURE && <ElementsPictures />}
      {category === CATEGORY.UPLOAD && <ElementsUploads />}
      {category === CATEGORY.ELEMENT && <ElementsDiagrams />}
      {/* {category === "텍스트" && <Elements/>} */}
      {category === CATEGORY.BACKGROUND && <ElementsBackgrounds />}
      {category === CATEGORY.SOCIAL && <ElementsSocials />}
    </div>
  );
};

export default EditorSidebarElement;
