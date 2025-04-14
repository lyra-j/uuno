'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ImageElement, useEditorStore } from '@/store/editor.store';
import SearchReadingGlassesIcon from '@/components/icons/editor/search-reading-glasses';
import SearchDeleteIcon from '@/components/icons/editor/search-delete';
import { v4 as uuidv4 } from 'uuid';
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll';
import { TOOLBAR_WIDTH } from '@/constants/editor.constant';
import { debounce } from '@/utils/common/common.debounce.utils';
import { UnsplashImage } from '@/types/unsplash';

const IMAGES_PER_PAGE = 8;

const ImageSidebar = () => {
  //검색
  const [query, setQuery] = useState('');
  //전체 이미지 목록
  const [allImages, setAllImages] = useState<UnsplashImage[]>([]);
  const [filteredImages, setFilteredImages] = useState<UnsplashImage[]>([]);
  // 표시 이미지 목록
  const [visibleImages, setVisibleImages] = useState<UnsplashImage[]>([]);
  //현재 페이지 번호
  const [page, setPage] = useState<number>(1);

  //store
  const addElement = useEditorStore((state) => state.addElement);
  const setToolbar = useEditorStore((state) => state.setToolbar);
  const setSelectedElementId = useEditorStore(
    (state) => state.setSelectedElementId
  );

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  /**
   * 최초 한 번만 전체 이미지 가져오기
   */
  useEffect(() => {
    const fetchInitialImages = async () => {
      const res = await fetch('/api/unsplash');
      const data = await res.json();
      const imageArray: UnsplashImage[] = Array.isArray(data)
        ? data
        : data.results || [];
      setAllImages(imageArray);
      setFilteredImages(imageArray); // 초기값은 전체
    };
    fetchInitialImages();
  }, []);

  /**
   * query 변경 시 클라이언트 필터링 (debounced)
   */
  const debouncedFilter = useRef(
    debounce((keyword: string, images: UnsplashImage[]) => {
      const lower = keyword.toLowerCase();
      const filtered = images.filter((img) => {
        return (
          img.alt_description?.toLowerCase().includes(lower) ||
          img.user.name.toLowerCase().includes(lower)
        );
      });
      setFilteredImages(filtered);
      setPage(1); // 검색 시 페이지 초기화
    }, 300)
  ).current;

  useEffect(() => {
    debouncedFilter(query, allImages);
  }, [query, allImages]);

  // 페이지와 전체 이미지가 변경되면 visibleImages 업데이트
  useEffect(() => {
    setVisibleImages(allImages.slice(0, page * IMAGES_PER_PAGE));
  }, [page, allImages]);

  //무한스크롤
  const observerRef = useInfiniteScroll({
    root: scrollContainerRef.current,
    hasMore: visibleImages.length < allImages.length,
    onIntersect: () => setPage((prev) => prev + 1),
  });

  /**
   * 이미지 클릭시 추가
   * @param img 이미지 데이터
   */
  const handleAddImage = (img: UnsplashImage) => {
    const id: string = uuidv4();
    const newImage: ImageElement = {
      id,
      type: 'image',
      x: 50,
      y: 50,
      rotation: 0,
      previewUrl: img.urls.regular,
      width: 200,
      height: 200,
      authorName: img.user.name,
      imageLink: img.links.html,
    };
    addElement(newImage);
    setSelectedElementId(newImage.id);
    setToolbar({
      x: newImage.x + newImage.width / 2 - TOOLBAR_WIDTH / 2,
      y: newImage.y + newImage.height + 8,
    });
  };

  return (
    <div
      ref={scrollContainerRef}
      className='h-full space-y-3 overflow-y-auto p-[18px]'
    >
      {/* 검색 */}
      <div className='flex h-[36px] items-center rounded-[6px] border px-2'>
        <SearchReadingGlassesIcon />
        <input
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='이미지 검색'
          className='flex-1 text-xs placeholder-gray-50 focus:outline-none'
        />
        <button onClick={() => setQuery('')}>
          <SearchDeleteIcon />
        </button>
      </div>

      {/* 설명 */}
      <div className='flex justify-between text-xs text-gray-500'>
        <p>가로 이미지</p>
        <p>i</p>
      </div>

      {/* 이미지 리스트 */}
      <div className='flex flex-col gap-3'>
        {visibleImages.map((img) => (
          <div
            key={img.id}
            onClick={() => handleAddImage(img)}
            className='group relative aspect-[3/2] w-full cursor-pointer overflow-hidden rounded border'
          >
            <Image
              src={img.urls.regular}
              alt={img.alt_description || 'unsplash image'}
              fill
              className='object-cover transition-transform duration-300 group-hover:scale-105'
              unoptimized
            />
            <div className='absolute bottom-0 left-0 right-0 bg-black/60 px-1 py-[2px] text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100'>
              <a
                href={img.links.html}
                target='_blank'
                rel='noopener noreferrer'
                className='underline'
              >
                Photo by {img.user.name} on Unsplash
              </a>
            </div>
          </div>
        ))}
      </div>

      <div ref={observerRef} className='h-10' />
    </div>
  );
};

export default ImageSidebar;
