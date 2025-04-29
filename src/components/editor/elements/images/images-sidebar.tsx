'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useEditorStore } from '@/store/editor.store';
import SearchReadingGlassesIcon from '@/components/icons/editor/search-reading-glasses';
import { v4 as uuidv4 } from 'uuid';
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll';
import { UnsplashImage } from '@/types/unsplash';
import { useUnsplashImages } from '@/hooks/queries/use-unsplash-images';
import { calculateToolbarPosition } from '@/utils/editor/editor-calculate-toolbar-position';
import { sideBarStore } from '@/store/editor.sidebar.store';
import { ImageElement } from '@/types/editor.type';
import ENV from '@/constants/env.constant';
import SearchDeleteIcon from '@/components/icons/editor/search-delete';
import { Icon } from '@iconify/react/dist/iconify.js';

const MAX_IMAGE_SIZE = 100;

const ImageSidebar = () => {
  const [query, setQuery] = useState('');
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useUnsplashImages(query);

  //store
  const addElement = useEditorStore((state) => state.addElement);
  const setToolbar = useEditorStore((state) => state.setToolbar);
  const setSelectedElementId = useEditorStore(
    (state) => state.setSelectedElementId
  );

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [root, setRoot] = useState<HTMLDivElement | null>(null);

  const images: UnsplashImage[] = data?.pages.flatMap((page) => page) ?? [];

  useEffect(() => {
    if (scrollContainerRef.current) {
      setRoot(scrollContainerRef.current);
    }
  }, []);

  // 무한스크롤 옵저버
  const observerRef = useInfiniteScroll({
    root,
    hasMore: !!hasNextPage,
    onIntersect: fetchNextPage,
  });

  /**
   * 이미지 클릭시 추가
   * @param img 이미지 데이터
   */
  const handleAddImage = useCallback(
    async (img: UnsplashImage) => {
      const id = uuidv4();
      const aspectRatio = img.height! / img.width!;

      const newImage: ImageElement = {
        id,
        type: 'image',
        x: 50,
        y: 50,
        rotation: 0,
        previewUrl: img.urls.regular,
        width: MAX_IMAGE_SIZE,
        height: MAX_IMAGE_SIZE * aspectRatio,
        authorName: img.user.name,
        imageLink: img.links.html,
      };
      addElement(newImage);
      setSelectedElementId(newImage.id);
      const zoom = sideBarStore.getState().zoom;
      setToolbar(
        calculateToolbarPosition({
          x: newImage.x,
          y: newImage.y,
          width: newImage.width,
          height: newImage.height,
          zoom,
        })
      );

      fetch(img.links.download_location, {
        method: 'GET',
        headers: {
          Authorization: `Client-ID ${ENV.UNSPLASH_ACCESS_KEY}`,
        },
      }).catch(console.error);
    },
    [addElement, setSelectedElementId, setToolbar]
  );

  //초기화
  const handleClear = () => {
    setQuery('');
  };

  return (
    <div
      ref={scrollContainerRef}
      className='h-[calc(100vh-64px)] space-y-3 overflow-y-auto p-[18px]'
    >
      {/* 검색 영역 */}
      <div className='flex h-[36px] cursor-pointer items-center rounded-[6px] border px-2'>
        <SearchReadingGlassesIcon />
        <input
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='사진'
          className='flex-1 text-xs placeholder-gray-50 focus:outline-none'
        />
        <button onClick={handleClear}>
          <SearchDeleteIcon />
        </button>
      </div>

      <div className='flex flex-col px-2'>
        <a
          href='https://unsplash.com'
          target='_blank'
          rel='noopener noreferrer'
          className='flex flex-row items-center gap-1 hover:text-primary-50'
        >
          <Icon icon='bxl:unsplash' width='15' height='15' color='black' />
          <p className='text-caption-bold text-black'>Unsplash</p>
        </a>
        <div className='my-1 h-[1px] bg-gray-5' />
        <p className='text-caption-regular'>
          이미지 출처는 언스플래시에서 <br /> 제공되는 이미지를 사용하고
          있습니다.
        </p>
      </div>

      {/* 상태 표시 */}
      {isLoading && <p className='text-center text-sm'>로딩 중...</p>}
      {isError && <p className='text-center text-sm text-red-500'>에러 발생</p>}
      {!isLoading && images.length === 0 && (
        <p className='text-center text-sm text-gray-500'>
          검색 결과가 없습니다.
        </p>
      )}

      {/* 이미지 리스트 */}
      <div className='flex flex-col gap-3'>
        {images.map((img) => (
          <div
            key={img.id}
            onClick={() => handleAddImage(img)}
            className='group relative aspect-[3/2] w-full cursor-pointer overflow-hidden rounded border'
          >
            <img
              src={img.urls.regular}
              alt={img.alt_description || 'unsplash image'}
              className='object-cover transition-transform duration-300 group-hover:scale-105'
            />
            <div className='absolute bottom-0 left-0 right-0 bg-black/60 px-1 py-[2px] text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100'>
              <a
                href={`${img.links.html}?utm_source=unno&utm_medium=referral`}
                target='_blank'
                rel='noopener noreferrer'
                className='underline'
                onClick={(e) => e.stopPropagation()}
              >
                Photo by {img.user.name} on Unsplash
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* 다음 페이지 로딩 인디케이터 */}
      {isFetchingNextPage && (
        <p className='text-center text-sm'>추가 로딩 중…</p>
      )}

      <div ref={observerRef} className='h-10' />
    </div>
  );
};

export default ImageSidebar;
