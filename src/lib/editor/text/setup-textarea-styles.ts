import Konva from 'konva';

interface TextareaStylesProps {
  textarea: HTMLTextAreaElement;
  textNode: Konva.Text;
  areaPosition: { x: number; y: number };
}

export const setupTextareaStyles = ({
  textarea,
  textNode,
  areaPosition,
}: TextareaStylesProps) => {
  textarea.style.position = 'absolute';
  textarea.style.left = `${areaPosition.x}px`;
  textarea.style.top = `${areaPosition.y}px`;
  textarea.style.width = `${textNode.width() - textNode.padding() * 2}px`;
  textarea.style.height = `${textNode.height() - textNode.padding() * 2 + 5}px`;
  textarea.style.fontSize = `${textNode.fontSize()}px`;
  textarea.style.border = 'none';
  textarea.style.padding = '0px';
  textarea.style.margin = '0px';
  textarea.style.overflow = 'hidden';
  textarea.style.background = 'none';
  textarea.style.outline = 'none';
  textarea.style.resize = 'none';
  textarea.style.lineHeight = textNode.lineHeight().toString();
  textarea.style.fontFamily = textNode.fontFamily();
  textarea.style.transformOrigin = 'left top';
  textarea.style.textAlign = textNode.align();

  const fillColor = textNode.fill();
  textarea.style.color = typeof fillColor === 'string' ? fillColor : '#000000';

  const rotation = textNode.rotation();
  let transform = '';
  if (rotation) {
    transform += `rotateZ(${rotation}deg)`;
  }
  textarea.style.transform = transform;

  textarea.style.height = 'auto';
  textarea.style.height = `${textarea.scrollHeight + 3}px`;
};
