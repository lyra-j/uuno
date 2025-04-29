'use client';

import LoadingSpinner from '@/components/common/loading-spinner';
import EditorContainer from '@/components/editor/editor-container';
import EditorBottomTab from '@/components/editor/editor-ui/bottomTab/editor-bottom-tab';
import EditorSideBar from '@/components/editor/editor-ui/sidebar/editor-sidebar';
import EditorTopbar from '@/components/editor/editor-ui/topbar/editor-topbar';
import CanvasSelectModal from '@/components/editor/modal/editor-vt-hr-select-modal';
import { useCardDataById } from '@/hooks/queries/use-card-by-id-single';
import { getTemplateData } from '@/hooks/queries/use-template-single';
import { useRedoUndoPress } from '@/hooks/use-redo-undo-press';
import { useEditorStore } from '@/store/editor.store';
import { CardContent } from '@/types/cards.type';
import { TemplateContent } from '@/types/templates.type';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

const EditPage = () => {
  const params = useSearchParams();
  const cardId = params.get('cardId') || '';
  const templateId = params.get('templateId') || '';
  const containerRef = useRef<HTMLDivElement>(null);
  const { data: cardData } = useCardDataById(cardId);

  const {
    data: templateData,
    isError,
    isPending,
  } = getTemplateData(templateId);

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
    setSlug,
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
      setSlug: state.setSlug,
    }))
  );

  const setCommonCanvasData = (content: CardContent | TemplateContent) => {
    setCanvasElements(content.canvasElements);
    setBackgroundColor(content.backgroundColor);
    setCanvasBackElements(content.canvasBackElements);
    setBackgroundColorBack(content.backgroundColorBack);
  };

  const [sessionContent, setSessionContent] = useState({
    canvasElements: [],
    canvasBackElements: [],
    backgroundColor: '',
    backgroundColorBack: '',
    title: '',
  });

  const isSessionContent =
    sessionContent.canvasElements.length > 0 ||
    sessionContent.canvasBackElements.length > 0 ||
    sessionContent.backgroundColor ||
    sessionContent.backgroundColorBack;

  // sessionStorage 접근을 클라이언트 측에서만 실행되도록 useEffect 내부로 이동
  useEffect(() => {
    const sessionData = sessionStorage.getItem('editor-storage');
    if (sessionData) {
      try {
        setSessionContent(JSON.parse(sessionData).state);
      } catch (error) {
        console.error('세션 데이터 파싱 실패:', error);
      }
    }
  }, []);

  // 내 명함 데이터
  useEffect(() => {
    if (isSessionContent) {
      setTitle(sessionContent.title);
      setCommonCanvasData(sessionContent);
    } else if (cardData) {
      setTitle(cardData.title);
      setCommonCanvasData(cardData.content);
      setSlug(cardData.slug);
    } else if (templateData) {
      setCommonCanvasData(templateData.content);
    }
  }, [cardData, templateData, sessionContent, setSlug]);

  // undo redo 커맨드 키
  useRedoUndoPress();

  const isHorizontal = cardData
    ? cardData.isHorizontal
    : templateData?.isHorizontal;

  if (isError) return <>...Error</>;
  if (isPending) return <LoadingSpinner />;

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
