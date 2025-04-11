import { useEditorStore } from '@/store/editor.store';

interface EditorTopbarProps {
  handleSave: () => void;
}

const EditorTopbar = ({ handleSave }: EditorTopbarProps) => {
  const undo = useEditorStore((state) => state.undo);
  const redo = useEditorStore((state) => state.redo);
  return (
    <div className='flex flex-row gap-4'>
      <button>재설정</button>
      <div>
        <button onClick={undo}>undo</button>
        <button onClick={redo}>redo</button>
      </div>
      <div className='flex flex-row'>
        <button>-</button>
        <input type='text' />
        <button>+</button>
      </div>
      <button onClick={handleSave} className='bg-red-500 text-white'>
        저장하기
      </button>
    </div>
  );
};
export default EditorTopbar;
