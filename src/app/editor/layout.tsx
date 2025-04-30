import { Metadata } from 'next';
import EditorHeader from '@/components/layouts/editor-header';
import { EditorInputAlert } from '@/components/editor/editor-ui/editor-input-alert';

export const metadata: Metadata = {
  title: '디지털 명함 만들기 - Uuno',
  description: '직관적인 인터페이스로 나만의 명함을 제작해보세요!',
};

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <EditorHeader />
      <EditorInputAlert />
      <main className='mt-16'>{children}</main>
    </>
  );
}
