'use client';

import { useEffect, useRef } from 'react';
import { useCommonModalStore } from '@/store/common-modal.store';
import { useSaveShareModalStore } from '@/store/save-share-modal.store';
import SaveShareIconItem from './save-share-icon-item';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { CommonButton } from '../common/common-button';
import { QRCodeCanvas } from 'qrcode.react';
import sweetAlertUtil from '@/utils/common/sweet-alert-util';
import { useDownloadCardImageMutation } from '@/hooks/mutations/use-init-session';
import { useImageDownloader } from '@/hooks/use-Image-downloader';
import useCardSlug from '@/hooks/queries/use-card-slug';
import { BASE_URL } from '@/constants/url.constant';
import { downloadPngFromCanvas } from '@/utils/interaction/download-from-canvas';

// Window 인터페이스 확장 (카카오 SDK)
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

const SaveShareModal = () => {
  // SaveShareModalStore에서 데이터 가져오기
  const { cardId, title, description, imageUrl, linkUrl, isOpen, close } =
    useSaveShareModalStore();

  // CommonModalStore 액션
  const openCommonModal = useCommonModalStore((state) => state.open);
  const closeCommonModal = useCommonModalStore((state) => state.close);

  // qr 생성을 위한 url과 캔버스 참조
  const { data: slug } = useCardSlug(cardId);
  const canvasRef = useRef<HTMLDivElement>(null);
  const qrUrl = slug ? `${BASE_URL.UUNO}/${slug}?source=qr` : '';

  // 카카오 SDK 로드
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

  useEffect(() => {
    if (isOpen && cardId) {
      openCommonModal({
        title: '저장 및 공유하기',
        maxWidth: 'lg',
        ctnClassName: 'p-10',
        content: (
          <div className='flex flex-col gap-7'>
            <div className='flex gap-12'>
              <div className='flex gap-5'>
                {saveShareList.map(({ onClick, src, alt, text }, index) => (
                  <div key={index} onClick={onClick}>
                    <SaveShareIconItem
                      src={src}
                      alt={alt}
                      imgWidth={54}
                      imgHeight={54}
                      text={text}
                    />
                  </div>
                ))}
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
              {/* qr생성 캔버스 숨김 */}
              <div ref={canvasRef} style={{ display: 'none' }}>
                <QRCodeCanvas value={qrUrl} size={100} />
              </div>
            </div>
            <div className='flex items-center space-x-2'>
              <div className='relative grid h-[48px] flex-1 gap-2'>
                <Label htmlFor='link' className='sr-only'>
                  Link
                </Label>
                <Input
                  id='link'
                  defaultValue={linkUrl}
                  className='h-[48px] rounded-lg border-gray-10 bg-gray-5 px-[14px] py-3 text-label2-medium focus-visible:ring-0'
                  readOnly
                />
                <CommonButton
                  variant='primary'
                  size='small'
                  borderRadius='6px'
                  width='75px'
                  className='absolute right-[14px] top-1/2 -translate-y-1/2'
                  onClick={handleTextCopy}
                >
                  복사
                </CommonButton>
              </div>
            </div>
          </div>
        ),
        onClose: () => {
          close();
        },
      });
    } else {
      closeCommonModal();
    }

    // 컴포넌트 언마운트 시 모달 닫기
    return () => {
      if (isOpen) {
        closeCommonModal();
        close();
      }
    };
  }, [isOpen, cardId, openCommonModal, closeCommonModal, close]);

  // dummy data 파일명
  const downloadCardImageMutation = useDownloadCardImageMutation(
    cardId,
    'card_test.jpg'
  );

  const { handleSaveImg } = useImageDownloader();

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

  const handleTextCopy = () => {
    try {
      window.navigator.clipboard.writeText(linkUrl);
      sweetAlertUtil.success(
        '복사 완료!',
        '링크가 클립보드에 복사되었습니다.',
        {
          timer: 1000,
          showCancelButton: false,
        }
      );
    } catch (error) {
      console.error(error);
      sweetAlertUtil.error('텍스트 복사가 실패하였습니다.');
    }
  };

  // QR 코드 다운로드
  const handleQrSave = () => {
    const container = canvasRef.current;
    if (!container) return;

    const canvas = container.querySelector('canvas');
    if (!canvas) return;

    //toDataURL로 PNG QR URL 생성 후 다운로드
    downloadPngFromCanvas(canvas, `${slug}-qrcode.png`);
  };

  const handleImageSave = async () => {
    const data = await downloadCardImageMutation.mutateAsync();
    handleSaveImg(data);
  };

  const handleTagCopy = () => {
    const htmlCode = `<a href="${linkUrl}" target="_blank"><img src="${imageUrl}" alt="${title}"/></a>`;
    try {
      navigator.clipboard.writeText(htmlCode);
      sweetAlertUtil.success(
        '복사 완료!',
        '명함 태그가 클립보드에 복사되었습니다.',
        {
          timer: 1000,
          showCancelButton: false,
        }
      );
    } catch (error) {
      console.error(error);
      sweetAlertUtil.error('명함 태그 복사가 실패하였습니다.');
    }
  };

  const saveShareList = [
    {
      onClick: handleTagCopy,
      src: '/icons/tag-copy.svg',
      alt: '태그 복사',
      text: '태그 복사',
    },
    {
      onClick: handleQrSave,
      src: '/icons/qr-copy.svg',
      alt: 'QR 저장',
      text: 'QR 저장',
    },
    {
      onClick: handleImageSave,
      src: '/icons/img-save.svg',
      alt: '이미지 저장',
      text: '이미지 저장',
    },
  ];

  // 실제로는 아무것도 렌더링하지 않음
  return null;
};

export default SaveShareModal;
