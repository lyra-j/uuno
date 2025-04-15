'use client';

import React, { useRef, useState } from 'react';
import { v4 } from 'uuid';
import { QRCodeCanvas } from 'qrcode.react';
import { useEditorStore, QrElement } from '@/store/editor.store';

interface GeneratedQR {
  id: string;
  url: string;
  previewUrl: string;
}

const QrSidebar = () => {
  const [tab, setTab] = useState<'qr' | 'social'>('qr');

  // URL 입력 및 생성 버튼 관련 상태
  const [inputQrUrl, setInputQrUrl] = useState<string>('');
  // 미리보기로 생성된 QR 코드 리스트
  const [previewQr, setPreviewQr] = useState<GeneratedQR | null>(null);

  const qrCanvasRef = useRef<HTMLDivElement>(null);
  const addElement = useEditorStore((state) => state.addElement);
  const setSelectedElementId = useEditorStore(
    (state) => state.setSelectedElementId
  );
  const setToolbar = useEditorStore((state) => state.setToolbar);

  //주소 나중에 정하기
  const fullUrl = 'http://localhost:3000/card';
  // const fullUrl = `http://undo/${suffixInput}`;

  // QR 코드 미리보기 생성
  const handleAddPreviewQr = () => {
    if (!qrCanvasRef.current) return;
    const canvas = qrCanvasRef.current.querySelector(
      'canvas'
    ) as HTMLCanvasElement;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL();
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
      width: 100,
      height: 100,
    };
    addElement(newQrElement);
    setSelectedElementId(newQrElement.id);
    setToolbar({
      x: newQrElement.x + newQrElement.width / 2,
      y: newQrElement.y + newQrElement.height + 10,
    });
  };

  return (
    <div className='w-full p-[18px]'>
      {/* 탭 헤더 */}
      <div className='flex border-b'>
        <button
          className={`w-1/2 py-2 ${tab === 'qr' ? 'border-b-2' : 'text-gray-400'}`}
          onClick={() => setTab('qr')}
        >
          QR코드
        </button>
        <button
          className={`w-1/2 py-2 ${tab === 'social' ? 'border-b-2' : 'text-gray-400'}`}
          onClick={() => setTab('social')}
        >
          소셜
        </button>
      </div>

      {/* QR 탭 */}
      {tab === 'qr' && (
        <div className='mt-4 space-y-4'>
          <p className='text-sm text-gray-500'>
            http://undo/ 경로 뒤에 원하는 URL 슬러그를 입력해주세요.
            http://undo/까지는 고정입니다.
          </p>

          <label className='text-sm font-medium text-gray-800'>URL</label>
          <div className='flex w-full rounded border px-3 py-2 text-sm'>
            <span className='select-none text-gray-400'>http://undo/</span>
            <input
              type='text'
              value={inputQrUrl}
              onChange={(e) => setInputQrUrl(e.target.value)}
              placeholder='your-link'
              className='ml-1 flex-1 bg-transparent outline-none'
            />
          </div>

          <button
            onClick={handleAddPreviewQr}
            className='w-full rounded bg-primary-40 py-1 text-white'
            disabled={!inputQrUrl}
          >
            만들기
          </button>

          {/* 숨겨진 QRCodeCanvas */}
          <div className='invisible absolute' ref={qrCanvasRef}>
            <QRCodeCanvas value={fullUrl} size={128} />
          </div>

          {/* 미리보기 */}
          {previewQr && (
            <div className='mt-4'>
              <p className='mb-2 text-sm font-medium text-gray-800'>
                미리보기 (클릭 시 캔버스에 추가)
              </p>
              <div
                onClick={handleQrClick}
                className='relative flex h-[58px] w-[98px] cursor-pointer items-center justify-center border bg-gray-100'
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

      {/* Social 탭 placeholder */}
      {tab === 'social' && (
        <div className='mt-4'>
          <p className='text-sm text-gray-500'>
            소셜 탭은 추후 추가 예정입니다.
          </p>
        </div>
      )}
    </div>
  );
};

export default QrSidebar;
