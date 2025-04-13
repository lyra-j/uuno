import { useEditorStore } from '@/store/editor.store';

const EditorTopbar = () => {
  const undo = useEditorStore((state) => state.undo);
  const redo = useEditorStore((state) => state.redo);
  const histories = useEditorStore((state) => state.histories);
  const historyIdx = useEditorStore((state) => state.historyIdx);

  return (
    <div className='flex flex-row gap-4'>
      <button>재설정</button>
      <div>
        <button onClick={undo} disabled={historyIdx < 1}>
          undo
        </button>
        <button onClick={redo} disabled={historyIdx === histories.length - 1}>
          redo
        </button>
      </div>
      <div className='flex flex-row'>
        <button>-</button>
        <input type='text' />
        <button>+</button>
      </div>
    </div>
  );
};
export default EditorTopbar;
