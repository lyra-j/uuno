import { CATEGORY, ElEMENT_TYPE } from '@/constants/editor.constant';
import ElementsBackgrounds from '../../elements/backgrounds/elements-backgrounds';
import ElementsDiagrams from '../../elements/diagrams/elements-diagrams';
import ElementsPictures from '../../elements/pictures/elements-pictures';
import ElementsSocials from '../../elements/qr-social/elements-social';
import ElementsTemplates from '../../elements/templates/elements-templates';
import TextSidebar from '../../elements/text/text-sidebar';
import UploadsSidebar from '../../elements/uploads/uploads-sidebar';

const EditorSidebarElement = ({ category }: { category: string }) => {
  return (
    <div className='flex w-60 flex-col items-center border-r px-[18px] py-[14px]'>
      {category === ElEMENT_TYPE.TEMPLATE && <ElementsTemplates />}
      {category === ElEMENT_TYPE.PICTURE && <ElementsPictures />}
      {category === ElEMENT_TYPE.UPLOAD && <UploadsSidebar />}
      {category === ElEMENT_TYPE.ELEMENT && <ElementsDiagrams />}
      {category === ElEMENT_TYPE.TEXT && <TextSidebar />}
      {category === ElEMENT_TYPE.BACKGROUND && <ElementsBackgrounds />}
      {category === ElEMENT_TYPE.SOCIAL && <ElementsSocials />}
    </div>
  );
};

export default EditorSidebarElement;
