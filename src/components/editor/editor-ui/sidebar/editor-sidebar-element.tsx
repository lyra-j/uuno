import ElementsBackgrounds from '../../elements/backgrounds/elements-backgrounds';
import ElementsDiagrams from '../../elements/diagrams/elements-diagrams';
import ElementsPictures from '../../elements/pictures/elements-pictures';
import ElementsSocials from '../../elements/qr-social/elements-social';
import ElementsTemplates from '../../elements/templates/elements-templates';
import ElementsUploads from '../../elements/uploads/elements-uploads';

const EditorSidebarElement = ({ category }: { category: string }) => {
  return (
    <div className='flex w-60 flex-col'>
      {category === '템플릿' && <ElementsTemplates />}
      {category === '사진' && <ElementsPictures />}
      {category === '업로드' && <ElementsUploads />}
      {category === '요소' && <ElementsDiagrams />}
      {/* {category === "텍스트" && <Elements/>} */}
      {category === '배경' && <ElementsBackgrounds />}
      {category === 'QR/소셜' && <ElementsSocials />}
    </div>
  );
};

export default EditorSidebarElement;
