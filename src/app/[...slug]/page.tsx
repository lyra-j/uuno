import { getUserNickName } from '@/apis/card-interaction';
import SlugClientPage from './page.client';
import { notFound } from 'next/navigation';

interface generateMetadataProps {
  params: { slug: string[] };
}

export const generateMetadata = async ({ params }: generateMetadataProps) => {
  const { slug } = params;
  let cardData = null;

  try {
    cardData = await getUserNickName(slug[0]);
  } catch (error) {
    console.error('Metadata 요청 에러', error);
    return {
      title: '명함을 찾을 수 없습니다. | Uuno',
      description: '존재하지 않는 명함입니다.',
      robots: 'noindex',
    };
  }

  if (!cardData) {
    return {
      title: '명함을 찾을 수 없습니다. | Uuno',
      description: '존재하지 않는 명함입니다.',
      robots: 'noindex',
    };
  }

  return {
    title: `${cardData.title} 디지털 명함 | Uuno`,
    description: `${cardData.users?.nick_name}님의 ${cardData.title}명함을 만나보세요.`,
    keywords: ['Uuno', '명함 공유', '디지털 명함 공유'],
    openGraph: {
      url: `https://uuno.kr/${cardData.slug}`,
      title: `${cardData.users?.nick_name}님의 ${cardData.title}명함`,
      description: `${cardData.users?.nick_name}님의 ${cardData.title}명함을 만나보세요`,
      images: [
        {
          url: cardData.frontImgURL ?? '/main-og.png',
          width: 1200,
          height: 630,
          alt: `${cardData.users?.nick_name}님의 ${cardData.title}명함`,
        },
      ],
    },
    themeColor: '#3970D5',
    robots: 'index follow',
  };
};

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
