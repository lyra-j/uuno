'use client';
import React, { useRef, useEffect } from 'react';
import { Html } from 'react-konva-utils';
import Konva from 'konva';
import { setupTextareaStyles } from '@/lib/editor/text/setup-textarea-styles';

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

    setupTextareaStyles({ textarea, textNode, areaPosition });

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
