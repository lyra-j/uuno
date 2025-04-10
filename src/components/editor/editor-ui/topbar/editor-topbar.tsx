const EditorTopbar = () => {
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
    </div>
  );
};
export default EditorTopbar;
