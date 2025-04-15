import MinusIcon from '@/components/icons/editor/topbar-minus';
import PlusIcon from '@/components/icons/editor/topbar-plus';
import RedoIcon from '@/components/icons/editor/topbar-redo';
import ResetIcon from '@/components/icons/editor/topbar-reset';
import SwitchIcon from '@/components/icons/editor/topbar-switch';
import UndoIcon from '@/components/icons/editor/topbar-undo';
import { MAX_ZOOM, MIN_ZOOM, ZOOM_RATION } from '@/constants/editor.constant';
import { useCardSave } from '@/hooks/mutations/use-card-save';
import { sideBarStore } from '@/store/editor.sidebar.store';
import { useEditorStore } from '@/store/editor.store';
import { Json, TablesInsert } from '@/types/supabase';
import { createClient } from '@/utils/supabase/client';
import { v4 } from 'uuid';

const EditorTopbar = () => {
  const undo = useEditorStore((state) => state.undo);
  const redo = useEditorStore((state) => state.redo);
  const histories = useEditorStore((state) => state.histories);
  const historyIdx = useEditorStore((state) => state.historyIdx);

  const zoom = sideBarStore((state) => state.zoom);
  const setZoom = sideBarStore((state) => state.setZoom);
  const reset = useEditorStore((state) => state.reset);

  const backHistories = useEditorStore((state) => state.backHistories);
  const backHistoriesIdx = useEditorStore((state) => state.backHistoryIdx);
  const isFront = useEditorStore((state) => state.isCanvasFront);

  const currentHistories = isFront ? histories : backHistories;
  const currentHistoriesIdx = isFront ? historyIdx : backHistoriesIdx;

  const title = useEditorStore((state) => state.title);
  const setTitle = useEditorStore((state) => state.setTitle);

  //저장로직
  const canvasElements = useEditorStore((state) => state.canvasElements);
  const canvasBackElements = useEditorStore(
    (state) => state.canvasBackElements
  );
  const backgroundColor = useEditorStore.getState().backgroundColor;
  const { mutate: saveCard, isPending } = useCardSave();

  const handleSave = async () => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }

    const payload: TablesInsert<'cards'> = {
      user_id: user.id,
      title: title || '제목 없음',
      template_id: null,
      status: 'draft',
      content: {
        backgroundColor,
        canvasElements,
        canvasBackElements,
      } as unknown as Json,
      slug: v4(),
      frontImgURL: null,
      backImgURL: null,
    };

    saveCard(payload, {
      onSuccess: () => alert('저장 성공'),
      onError: (e) => {
        console.error('저장 실패:', e);
        alert('저장 실패');
      },
    });
  };

  return (
    <div
      className='relative flex items-center border-b border-gray-10 bg-white'
      style={{ height: '45px' }}
    >
      <div className='flex flex-row items-center space-x-[20px] px-5'>
        <SwitchIcon className='cursor-pointer' />
        <div className='h-6 border-l border-[#D1D1D1]' />

        <ResetIcon onClick={reset} className='cursor-pointer' />
        <div className='h-6 border-l border-[#D1D1D1]' />

        <div className='flex items-center space-x-[14px]'>
          <button onClick={undo} disabled={currentHistoriesIdx < 1}>
            <UndoIcon />
          </button>
          <button
            onClick={redo}
            disabled={currentHistoriesIdx === currentHistories.length - 1}
          >
            <RedoIcon />
          </button>
        </div>

        <div className='h-6 border-l border-[#D1D1D1]' />
        <div className='flex items-center space-x-[8px]'>
          <MinusIcon
            className='flex h-6 w-6 cursor-pointer items-center justify-center'
            onClick={() => setZoom(Math.max(MIN_ZOOM, zoom - ZOOM_RATION))}
          />
          <input
            type='number'
            value={Math.floor(zoom * 100)}
            onChange={(e) => setZoom(Number(e.target.value) * 0.01)}
            className='h-6 w-[60px] rounded border text-center'
          />
          <PlusIcon
            className='flex h-6 w-6 items-center justify-center'
            onClick={() => setZoom(Math.min(MAX_ZOOM, zoom + ZOOM_RATION))}
          />
        </div>
        <p className='absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-sm text-gray-700'>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='제목을 입력하세요'
          />
        </p>
        <button
          onClick={handleSave}
          disabled={isPending}
          className='absolute right-1 rounded bg-primary-40 text-white'
        >
          {isPending ? '저장 중...' : '저장하기'}
        </button>
      </div>
    </div>
  );
};
export default EditorTopbar;
