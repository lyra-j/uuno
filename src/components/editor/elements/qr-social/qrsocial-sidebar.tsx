'use client';

import React, { useRef, useState } from 'react';
import { v4 } from 'uuid';
import { QRCodeCanvas } from 'qrcode.react';
import { sideBarStore } from '@/store/editor.sidebar.store';
import { calculateToolbarPosition } from '@/utils/editor/editor-calculate-toolbar-position';
import Image from 'next/image';
import { SOCIAL_LIST } from '@/constants/editor.constant';
import { useEditorStore } from '@/store/editor.store';
import { QrElement, SocialElement } from '@/types/editor.type';

interface GeneratedQR {
  id: string;
  url: string;
  previewUrl: string;
}

interface SocialPreview {
  icon: string;
  url: string;
}

const QrSidebar = () => {
  const [tab, setTab] = useState<'qr' | 'social'>('qr');
  const [inputQrUrl, setInputQrUrl] = useState<string>('');
  const [previewQr, setPreviewQr] = useState<GeneratedQR | null>(null);
  const [socialBaseUrl, setSocialBaseUrl] = useState<string>('');
  const [showUrl, setShowUrl] = useState<string | undefined>('');
  const [social, setSocial] = useState('');
  const [inputSocialUrl, setInputSocialUrl] = useState<string>('');
  const [socialName, setSocialName] = useState<string>('');
  const [socialPreviewList, setSocialPreviewList] = useState<SocialPreview[]>(
    []
  );

  const qrCanvasRef = useRef<HTMLDivElement>(null);
  const addElement = useEditorStore((state) => state.addElement);
  const setSelectedElementId = useEditorStore(
    (state) => state.setSelectedElementId
  );
  const setToolbar = useEditorStore((state) => state.setToolbar);

  //특수문자 방지(사용자가 입력했을 때 문제)
  const cleanInput = inputQrUrl.trim().replace(/^\/+/, '');
  const socialCleanInput = inputSocialUrl.trim().replace(/^\/+/, '');

  //주소 나중에 정하기
  const fullUrl = `https://uuno.vercel.app/${cleanInput}`;
  const socialFullUrl = `${socialBaseUrl}${socialCleanInput}`;

  // QR 코드 미리보기 생성
  const handleAddPreviewQr = () => {
    if (!qrCanvasRef.current) return;
    const canvas = qrCanvasRef.current.querySelector(
      'canvas'
    ) as HTMLCanvasElement;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL();

    if (previewQr && previewQr.url === fullUrl) {
      // 이미 같은 URL로 만들어진 QR이 있다면 그냥 return (중복 생성 방지)
      return;
    }
    setPreviewQr({
      id: v4(),
      url: fullUrl,
      previewUrl: dataUrl,
    });
  };

  // 미리보기 이미지를 클릭하면 캔버스에 QR 요소 추가
  const handleQrClick = () => {
    if (!previewQr) return;

    const newQrElement: QrElement = {
      id: v4(),
      type: 'qr',
      url: previewQr.url,
      previewUrl: previewQr.previewUrl,
      x: 100,
      y: 100,
      rotation: 0,
      width: 128,
      height: 128,
    };
    const zoom = sideBarStore.getState().zoom;

    addElement(newQrElement);
    setSelectedElementId(newQrElement.id);
    setToolbar(
      calculateToolbarPosition({
        x: newQrElement.x,
        y: newQrElement.y,
        width: newQrElement.width,
        height: newQrElement.height,
        zoom,
      })
    );
  };

  // 소셜 이미지, 링크 추가
  const handleAddSocial = () => {
    const newSocial: SocialElement = {
      id: v4(),
      type: 'social',
      icon: social,
      fullUrl: socialFullUrl,
      social: socialName,
      x: 100,
      y: 100,
      rotation: 0,
      width: 48,
      height: 48,
    };
    addElement(newSocial);
    setSelectedElementId(newSocial.id);
    setToolbar({
      x: newSocial.x + newSocial.width / 2,
      y: newSocial.y + newSocial.height + 10,
    });
  };

  //클린 업 함수
  const cleanUp = () => {
    setSocial('');
    setInputQrUrl('');
    setInputSocialUrl('');
    setSocialBaseUrl('');
  };

  const addSocialPreviewList = () => {
    setSocialPreviewList((prev) => {
      const existIcon = prev.findIndex((item) => item.icon === social);

      if (existIcon !== -1) {
        const updatedList = [...prev];
        updatedList[existIcon] = {
          ...updatedList[existIcon],
          url: socialCleanInput,
        };
        return updatedList;
      }

      return [...prev, { icon: social, url: socialCleanInput }];
    });
  };

  const baseUrl = tab === 'qr' ? 'uuno.vercel.app/' : showUrl;
  const inputUrl = tab === 'qr' ? inputQrUrl : inputSocialUrl;
  const setInputUrl = tab === 'qr' ? setInputQrUrl : setInputSocialUrl;
  const disabled = tab === 'qr' ? !inputQrUrl : !(social && socialCleanInput);

  return (
    <div className='flex w-full flex-col items-start gap-[16px] p-[18px]'>
      <div className='flex flex-col items-start gap-2 self-stretch'>
        <h2 className='text-label2-medium text-black'>QR 코드 / 소셜</h2>
        <p className='text-caption-regular text-gray-100'>
          URL을 입력해서 QR 및 소셜을 생성하세요.
        </p>
      </div>
      {/* 탭 헤더 */}
      <div className='flex items-center self-stretch'>
        <div
          className={`w1/2 group flex items-center justify-center border-b-2 px-7 py-3 ${tab === 'qr' ? 'border-b-primary-40' : 'border-b-gray-10'} cursor-pointer`}
          onClick={() => setTab('qr')}
        >
          <p
            className={`text-label2-medium ${tab === 'qr' ? 'text-primary-40' : 'text-gray-70'}`}
          >
            QR코드
          </p>
        </div>
        <div
          className={`w1/2 group flex items-center justify-center border-b-2 px-7 py-3 ${tab === 'social' ? 'border-b-primary-40' : 'border-b-gray-10'} cursor-pointer`}
          onClick={() => setTab('social')}
        >
          <p
            className={`text-label2-medium ${tab === 'social' ? 'text-primary-40' : 'text-gray-70'}`}
          >
            소셜
          </p>
        </div>
      </div>

      {/* url/Input */}
      <div className='flex flex-col items-start gap-2 self-stretch'>
        <label className='text-label2-medium'>URL</label>
        <div className='flex w-full rounded border px-3 py-2 text-sm'>
          <span className='select-none whitespace-nowrap text-gray-400'>
            {baseUrl}
          </span>
          <div className='ml-1 flex-1 overflow-x-auto'>
            <input
              type='text'
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder='URL 입력'
              className='w-full bg-transparent outline-none'
              style={{ whiteSpace: 'nowrap' }}
            />
          </div>
        </div>
      </div>

      {tab === 'social' && (
        // 아이콘 리스트
        <div className='flex w-[204px] flex-col items-start gap-[16px]'>
          <div className='flex w-[204px] flex-col items-start gap-[14px]'>
            <label className='text-label2-medium text-black'>아이콘</label>
            <div className='flex flex-wrap content-start items-start gap-3 self-stretch'>
              {SOCIAL_LIST.map((list) => {
                return (
                  <div
                    key={list.name}
                    className='flex aspect-square h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-[6px] border border-gray-10 bg-white p-[6px]'
                    onClick={() => {
                      setSocialBaseUrl(list.baseURL);
                      setShowUrl(list.showURL);
                      setSocial(list.icon);
                      setInputSocialUrl('');
                      setSocialName(list.name);
                    }}
                  >
                    <Image
                      src={list.icon}
                      alt={list.name}
                      width={48}
                      height={48}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 생성하기 버튼 */}
      <button
        onClick={() => {
          if (tab === 'qr') {
            handleAddPreviewQr();
          }
          if (tab === 'social') {
            handleAddSocial();
            addSocialPreviewList();
          }
          cleanUp();
        }}
        className={`h-8 w-full cursor-pointer rounded-[6px] bg-primary-40 text-white ${disabled && 'opacity-60'}`}
        disabled={disabled}
      >
        생성하기
      </button>

      {/* 소셜 미리보기 */}
      {tab === 'social' && (
        <div className='flex w-[204px] flex-col items-start gap-[14px]'>
          <label className='self-stretch text-label2-medium'>미리보기</label>
          <div className='flex flex-wrap content-start items-start gap-3 self-stretch'>
            {socialPreviewList.map((item) => {
              return (
                <div className='flex items-center gap-3' key={item.url + v4()}>
                  <div
                    className='flex aspect-square h-[60px] w-[60px] items-center justify-center rounded-[6px] border border-gray-10 p-[6]'
                    onClick={() =>
                      window.open(item.url, '_blank', 'noopener,noreferrer')
                    }
                  >
                    <Image
                      src={item.icon}
                      alt='socialImage'
                      width={48}
                      height={48}
                    />
                  </div>
                  <div className='flex h-[60px] w-[130px] items-start overflow-auto break-words rounded-[6px] border border-gray-10 px-[16px] py-[12px] text-sm'>
                    {item.url}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* QR 미리보기 */}
      {tab === 'qr' && (
        <div className='mt-4 space-y-4'>
          {/* 숨겨진 QRCodeCanvas */}
          <div className='invisible absolute' ref={qrCanvasRef}>
            <QRCodeCanvas value={fullUrl} size={128} />
          </div>

          {/* 미리보기 */}
          {previewQr && (
            <div className='flex w-[204px] flex-col items-start gap-[14px]'>
              <label className='self-stretch text-label2-medium'>
                미리보기(클릭시 추가)
              </label>
              <div
                onClick={handleQrClick}
                className='relative flex h-32 w-32 cursor-pointer items-center justify-center border'
              >
                <img
                  src={previewQr.previewUrl}
                  alt={previewQr.url}
                  className='absolute h-full w-full rounded object-cover'
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QrSidebar;
