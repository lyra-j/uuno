import MinusIcon from '@/components/icons/editor/topbar-minus';
import PlusIcon from '@/components/icons/editor/topbar-plus';
import RedoIcon from '@/components/icons/editor/topbar-redo';
import ResetIcon from '@/components/icons/editor/topbar-reset';
import SwitchIcon from '@/components/icons/editor/topbar-switch';
import UndoIcon from '@/components/icons/editor/topbar-undo';
import { sideBarStore } from '@/store/editor.sidebar.store';
import { useEditorStore } from '@/store/editor.store';

const EditorTopbar = () => {
  const undo = useEditorStore((state) => state.undo);
  const redo = useEditorStore((state) => state.redo);
  const histories = useEditorStore((state) => state.histories);
  const historyIdx = useEditorStore((state) => state.historyIdx);
  const zoom = sideBarStore((state) => state.zoom);
  const setZoom = sideBarStore((state) => state.setZoom);
  const reset = useEditorStore((state) => state.reset);

  return (
    <div
      className='flex items-center border-b border-[#E1E2E4] bg-white'
      style={{ height: '40px' }}
    >
      <div className='flex flex-row items-center space-x-[20px] px-5'>
        <SwitchIcon className='cursor-pointer' />
        <div className='h-6 border-l border-[#D1D1D1]' />

        <ResetIcon onClick={reset} className='cursor-pointer' />
        <div className='h-6 border-l border-[#D1D1D1]' />

        <div className='flex items-center space-x-[14px]'>
          <button onClick={undo} disabled={historyIdx < 1}>
            <UndoIcon />
          </button>
          <button onClick={redo} disabled={historyIdx === histories.length - 1}>
            <RedoIcon />
          </button>
        </div>

        <div className='h-6 border-l border-[#D1D1D1]' />
        <div className='flex items-center space-x-[8px]'>
          <MinusIcon
            className='flex h-6 w-6 cursor-pointer items-center justify-center'
            onClick={() => setZoom(Math.max(0.3, zoom - 0.1))}
          />
          <input
            type='number'
            value={Math.floor(zoom * 100)}
            onChange={(e) => setZoom(Number(e.target.value) * 0.01)}
            className='h-6 w-[60px] rounded border text-center'
          />
          <PlusIcon
            className='flex h-6 w-6 items-center justify-center'
            onClick={() => setZoom(Math.min(3, zoom + 0.1))}
          />
        </div>
        <p className='absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-sm text-gray-600'>
          김노비의 포트폴리오
        </p>
      </div>
    </div>
  );
};
export default EditorTopbar;
