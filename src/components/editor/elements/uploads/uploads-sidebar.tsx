'use client';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useEditorStore, UploadElement } from '@/store/editor.store';
import { TOOLBAR_WIDTH } from '@/constants/editor.constant';

interface UploadedFile {
  id: string;
  file: File;
  previewUrl: string;
}

const UploadsSidebar = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const addElement = useEditorStore((state) => state.addElement);
  const setSelectedElementId = useEditorStore(
    (state) => state.setSelectedElementId
  );
  const setToolbar = useEditorStore((state) => state.setToolbar);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const newFiles = files.map((file) => ({
      id: `${file.name}`,
      file,
      previewUrl: URL.createObjectURL(file),
    }));
    setUploadedFiles((prev) => [...prev, ...newFiles]);
    e.target.value = '';
  };

  // 파일  클릭 시 업로드 요소로 추가
  const handleFileClick = (file: UploadedFile) => {
    const img = new window.Image();
    img.src = file.previewUrl;

    img.onload = () => {
      const maxW = 100;
      const maxH = 100;
      const scale = Math.min(maxW / img.width, maxH / img.height, 1);
      const width = img.width * scale;
      const height = img.height * scale;

      const newElement: UploadElement = {
        id: uuidv4(),
        type: 'upload',
        x: 100,
        y: 100,
        rotation: 0,
        previewUrl: file.previewUrl,
        width,
        height,
      };

      addElement(newElement);
      setSelectedElementId(newElement.id);
      setToolbar({
        x: newElement.x + newElement.width / 2 - TOOLBAR_WIDTH / 2,
        y: newElement.y + newElement.height + 8,
      });
    };
  };

  useEffect(() => {
    return () => {
      uploadedFiles.forEach((file) => {
        URL.revokeObjectURL(file.previewUrl);
      });
    };
  }, [uploadedFiles]);

  return (
    <div className='h-full w-full p-[18px]'>
      {/* 상단: 업로드 */}
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

      {/* 파일 리스트 */}
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
              return (
                <div
                  key={item.id}
                  onClick={() => handleFileClick(item)}
                  className='relative flex h-[58px] w-[98px] cursor-pointer flex-col items-center justify-center border bg-gray-100'
                >
                  <img
                    src={item.previewUrl}
                    alt={fileName}
                    className='absolute h-full w-full rounded object-cover'
                  />
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
