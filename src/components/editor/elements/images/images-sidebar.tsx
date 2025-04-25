'use client';

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useEditorStore } from '@/store/editor.store';
import SearchReadingGlassesIcon from '@/components/icons/editor/search-reading-glasses';
import { v4 as uuidv4 } from 'uuid';
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll';
import { debounce } from '@/utils/common/common.debounce.utils';
import { UnsplashImage } from '@/types/unsplash';
import { useUnsplashImages } from '@/hooks/queries/use-unsplash-images';
import { calculateToolbarPosition } from '@/utils/editor/editor-calculate-toolbar-position';
import { sideBarStore } from '@/store/editor.sidebar.store';
import { ImageElement } from '@/types/editor.type';
import { sweetComingSoonAlert } from '@/utils/common/sweet-coming-soon-alert';

const IMAGES_PER_PAGE = 8;
const MAX_IMAGE_SIZE = 100;

const ImageSidebar = () => {
  const { data: allImages = [], isLoading, isError } = useUnsplashImages();

  const [query, setQuery] = useState('');
  const [filteredImages, setFilteredImages] = useState<UnsplashImage[]>([]);
  const [page, setPage] = useState<number>(1);

  //store
  const addElement = useEditorStore((state) => state.addElement);
  const setToolbar = useEditorStore((state) => state.setToolbar);
  const setSelectedElementId = useEditorStore(
    (state) => state.setSelectedElementId
  );

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  /**
   * query 변경 시 클라이언트 필터링 (debounced)
   */
  const debouncedFilter = useRef(
    debounce((keyword: string, images: UnsplashImage[]) => {
      const lower = keyword.toLowerCase();
      const filtered = images.filter((img) => {
        const alt = img.alt_description?.toLowerCase() || '';
        const user = img.user?.name?.toLowerCase() || '';
        return alt.includes(lower) || user.includes(lower);
      });
      setFilteredImages(filtered);
      setPage(1);
    }, 300)
  ).current;

  useEffect(() => {
    debouncedFilter(query, allImages);
  }, [query, allImages, debouncedFilter]);

  // 검색 중이면 필터링된 결과 전부, 그렇지 않으면 페이지에 따라 잘라서 반환
  const visibleImages = useMemo(() => {
    return query.trim()
      ? filteredImages
      : allImages.slice(0, page * IMAGES_PER_PAGE);
  }, [query, page, allImages, filteredImages]);

  // 무한스크롤
  const observerRef = useInfiniteScroll({
    root: scrollContainerRef.current,
    hasMore: !query && allImages.length > page * IMAGES_PER_PAGE,
    onIntersect: () => setPage((prev) => prev + 1),
  });

  /**
   * 이미지 클릭시 추가
   * @param img 이미지 데이터
   */
  const handleAddImage = useCallback(
    async (img: UnsplashImage) => {
      const id = uuidv4();

      const aspectRatio = img.height! / img.width!;
      const calHeight = MAX_IMAGE_SIZE * aspectRatio;

      const newImage: ImageElement = {
        id,
        type: 'image',
        x: 50,
        y: 50,
        rotation: 0,
        previewUrl: img.urls.regular,
        width: MAX_IMAGE_SIZE,
        height: calHeight,
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

      try {
        await fetch(img.links.download_location, {
          method: 'GET',
          headers: {
            Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
          },
        });
      } catch (error) {
        console.error('Failed to trigger download:', error);
      }
    },
    [addElement, setSelectedElementId, setToolbar]
  );

  const handleClear = useCallback(() => {
    setQuery('');
    setPage(1);
  }, []);

  return (
    <div
      ref={scrollContainerRef}
      className='h-full space-y-3 overflow-y-auto p-[18px]'
    >
      {/* 검색 영역 */}
      <div
        className='flex h-[36px] cursor-pointer items-center rounded-[6px] border px-2'
        onClick={sweetComingSoonAlert}
      >
        <SearchReadingGlassesIcon />
        {/* Todo */}
        {/* <input
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='이미지 검색'
          className='flex-1 text-xs placeholder-gray-50 focus:outline-none'
        /> */}
        <button onClick={handleClear}>{/* <SearchDeleteIcon /> */}</button>
      </div>

      <div className='flex items-center justify-center text-xs text-gray-500'>
        <p className='text-sm text-gray-800'>
          Photos by{' '}
          <a
            href='https://unsplash.com'
            target='_blank'
            rel='noopener noreferrer'
            className='text-primary-50 hover:underline'
          >
            Unsplash
          </a>
        </p>
      </div>

      {/* 로딩, 에러, 결과 없음 UI */}
      <div className='flex flex-col gap-3'>
        {isLoading && (
          <div className='text-center text-sm text-gray-400'>
            이미지를 불러오는 중입니다...
          </div>
        )}
        {isError && (
          <div className='text-center text-sm text-red-500'>
            이미지를 불러오지 못했습니다.
          </div>
        )}
        {!isLoading && !isError && visibleImages.length === 0 && (
          <div className='mt-4 text-center text-sm text-gray-500'>
            검색 결과가 없습니다.
          </div>
        )}
        {!isLoading &&
          !isError &&
          visibleImages.map((img) => (
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

      <div ref={observerRef} className='h-10' />
    </div>
  );
};

export default ImageSidebar;
