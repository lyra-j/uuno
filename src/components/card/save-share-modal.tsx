'use client';
declare global {
  interface Window {
    Kakao?: {
      isInitialized: () => boolean;
      init: (_key: string) => void;
      Share?: {
        sendDefault: (_params: {
          objectType: string;
          content: {
            title: string;
            description: string;
            imageUrl: string;
            link: {
              mobileWebUrl: string;
              webUrl: string;
            };
          };
          buttons: Array<{
            title: string;
            link: {
              mobileWebUrl: string;
              webUrl: string;
            };
          }>;
        }) => void;
      };
    };
  }
}
import { CommonModal } from '../common/common-modal';
import SaveShareIconItem from './save-share-icon-item';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { CommonButton } from '../common/common-button';
import { useEffect } from 'react';

interface KakaoShareButtonProps {
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
}

const SaveShareModal = ({
  title,
  description,
  imageUrl,
  linkUrl,
}: KakaoShareButtonProps) => {
  useEffect(() => {
    // SDK 로딩 함수
    const loadKakaoSDK = () => {
      // 이미 초기화되었는지 확인
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY as string);
      }
    };

    // SDK 스크립트가 이미 로드되었는지 확인
    if (window.Kakao) {
      loadKakaoSDK();
    } else {
      // SDK 스크립트 동적 로드
      const script = document.createElement('script');
      script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js';
      script.async = true;
      script.onload = loadKakaoSDK;
      document.body.appendChild(script);
    }
  }, []);

  const handleKakaoShare = () => {
    if (!window.Kakao) {
      console.error('카카오 SDK가 로드되지 않았습니다.');
      return;
    }

    if (!window.Kakao.Share) {
      console.error('카카오 공유 API를 찾을 수 없습니다.', window.Kakao);
      return;
    }

    const shareAPI = window.Kakao.Share;

    if (shareAPI && shareAPI.sendDefault) {
      shareAPI.sendDefault({
        objectType: 'feed',
        content: {
          title: title,
          description: description,
          imageUrl: imageUrl,
          link: {
            mobileWebUrl: linkUrl,
            webUrl: linkUrl,
          },
        },
        buttons: [
          {
            title: '웹으로 보기',
            link: {
              mobileWebUrl: linkUrl,
              webUrl: linkUrl,
            },
          },
        ],
      });
    }
  };

  return (
    <CommonModal title='저장 및 공유하기' maxWidth='lg' ctnClassName='p-10'>
      <div className='flex flex-col gap-7'>
        <div className='flex gap-12'>
          <div className='flex gap-5'>
            <SaveShareIconItem
              src={'/icons/tag-copy.svg'}
              alt='태그 복사'
              imgWidth={54}
              imgHeight={54}
              text='태그 복사'
            />
            <SaveShareIconItem
              src={'/icons/qr-copy.svg'}
              alt='QR 복사'
              imgWidth={54}
              imgHeight={54}
              text='QR 복사'
            />
            <SaveShareIconItem
              src={'/icons/img-save.svg'}
              alt='이미지 저장'
              imgWidth={54}
              imgHeight={54}
              text='이미지 저장'
            />
          </div>
          <div onClick={handleKakaoShare}>
            <SaveShareIconItem
              src={'/icons/kakao-share.svg'}
              alt='카카오톡 공유'
              imgWidth={54}
              imgHeight={54}
              text='카카오톡 공유'
            />
          </div>
        </div>
        <div className='flex items-center space-x-2'>
          <div className='relative grid h-[48px] flex-1 gap-2'>
            <Label htmlFor='link' className='sr-only'>
              Link
            </Label>
            <Input
              id='link'
              defaultValue='https://ui.shadcn.com/docs/installation'
              className='h-[48px] rounded-lg border-gray-10 bg-gray-5 px-[14px] py-3 text-label2-medium focus-visible:ring-0'
              readOnly
            />
            <CommonButton
              variant='primary'
              size='small'
              borderRadius='6px'
              width='75px'
              className='absolute right-[14px] top-1/2 -translate-y-1/2'
            >
              복사
            </CommonButton>
          </div>
        </div>
      </div>
    </CommonModal>
  );
};

export default SaveShareModal;
