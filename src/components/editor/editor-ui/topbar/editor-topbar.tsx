import MinusIcon from '@/components/icons/editor/topbar-minus';
import PlusIcon from '@/components/icons/editor/topbar-plus';
import RedoIcon from '@/components/icons/editor/topbar-redo';
import ResetIcon from '@/components/icons/editor/topbar-reset';
import SwitchIcon from '@/components/icons/editor/topbar-switch';
import UndoIcon from '@/components/icons/editor/topbar-undo';
import { MAX_ZOOM, MIN_ZOOM, ZOOM_RATION } from '@/constants/editor.constant';
import { sideBarStore } from '@/store/editor.sidebar.store';
import { useEditorStore } from '@/store/editor.store';
import { handleSwitchCard } from '@/utils/editor/warn-sweet-alert';
import { useSluggedSaveCard } from '../useSaveCard';

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

  const { handleSave, isPending } = useSluggedSaveCard();

  return (
    <div className='relative flex h-[45px] items-center border-b border-gray-10 bg-white'>
      <div className='flex flex-row items-center space-x-[20px] px-5'>
        <SwitchIcon className='cursor-pointer' onClick={handleSwitchCard} />
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
            className='w-full border-none text-center font-medium outline-none'
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
