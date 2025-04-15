import { useCardSave } from '@/hooks/mutations/use-card-save';
import { useEditorStore } from '@/store/editor.store';
import { Json, TablesInsert } from '@/types/supabase';
import { createClient } from '@/utils/supabase/client';
import { v4 } from 'uuid';

const EditorTopbar = () => {
  const undo = useEditorStore((state) => state.undo);
  const redo = useEditorStore((state) => state.redo);
  const histories = useEditorStore((state) => state.histories);
  const historyIdx = useEditorStore((state) => state.historyIdx);

  const canvasElements = useEditorStore((state) => state.canvasElements);
  const { mutate: saveCard, isPending } = useCardSave();

  const handleSave = async () => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }

    const payload: TablesInsert<'cards'> = {
      user_id: user.id,
      title: '임시 테스트 제목2',
      template_id: null,
      status: 'draft',
      front_content: canvasElements as unknown as Json,
      back_content: [] as unknown as Json,
      slug: v4(),
      frontImgURL: null,
      backImgURL: null,
    };

    saveCard(payload, {
      onSuccess: () => alert('저장 성공'),
      onError: (e) => {
        console.error('저장 실패:', e);
        alert('저장 실패');
      },
    });
  };

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
      <button
        onClick={handleSave}
        disabled={isPending}
        className='rounded bg-primary-40 text-white'
      >
        {isPending ? '저장 중...' : '저장하기'}
      </button>
    </div>
  );
};
export default EditorTopbar;
