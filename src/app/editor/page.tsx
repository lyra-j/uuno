'use client';

import EditorContainer from '@/components/editor/editor-container';
import EditorBottomTab from '@/components/editor/editor-ui/bottomTab/editor-bottom-tab';
import EditorSideBar from '@/components/editor/editor-ui/sidebar/editor-sidebar';
import EditorTopbar from '@/components/editor/editor-ui/topbar/editor-topbar';
import CanvasSelectModal from '@/components/editor/modal/editor-vt-hr-select-modal';
import { useCardContent } from '@/hooks/queries/use-card-interaction';
import { getTemplateData } from '@/hooks/queries/use-template-single';
import { useEditorStore } from '@/store/editor.store';
import { CardContent } from '@/types/cards.type';
import { TemplateContent } from '@/types/templates.type';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';

const EditPage = () => {
  const params = useSearchParams();
  const slug = params.get('slug') || '';
  const templateId = params.get('templateId') || '';

  const containerRef = useRef<HTMLDivElement>(null);

  const { data } = useCardContent(slug);

  const {
    data: templateData,
    isError,
    isPending,
  } = getTemplateData(templateId);

  const sessionData = sessionStorage.getItem('editor-storage');
  if (!sessionData) return;
  const sessionContent = JSON.parse(sessionData).state;

  const {
    redo,
    undo,
    setSelectedElementId,
    setEditingElementId,
    setSelectedElementType,
    setCanvasElements,
    setBackgroundColor,
    setCanvasBackElements,
    setBackgroundColorBack,
    setTitle,
  } = useEditorStore(
    useShallow((state) => ({
      redo: state.redo,
      undo: state.undo,
      setSelectedElementId: state.setSelectedElementId,
      setEditingElementId: state.setEditingElementId,
      setSelectedElementType: state.setSelectedElementType,
      setCanvasElements: state.setCanvasElements,
      setBackgroundColor: state.setBackgroundColor,
      setCanvasBackElements: state.setCanvasBackElements,
      setBackgroundColorBack: state.setBackgroundColorBack,
      setTitle: state.setTitle,
    }))
  );

  const setCommonCanvasData = (content: CardContent | TemplateContent) => {
    setCanvasElements(content.canvasElements);
    setBackgroundColor(content.backgroundColor);
    setCanvasBackElements(content.canvasBackElements);
    setBackgroundColorBack(content.backgroundColorBack);
  };

  const isSessionContent =
    sessionContent.canvasElements.length > 0 ||
    sessionContent.canvasBackElements > 0 ||
    sessionContent.backgroundColor ||
    sessionContent.backgroundColorBack;

  // 내 명함 데이터
  useEffect(() => {
    if (isSessionContent) {
      setCommonCanvasData(sessionContent);
    } else if (data) {
      const { content, title } = data;
      setTitle(title);
      setCommonCanvasData(content);
    } else if (templateData) {
      const { content } = templateData;
      setCommonCanvasData(content);
    }
  }, [data, templateData, sessionData]);

  // undo redo 커맨드 키
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
      const ctrlOrCmd = isMac ? e.metaKey : e.ctrlKey;

      if (ctrlOrCmd && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          // Ctrl+Shift+Z or Cmd+Shift+Z
          redo();
        } else {
          // Ctrl+Z or Cmd+Z
          undo();
        }
      }
      // Ctrl + y
      if (ctrlOrCmd && e.key.toLocaleLowerCase() === 'y') {
        e.preventDefault();
        redo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  const isHorizontal = data ? data.isHorizontal : templateData?.isHorizontal;

  if (isError) return <>...Error</>;
  if (isPending) return <>...loading</>;

  return (
    <div className='flex h-[calc(100vh-64px)] flex-row overflow-hidden'>
      <CanvasSelectModal
        isHorizontal={
          isHorizontal === true
            ? true
            : isHorizontal === false
              ? false
              : undefined
        }
      />
      <EditorSideBar />
      <div ref={containerRef} className='flex flex-1 flex-col bg-gray-5'>
        <EditorTopbar />
        <div
          className='flex h-full w-full items-center justify-center overflow-auto'
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedElementId(null);
              setEditingElementId(null);
              setSelectedElementType(null);
            }
          }}
        >
          <EditorContainer />
        </div>
        <EditorBottomTab />
      </div>
    </div>
  );
};

export default EditPage;
