import { getUserNickName } from '@/apis/card-interaction';
import SlugClientPage from './page.client';
import { notFound } from 'next/navigation';

const SlugPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  let cardData = null;

  try {
    cardData = await getUserNickName(slug);
  } catch (error) {
    console.error('API 요청 중 에러 발생:', error);
    return notFound();
  }

  if (!cardData) {
    return notFound();
  }

  const transformedCardData = {
    ...cardData,
    users: cardData.users,
  };

  return <SlugClientPage initialData={transformedCardData} />;
};

export default SlugPage;
