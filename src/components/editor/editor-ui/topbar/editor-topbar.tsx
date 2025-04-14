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
    <div className='flex flex-row gap-4'>
      <button onClick={reset}>재설정</button>
      <div>
        <button onClick={undo} disabled={historyIdx < 1}>
          undo
        </button>
        <button onClick={redo} disabled={historyIdx === histories.length - 1}>
          redo
        </button>
      </div>
      <div className='flex flex-row'>
        <button onClick={() => setZoom(Math.max(0.3, zoom - 0.1))}>-</button>
        <input
          type='number'
          value={Math.floor(zoom * 100)}
          onChange={(e) => {
            setZoom(Number(e.target.value) * 0.01);
          }}
        />
        <button onClick={() => setZoom(Math.min(3, zoom + 0.1))}>+</button>
      </div>
    </div>
  );
};
export default EditorTopbar;
