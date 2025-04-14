'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useEditorStore } from '@/store/editor.store';
import SearchReadingGlassesIcon from '@/components/icons/editor/search-reading-glasses';
import SearchDeleteIcon from '@/components/icons/editor/search-delete';

const IMAGES_PER_PAGE = 12;

const ImageSidebar = () => {
  const [query, setQuery] = useState('');
  const [allImages, setAllImages] = useState<any[]>([]);
  const [visibleImages, setVisibleImages] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const addElement = useEditorStore((state) => state.addElement);

  const fetchFromApi = async () => {
    const url = query ? `/api/unsplash?query=${query}` : '/api/unsplash';

    const res = await fetch(url);
    const data = await res.json();
    setAllImages(data);
    setVisibleImages(data.slice(0, IMAGES_PER_PAGE));
    setPage(1);
  };

  // useEffect(() => {
  //   fetchFromApi();
  // }, [query]);

  // useEffect(() => {
  //   setVisibleImages(allImages.slice(0, page * IMAGES_PER_PAGE));
  // }, [page, allImages]);

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleAddImage = (url: string) => {
    const id = crypto.randomUUID();
    addElement({
      id,
      type: 'upload',
      x: 100,
      y: 100,
      rotation: 0,
      previewUrl: url,
      width: 200,
      height: 200,
    });
  };

  return (
    <div className='w-full space-y-3 p-[18px]'>
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
        <button>
          <SearchDeleteIcon />
        </button>
      </div>

      {/* 설명 */}
      <div className='flex w-full justify-between'>
        <p className='text-xs'>가로 이미지</p>
        <p className='text-xs'>i</p>
      </div>

      <div className='flex flex-col gap-3'>
        {visibleImages.map((img) => (
          <div
            key={img.id}
            className='group relative aspect-[3/2] w-full cursor-pointer overflow-hidden rounded border'
            onClick={() => handleAddImage(img.urls.regular)}
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
