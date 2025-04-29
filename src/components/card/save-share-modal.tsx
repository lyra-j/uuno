'use client';

import { useEffect, useRef } from 'react';
import { useCommonModalStore } from '@/store/common-modal.store';
import { useSaveShareModalStore } from '@/store/save-share-modal.store';
import SaveShareIconItem from '@/components/card/save-share-icon-item';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CommonButton } from '@/components/common/common-button';
import { QRCodeCanvas } from 'qrcode.react';
import sweetAlertUtil from '@/utils/common/sweet-alert-util';
import { useDownloadCardImageMutation } from '@/hooks/mutations/use-init-session';
import { useImageDownloader } from '@/hooks/use-Image-downloader';
import useCardSlug from '@/hooks/queries/use-card-slug';
import { BASE_URL } from '@/constants/url.constant';
import { downloadPngFromCanvas } from '@/utils/interaction/download-from-canvas';
import { authStore } from '@/store/auth.store';
import { useIsMobile } from '@/hooks/use-is-mobile';

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
  const cardId = useSaveShareModalStore((state) => state.cardId);
  const title = useSaveShareModalStore((state) => state.title);
  const description = useSaveShareModalStore((state) => state.description);
  const imageUrl = useSaveShareModalStore((state) => state.imageUrl);
  const linkUrl = useSaveShareModalStore((state) => state.linkUrl);
  const isOpen = useSaveShareModalStore((state) => state.isOpen);
  const close = useSaveShareModalStore((state) => state.close);
  const cardTitle = useSaveShareModalStore((state) => state.cardTitle);

  // CommonModalStore 액션
  const openCommonModal = useCommonModalStore((state) => state.open);
  const closeCommonModal = useCommonModalStore((state) => state.close);

  const userId = authStore((state) => state.userId);
  const userName = authStore((state) => state.userName);

  const isMobile = useIsMobile();

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
        ctnClassName: 'md:p-10 py-[14px] px-4 max-w-full ',
        content: (
          <div className='flex h-full flex-col justify-start gap-[26px] md:h-auto md:flex-col-reverse md:gap-7'>
            {/* 모바일에서만 QR 코드를 중앙에 배치 */}
            <div className='mb-4 mt-[14px] flex flex-col items-center justify-center text-center md:hidden'>
              <p className='my-[14px] text-body-medium'>
                {userName}의{' '}
                <span className='text-primary-40'>{cardTitle}</span> 명함
              </p>
              <QRCodeCanvas value={qrUrl} size={174} />
            </div>

            {/* 링크 입력 필드 */}
            <div className='flex items-center space-x-2'>
              <div className='relative flex h-[48px] flex-1 items-center'>
                <Label htmlFor='link' className='sr-only'>
                  Link
                </Label>
                <div className='flex-1 overflow-hidden'>
                  <Input
                    id='link'
                    defaultValue={linkUrl}
                    className='h-[48px] w-full truncate rounded-lg border-gray-10 bg-gray-5 px-[14px] py-3 pr-[105px] text-label2-medium focus-visible:ring-0'
                    readOnly
                  />
                </div>
                <CommonButton
                  variant='primary'
                  size='small'
                  borderRadius='6px'
                  width='75px'
                  className='absolute right-[14px] top-1/2 -translate-y-1/2 text-label2-medium text-white'
                  onClick={handleTextCopy}
                >
                  복사
                </CommonButton>
              </div>
            </div>

            {/* 아이콘 버튼들 */}
            <div className='mt-[9px] flex flex-col gap-4 md:mt-0 md:flex-row md:gap-12'>
              {/* 모바일에서 아이콘들을 가로로 배치 */}
              <div className='flex w-full flex-col items-center gap-4 px-[18px] md:flex-row md:justify-center md:gap-5 md:px-0'>
                <div className='mx-[18px] flex w-full flex-col items-center gap-[38px] md:mx-0 md:flex-row md:gap-4'>
                  <div className='flex w-full items-center justify-between md:flex md:w-auto md:flex-row-reverse md:gap-[18px]'>
                    {/* 첫 번째 아이콘 - 이미지 저장 */}
                    <div className='flex items-center justify-center'>
                      <button
                        type='button'
                        onClick={handleImageSave}
                        className='flex flex-col items-center'
                        aria-label='이미지 저장'
                      >
                        <SaveShareIconItem
                          src='/icons/img-save.svg'
                          alt='이미지 저장'
                          imgWidth={54}
                          imgHeight={54}
                          text='이미지 저장'
                        />
                      </button>
                    </div>

                    {/* 첫 번째 구분선 */}
                    <div className='md:hidden'>
                      <div className='mx-2 h-[53px] w-[1px] bg-[#F6F6F6]' />
                    </div>

                    {/* 두 번째 아이콘 - QR 저장 */}
                    <div className='flex items-center justify-center'>
                      <button
                        type='button'
                        onClick={handleQrSave}
                        className='flex flex-col items-center'
                        aria-label='QR 저장'
                      >
                        <SaveShareIconItem
                          src='/icons/qr-copy.svg'
                          alt='QR 저장'
                          imgWidth={54}
                          imgHeight={54}
                          text='QR 저장'
                        />
                      </button>
                    </div>

                    {/* 두 번째 구분선 */}
                    <div className='md:hidden'>
                      <div className='mx-2 h-[53px] w-[1px] bg-[#F6F6F6]' />
                    </div>

                    {/* 세 번째 아이콘 - 태그 복사 */}
                    <div className='flex items-center justify-center'>
                      <button
                        type='button'
                        onClick={handleTagCopy}
                        className='flex flex-col items-center'
                        aria-label='태그 복사'
                      >
                        <SaveShareIconItem
                          src='/icons/tag-copy.svg'
                          alt='태그 복사'
                          imgWidth={54}
                          imgHeight={54}
                          text='태그 복사'
                        />
                      </button>
                    </div>
                  </div>

                  {/* 카카오톡 공유 버튼 */}
                  <div
                    onClick={handleKakaoShare}
                    className='flex w-full flex-col items-start md:w-auto md:items-center'
                  >
                    <SaveShareIconItem
                      src={'/icons/kakao-share.svg'}
                      alt='카카오톡 공유'
                      imgWidth={54}
                      imgHeight={54}
                      text='카카오톡 공유'
                    />
                  </div>
                </div>
              </div>

              {/* qr생성 캔버스 숨김 */}
              <div ref={canvasRef} style={{ display: 'none' }}>
                <QRCodeCanvas value={qrUrl} size={100} />
              </div>
            </div>
          </div>
        ),
        showCloseButton: isMobile ? false : true,
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
  }, [
    isOpen,
    isMobile,
    cardId,
    slug,
    openCommonModal,
    closeCommonModal,
    close,
    linkUrl,
    qrUrl,
    title,
    description,
    imageUrl,
  ]);

  const downloadCardImageMutation = useDownloadCardImageMutation(
    userId || '',
    slug || '',
    [`back_${slug}_img.png`, `front_${slug}_img.png`]
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
    data.map((e) => handleSaveImg(e.data, e.fileName));
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

  // 실제로는 아무것도 렌더링하지 않음
  return null;
};

export default SaveShareModal;
