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
  // URL 입력 및 생성 버튼 관련 상태
  const [inputQrUrl, setInputQrUrl] = useState<string>('http://undo/');
  // 미리보기로 생성된 QR 코드 리스트
  const [generatedQrs, setGeneratedQrs] = useState<GeneratedQR[]>([]);
  const qrCanvasRef = useRef<HTMLDivElement>(null);
  const addElement = useEditorStore((state) => state.addElement);
  const setSelectedElementId = useEditorStore(
    (state) => state.setSelectedElementId
  );
  const setToolbar = useEditorStore((state) => state.setToolbar);

  // QR 코드 미리보기 생성
  const handleGenerateQR = () => {
    if (!qrCanvasRef.current) return;
    const canvas = qrCanvasRef.current.querySelector(
      'canvas'
    ) as HTMLCanvasElement;
    if (!canvas) return;
    // QRCodeCanvas에서 캔버스 데이터를 base64 Data URL로 추출
    const dataUrl = canvas.toDataURL();
    const newQr: GeneratedQR = {
      id: v4(),
      url: inputQrUrl,
      previewUrl: dataUrl,
    };
    setGeneratedQrs((prev) => [...prev, newQr]);
    setInputQrUrl('');
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
    <div className='h-full w-full p-[18px]'>
      {/* URL 입력 및 만들기 버튼 */}
      <div className='space-y-4'>
        <label className='text-base font-medium'>QR 코드 생성</label>
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
      </div>

      {/* 숨겨진 QRCodeCanvas: 미리보기 데이터 생성용 */}
      <div className='invisible absolute' ref={qrCanvasRef}>
        <QRCodeCanvas value={inputQrUrl} size={128} id='qr-temp-canvas' />
      </div>

      {/* 생성된 QR 코드 미리보기 리스트 */}
      {generatedQrs.length > 0 && (
        <div className='mt-4 h-full'>
          {generatedQrs.map((qr) => (
            <div
              key={qr.id}
              onClick={() => handleQrClick(qr)}
              className='relative flex h-[58px] w-[98px] cursor-pointer flex-col items-center justify-center border bg-gray-100'
            >
              <img
                src={qr.previewUrl}
                alt={qr.url}
                className='absolute h-full w-full rounded object-cover'
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QrSidebar;
