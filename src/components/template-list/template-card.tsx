'use client';

import { Templates } from '@/types/supabase.type';
import Image from 'next/image';
import { CommonButton } from '../common/common-button';
import { useRouter } from 'next/navigation';

interface Props {
  template: Templates;
  onPreview: (imageUrl: string) => void;
}

const TemplateCard = ({ template, onPreview }: Props) => {
  const router = useRouter();

  //템플릿 적용 핸들러
  const handleApplyTemplate = () => {
    router.push(`/editor?templateId=${template.id}`);
  };

  return (
    <li className='group relative aspect-[278/274] min-w-[278px] rounded'>
      <Image
        src={template.thumbnail ?? '/placeholder.png'}
        alt={template.name}
        fill
        priority
        className='rounded-xl object-cover'
        sizes='(max-width: 768px) 100vw, 278px'
      />

      {/* hover 상태 오버레이 영역 */}
      <div className='absolute inset-0 flex flex-col items-center justify-center gap-[10px] rounded-xl bg-black/60 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100'>
        <CommonButton
          onClick={handleApplyTemplate}
          aria-label={`${template.name} 디자인 선택하기`}
          textClass='text-label2-medium'
          borderRadius='full'
          variant='primary'
          size='medium'
          width='145px'
          className='py-2'
        >
          디자인 선택하기
        </CommonButton>
        <CommonButton
          onClick={() =>
            template.thumbnail ? onPreview(template.thumbnail) : null
          }
          aria-label={`${template.name} 미리보기`}
          disabled={!template.thumbnail}
          textClass='text-label2-medium'
          borderRadius='full'
          variant='tertiary'
          size='medium'
          width='145px'
          className='py-2'
        >
          미리보기
        </CommonButton>
      </div>
    </li>
  );
};

export default TemplateCard;
