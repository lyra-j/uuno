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

  const fullUrl = `http://undo/${suffixInput}`;

  // QR 코드 미리보기 생성
  const handleGenerateQR = () => {
    if (!qrCanvasRef.current) return;
    const canvas = qrCanvasRef.current.querySelector(
      'canvas'
    ) as HTMLCanvasElement;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL();
    const newQr: GeneratedQR = {
      id: v4(),
      url: inputQrUrl,
      previewUrl: dataUrl,
    };
    setGeneratedQr((prev) => [...prev, newQr]);
  };

  // 미리보기 이미지를 클릭하면 캔버스에 QR 요소 추가
  const handleQrClick = (qr: GeneratedQR) => {
    const newQrElement: QrElement = {
      id: v4(),
      type: 'qr',
      url: qr.url,
      previewUrl: qr.previewUrl,
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

      {/* QR 탭 내용 */}
      {tab === 'qr' && (
        <div className='mt-4 space-y-4'>
          <p>사용법 ~~~~~~~</p>
          <label className='text-sm font-medium text-gray-800'>
            QR 코드 생성 URL
          </label>

          <input
            type='text'
            placeholder='URL 입력'
            value={inputQrUrl}
            onChange={(e) => setInputQrUrl(e.target.value)}
            className='w-full rounded border px-3 py-2 text-sm'
          />
          <button
            onClick={handleGenerateQR}
            className='w-full rounded bg-primary-40 py-1 text-white'
            disabled={!inputQrUrl}
          >
            만들기
          </button>

          {/* 숨겨진 QRCodeCanvas: 데이터를 생성하기 위한 렌더링 전용 */}
          <div className='invisible absolute' ref={qrCanvasRef}>
            <QRCodeCanvas value={inputQrUrl} size={128} id='qr-temp-canvas' />
          </div>

          {/* 미리보기 이미지: 하나의 QR 미리보기를 보여줌 */}
          {generateQr && (
            <div className='mt-4'>
              <p className='mb-2 text-sm font-medium text-gray-800'>
                미리보기 (클릭 시 추가)
              </p>
              <div
                onClick={handleQrClick}
                className='relative flex h-[58px] w-[98px] cursor-pointer flex-col items-center justify-center border bg-gray-100'
              >
                <img
                  src={generateQr.previewUrl}
                  alt={generateQr.url}
                  className='absolute h-full w-full rounded object-cover'
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Social 여기에 추가해주세용 */}
      {tab === 'social' && <div className='mt-4'></div>}
    </div>
  );
};

export default QrSidebar;
