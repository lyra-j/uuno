import { useEditorStore } from '@/store/editor.store';

const EditorBottomTab = () => {
  const setCanvasFront = useEditorStore((state) => state.setCanvasFront);
  return (
    <div className='flex flex-row justify-center'>
      <button
        onClick={() => {
          setCanvasFront(true);
        }}
      >
        앞면
      </button>
      <button
        onClick={() => {
          setCanvasFront(false);
        }}
      >
        뒷면
      </button>
    </div>
  );
};

export default EditorBottomTab;
