interface EditorTopbarProps {
  handleSave: () => void;
}

const EditorTopbar = ({ handleSave }: EditorTopbarProps) => {
  return (
    <div className='flex flex-row gap-4'>
      <button>재설정</button>
      <div>
        <button>undo</button>
        <button>redo</button>
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
