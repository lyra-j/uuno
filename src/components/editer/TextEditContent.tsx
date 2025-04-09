'use client';
import React, { useRef, useEffect } from 'react';
import { Html } from 'react-konva-utils';
import Konva from 'konva';

interface InlineTextEditorProps {
  textNode: Konva.Text;
  containerRef: React.RefObject<HTMLDivElement>;
  initialText: string;
  onChange: (newText: string) => void;
  onClose: () => void;
}

const TextEditContent: React.FC<InlineTextEditorProps> = ({
  textNode,
  containerRef,
  initialText,
  onChange,
  onClose,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!textareaRef.current) return;
    const textarea = textareaRef.current;
    const stage = textNode.getStage();
    if (!stage) return;

    // 텍스트 노드의 절대 위치를 가져옴
    const textPosition = textNode.getAbsolutePosition();

    // 부모 컨테이너의 bounding rect 사용
    const containerBox = containerRef.current?.getBoundingClientRect();
    if (!containerBox) return;

    const areaPosition = {
      x: containerBox.left + textPosition.x - 256,
      y: containerBox.top + textPosition.y - 64,
    };

    textarea.value = initialText;
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
    textarea.style.color =
      typeof fillColor === 'string' ? fillColor : '#000000';

    const rotation = textNode.rotation();
    let transform = '';
    if (rotation) {
      transform += `rotateZ(${rotation}deg)`;
    }
    textarea.style.transform = transform;

    // 동적으로 높이 재계산
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight + 3}px`;

    textarea.focus();

    const handleOutsideClick = (e: MouseEvent) => {
      if (e.target !== textarea) {
        onChange(textarea.value);
        onClose();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        onChange(textarea.value);
        onClose();
      }
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleInput = () => {
      const scale = textNode.getAbsoluteScale().x;
      textarea.style.width = `${textNode.width() * scale}px`;
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight + textNode.fontSize()}px`;
    };

    textarea.addEventListener('keydown', handleKeyDown);
    textarea.addEventListener('input', handleInput);
    setTimeout(() => {
      window.addEventListener('click', handleOutsideClick);
    });

    return () => {
      textarea.removeEventListener('keydown', handleKeyDown);
      textarea.removeEventListener('input', handleInput);
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [textNode, initialText, onChange, onClose, containerRef]);

  return (
    <Html>
      <textarea
        ref={textareaRef}
        style={{
          minHeight: '1em',
          position: 'absolute',
        }}
      />
    </Html>
  );
};

export default TextEditContent;
