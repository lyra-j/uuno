'use client';
import React, { ChangeEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import { v4 } from 'uuid';
import { useEditorStore, UploadElement } from '@/store/editor.store';

interface UploadedFile {
  id: string;
  type: string;
  file: File;
  previewUrl: string;
}

const UploadsSidebar = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const addElement = useEditorStore((state) => state.addElement);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const newFiles = files.map((file) => ({
      id: v4(),
      type: 'upload',
      file,
      previewUrl: URL.createObjectURL(file),
    }));
    setUploadedFiles((prev) => [...prev, ...newFiles]);
    e.target.value = '';
  };

  // 파일  클릭 시 업로드 요소로 추가
  const handleFileClick = (file: UploadedFile) => {
    const newElement: UploadElement = {
      id: file.id,
      type: 'upload',
      x: 50,
      y: 50,
      rotation: 0,
      previewUrl: file.previewUrl,
      width: 100,
      height: 100,
    };
    addElement(newElement);
  };

  useEffect(() => {
    return () => {
      uploadedFiles.forEach((file) => {
        URL.revokeObjectURL(file.previewUrl);
      });
    };
  }, [uploadedFiles]);

  return (
    <div className='h-full w-full'>
      {/* 상단 영역: 업로드 버튼 및 정보 아이콘 */}
      <div className='flex flex-row items-center justify-center gap-2'>
        <label className='relative cursor-pointer rounded bg-primary-40 px-16 py-[6px] text-white'>
          업로드
          <input
            type='file'
            multiple
            accept='.jpg,.jpeg,.png,.svg'
            onChange={handleFileUpload}
            className='absolute left-0 top-0 z-10 h-full w-full cursor-pointer opacity-0'
          />
        </label>
        <button className='border px-2 py-[6px]'>i</button>
      </div>

      {/* 파일 리스트 영역 */}
      {uploadedFiles.length === 0 ? (
        <div className='flex h-full flex-col items-center justify-center text-center text-gray-500'>
          <p className='text-base'>파일 업로드</p>
          <p className='mt-1 text-xs'>
            JPG, SVG, PNG 파일을 업로드
            <br /> 버튼으로 올려주세요.
          </p>
        </div>
      ) : (
        <div className='mt-2 h-full'>
          <div className='mb-2 text-sm'>파일 ({uploadedFiles.length})</div>
          <div className='grid grid-cols-2 gap-2 border p-2'>
            {uploadedFiles.map((item) => {
              const fileName = item.file.name;
              const fileExt = fileName.split('.').pop()?.toLowerCase();
              const allowedExtensions = ['jpg', 'jpeg', 'png', 'svg'];
              const isImage = allowedExtensions.includes(fileExt || '');
              return (
                <div
                  key={item.id}
                  onClick={() => handleFileClick(item)}
                  className='relative flex h-[58px] w-[98px] cursor-pointer flex-col items-center justify-center border'
                >
                  {isImage ? (
                    <Image
                      src={item.previewUrl}
                      alt={fileName}
                      fill
                      className='absolute rounded object-cover'
                      unoptimized={true}
                    />
                  ) : (
                    <div className='flex h-12 w-12 items-center justify-center'>
                      {fileExt?.toUpperCase() || 'FILE'}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadsSidebar;
