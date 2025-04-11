import InteractiveTemplateList from '@/components/template-list/interactive-template-list';
import { Templates } from '@/types/supabase.type';
import { createClient as createServerSupabaseClient } from '@/utils/supabase/server';

const TemplateList = async () => {
  // SSR
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from('templates')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('템플릿 불러오기 에러: ', error.message);
    // 에러 페이지 사용 예정
    return <div>템플릿 불러오기 에러</div>;
  }

  const templates: Templates[] = data || [];

  return (
    <section>
      <InteractiveTemplateList templates={templates} />
    </section>
  );
};

export default TemplateList;
