import { CATEGORY } from '@/constants/editor.constant';
import ElementsBackgrounds from '../../elements/backgrounds/elements-backgrounds';
import ElementsDiagrams from '../../elements/diagrams/elements-diagrams';
import ElementsPictures from '../../elements/pictures/elements-pictures';
import ElementsSocials from '../../elements/qr-social/elements-social';
import ElementsTemplates from '../../elements/templates/elements-templates';
import ElementsUploads from '../../elements/uploads/uploads-sidebar';
import TextSidebar from '../../elements/text/text-sidebar';

const EditorSidebarElement = ({ category }: { category: string }) => {
  return (
    <div className='flex w-60 flex-col items-center border-r px-[18px] py-[14px]'>
      {category === 'template' && <ElementsTemplates />}
      {category === 'picture' && <ElementsPictures />}
      {category === 'upload' && <ElementsUploads />}
      {category === 'elemnet' && <ElementsDiagrams />}
      {category === 'text' && <TextSidebar />}
      {category === 'background' && <ElementsBackgrounds />}
      {category === 'social' && <ElementsSocials />}
    </div>
  );
};

export default EditorSidebarElement;
