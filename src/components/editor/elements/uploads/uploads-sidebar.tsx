'use client';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useEditorStore, UploadElement } from '@/store/editor.store';
import { sideBarStore } from '@/store/editor.sidebar.store';
import { calculateToolbarPosition } from '@/utils/editor/editor-calculate-toolbar-position';
import Image from 'next/image';
import { authStore } from '@/store/auth.store';
import sweetAlertUtil from '@/utils/common/sweet-alert-util';
import { STORAGE } from '@/constants/tables.constant';
import { useMultipleImageUpload } from '@/hooks/mutations/use-image-upload';

interface UploadedFile {
  id: string;
  file: File;
  previewUrl: string;
}

const UploadsSidebar = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isShowInfo, setShowInfo] = useState<boolean>(false);
  const addElement = useEditorStore((state) => state.addElement);
  const setSelectedElementId = useEditorStore(
    (state) => state.setSelectedElementId
  );
  const setToolbar = useEditorStore((state) => state.setToolbar);
  const login = authStore((state) => state.login);
  const userId = authStore((state) => state.userId);

  const { mutate, isPending: uploading } = useMultipleImageUpload();

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!login)
      return sweetAlertUtil.error(
        '로그인 필요',
        '업로드 기능 사용 시 로그인이 필요합니다.'
      );

    if (!e.target.files || e.target.files.length === 0 || !userId) return;

    try {
      const files = Array.from(e.target.files);

      const newFiles = files.map((file) => ({
        id: `${file.name}_${file.size}`,
        file,
        previewUrl: URL.createObjectURL(file),
      }));

      setUploadedFiles((prev) => [...prev, ...newFiles]);

      mutate(
        {
          files,
          bucketName: STORAGE.UPLOADIMG,
          userId,
        },
        {
          onSuccess: (results: { path: string }[]) => {
            setUploadedFiles((prev) => {
              return prev.map((file) => {
                const matchingLocalFile = newFiles.find(
                  (localFile) => localFile.id === file.id
                );

                if (matchingLocalFile) {
                  const resultIndex = newFiles.findIndex(
                    (local) => local.id === file.id
                  );
                  if (resultIndex !== -1 && results[resultIndex]) {
                    return { ...file };
                  }
                }
                return file;
              });
            });
          },
          onError: (err) => {
            sweetAlertUtil.error(
              '이미지 저장 실패',
              err.message || '알 수 없는 오류가 발생했습니다.'
            );
          },
        }
      );
    } catch (error) {
      console.error('업로드 처리 중 오류:', error);
    } finally {
      e.target.value = '';
    }
  };

  // 파일 클릭 시 업로드 요소로 추가
  const handleFileClick = (file: UploadedFile) => {
    const img = new window.Image();
    img.src = file.previewUrl;

    img.onload = () => {
      const maxW = 100;
      const maxH = 100;
      const scale = Math.min(maxW / img.width, maxH / img.height, 1);
      const width = img.width * scale;
      const height = img.height * scale;

      const newFile: UploadElement = {
        id: uuidv4(),
        type: 'upload',
        x: 100,
        y: 100,
        rotation: 0,
        previewUrl: file.previewUrl,
        width,
        height,
      };

      addElement(newFile);
      setSelectedElementId(newFile.id);
      const zoom = sideBarStore.getState().zoom;
      setToolbar(
        calculateToolbarPosition({
          x: newFile.x,
          y: newFile.y,
          width: newFile.width,
          height: newFile.height,
          zoom,
        })
      );
    };
  };

  useEffect(() => {
    return () => {
      uploadedFiles.forEach((file) => {
        URL.revokeObjectURL(file.previewUrl);
      });
    };
  }, []);

  return (
    <div className='relative h-full w-full p-[18px]'>
      {/* 상단: 업로드 */}
      <div className='flex flex-row items-center justify-center gap-2'>
        <label
          className={`relative cursor-pointer rounded px-[63px] py-[6px] text-label2-medium text-white ${uploading ? 'bg-gray-40' : 'bg-primary-40'}`}
        >
          {uploading ? '업로드 중...' : '업로드'}
          <input
            type='file'
            multiple
            accept='.jpg,.jpeg,.png,.svg'
            onChange={handleFileUpload}
            className='absolute left-0 top-0 z-10 h-full w-full cursor-pointer opacity-0'
          />
        </label>
        <button
          onClick={() => setShowInfo((pre) => !pre)}
          className='h-[34px] w-[32px] rounded-md bg-gray-10 p-[6px]'
        >
          <Image src='/icons/info.svg' height={20} width={20} alt='info' />
        </button>
      </div>

      {/* 업로드 정보 */}
      {isShowInfo && (
        <div className='mt-2 flex w-full flex-col gap-[14px] rounded-md border border-gray-5 px-3 py-4'>
          <div>
            <p className='text-caption-medium'>업로드 정보</p>
            <div className='mt-2 h-[1px] w-full bg-gray-5' />
          </div>
          <div>
            <div className='flex justify-between text-caption-medium'>
              <span>0.0% 사용중</span>
              <div>
                <span className='text-primary-40'>0.00GB</span>
                <span className='mx-1'>/</span>
                <span>1GB</span>
              </div>
            </div>
            <div className='mt-[6px] h-1 w-full rounded-full bg-gray-10' />
          </div>
          <div>
            <div className='h-[1px] w-full bg-gray-5' />
            <div className='mt-2 flex cursor-pointer items-center gap-1 text-caption-regular text-error'>
              <Image
                width={16}
                height={16}
                src='/icons/delete.svg'
                alt='delete'
              />
              <span>모든 업로드 파일 영구삭제</span>
            </div>
          </div>
        </div>
      )}

      {/* 파일 리스트 */}
      {uploadedFiles.length === 0 ? (
        <div className='absolute left-0 top-2/4 flex w-full -translate-y-2/4 flex-col items-center justify-center px-[18px] text-center text-gray-500'>
          <Image src='/icons/upload.svg' height={64} width={64} alt='upload' />
          <p className='mt-6 text-label1-bold text-[#1A1A1A]'>파일 업로드</p>
          <p className='mt-1 text-caption-regular text-gray-100'>
            JPG, SVG, PNG 파일을
            <br />
            업로드 버튼으로 올려주세요.
          </p>
        </div>
      ) : (
        <div className='mt-2 h-full w-full'>
          <div className='mb-2 text-sm'>파일 ({uploadedFiles.length})</div>
          <div className='grid w-full grid-cols-2 gap-2 border p-2'>
            {uploadedFiles.map((item) => {
              const fileName = item.file.name;
              return (
                <div
                  key={item.id}
                  onClick={() => handleFileClick(item)}
                  className='relative flex h-[58px] w-full cursor-pointer flex-col items-center justify-center border bg-gray-100'
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
