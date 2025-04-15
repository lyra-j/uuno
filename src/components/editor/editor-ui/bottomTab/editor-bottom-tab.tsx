import { useEditorStore } from '@/store/editor.store';
import { Button } from '@/components/ui/button';

const EditorBottomTab = () => {
  const setCanvasFront = useEditorStore((state) => state.setCanvasFront);
  return (
    <div className='flex h-16 flex-row items-center justify-center bg-white'>
      <div className='flex h-[34px] w-[130px] items-center gap-2'>
        <Button className='flex w-[61px] items-center justify-center rounded-sm border px-2 py-5' onClick={() => {
          setCanvasFront(true);
        }}>
          앞면
        </Button>
        <Button className='flex w-[61px] items-center justify-center rounded-sm px-2 py-5' onClick={() => {
          setCanvasFront(false);
        }}>
          뒷면
        </Button>
      </div>

    </div>
  );
};

export default EditorBottomTab;
