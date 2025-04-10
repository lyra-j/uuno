'use client';
import React, { useRef, useEffect } from 'react';
import { Html } from 'react-konva-utils';
import Konva from 'konva';

interface TextEditorProps {
  textNode: Konva.Text;
  initialText: string;
  onChange: (newText: string) => void;
  onClose: () => void;
}

const TextEditContent = ({
  textNode,
  initialText,
  onChange,
  onClose,
}: TextEditorProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const stage = textNode.getStage();
    if (!stage) return;

    // 텍스트 노드의 절대 위치를 가져옴
    const textPosition = textNode.getAbsolutePosition();

    const areaPosition = {
      x: textPosition.x,
      y: textPosition.y,
    };
    textarea.value = initialText;

    const setupTextareaStyles = () => {
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

      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight + 3}px`;
    };

    setupTextareaStyles();

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
    const timer = setTimeout(() => {
      window.addEventListener('click', handleOutsideClick);
    }, 0);

    return () => {
      clearTimeout(timer);
      textarea.removeEventListener('keydown', handleKeyDown);
      textarea.removeEventListener('input', handleInput);
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [textNode, initialText, onChange, onClose]);

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
