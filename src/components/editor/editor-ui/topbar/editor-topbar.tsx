import MinusIcon from '@/components/icons/editor/topbar-minus';
import PlusIcon from '@/components/icons/editor/topbar-plus';
import RedoIcon from '@/components/icons/editor/topbar-redo';
import ResetIcon from '@/components/icons/editor/topbar-reset';
import SwitchIcon from '@/components/icons/editor/topbar-switch';
import UndoIcon from '@/components/icons/editor/topbar-undo';
import { MAX_ZOOM, MIN_ZOOM, ZOOM_RATION } from '@/constants/editor.constant';
import { sideBarStore } from '@/store/editor.sidebar.store';
import { useEditorStore } from '@/store/editor.store';
import ToolTip from '@/components/common/tooltip';
import { handleSwitchCard } from '@/utils/editor/warn-sweet-alert';
import { useShallow } from 'zustand/react/shallow';

const EditorTopbar = () => {
  const {
    undo,
    redo,
    histories,
    historyIdx,
    reset,
    backHistories,
    backHistoriesIdx,
    isCanvasFront: isFront,
    title,
    setTitle,
  } = useEditorStore(
    useShallow((state) => ({
      undo: state.undo,
      redo: state.redo,
      histories: state.histories,
      historyIdx: state.historyIdx,
      reset: state.reset,
      backHistories: state.backHistories,
      backHistoriesIdx: state.backHistoryIdx,
      isCanvasFront: state.isCanvasFront,
      title: state.title,
      setTitle: state.setTitle,
    }))
  );

  const isHorizontal = sideBarStore((state) => state.isHorizontal);
  const zoom = sideBarStore((state) => state.zoom);
  const setZoom = sideBarStore((state) => state.setZoom);

  const currentHistories = isFront ? histories : backHistories;
  const currentHistoriesIdx = isFront ? historyIdx : backHistoriesIdx;

  return (
    <div className='relative flex h-[45px] items-center border-b border-gray-10 bg-white'>
      <div className='flex flex-row items-center space-x-[20px] px-5'>
        <ToolTip text={isHorizontal ? '세로변환' : '가로변환'}>
          <SwitchIcon className='cursor-pointer' onClick={handleSwitchCard} />
        </ToolTip>
        <div className='h-6 border-l border-[#D1D1D1]' />

        <ToolTip text='초기화'>
          <ResetIcon onClick={reset} className='cursor-pointer' />
        </ToolTip>
        <div className='h-6 border-l border-[#D1D1D1]' />

        <div className='flex items-center space-x-[14px] pt-2'>
          <ToolTip text='되돌리기'>
            <button onClick={undo} disabled={currentHistoriesIdx < 1}>
              <UndoIcon />
            </button>
          </ToolTip>

          <ToolTip text='다시실행'>
            <button
              onClick={redo}
              disabled={currentHistoriesIdx === currentHistories.length - 1}
            >
              <RedoIcon />
            </button>
          </ToolTip>
        </div>

        <div className='h-6 border-l border-[#D1D1D1]' />
        <div className='flex items-center space-x-[8px]'>
          <MinusIcon
            className='flex h-6 w-6 cursor-pointer items-center justify-center'
            onClick={() => setZoom(Math.max(MIN_ZOOM, zoom - ZOOM_RATION))}
          />
          <input
            type='text'
            pattern='[0-9]*'
            inputMode='numeric'
            value={Math.floor(zoom * 100)}
            onChange={(e) => {
              const { value } = e.target;
              const num = Number(value);
              if (value !== '' && !isNaN(num)) {
                setZoom(num * 0.01);
              }
            }}
            className='h-6 w-[60px] rounded border text-center'
          />
          <PlusIcon
            className='flex h-6 w-6 cursor-pointer items-center justify-center'
            onClick={() => setZoom(Math.min(MAX_ZOOM, zoom + ZOOM_RATION))}
          />
        </div>
        <p className='absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-sm text-gray-700'>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='제목을 입력하세요'
            maxLength={20}
            className='w-full border-none text-center font-medium outline-none'
          />
        </p>
      </div>
    </div>
  );
};
export default EditorTopbar;
