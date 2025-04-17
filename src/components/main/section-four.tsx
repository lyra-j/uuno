'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import React from 'react';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const sectionsContent = [
  {
    title: '템플릿 선택',
    subtitle: '쉽고 간편하게 원하는 템플릿 선택하기',
    content:
      '원하는 키워드의 템플릿을 선택하고 제작하세요.\n 내가 원하는 대로 처음부터 제작할 수 있어요.',
  },
  {
    title: '디자인 커스텀',
    subtitle: '맞춤형 명함을 에디터에서 제작하기',
    content:
      '원하는 키워드의 템플릿을 선택하고 제작하세요.\n 내가 원하는 대로 처음부터 제작할 수 있어요.',
  },
  {
    title: '명함 공유',
    subtitle: '내 명함을 확인하고 다른 사람들에게 공유하기',
    content:
      '원하는 키워드의 템플릿을 선택하고 제작하세요.\n 내가 원하는 대로 처음부터 제작할 수 있어요.',
  },
  {
    title: '통계 확인',
    subtitle: '쉽고 간편하게 원하는 템플릿 선택하기',
    content:
      '원하는 키워드의 템플릿을 선택하고 제작하세요.\n 내가 원하는 대로 처음부터 제작할 수 있어요.',
  },
];

const Section4 = () => {
  const [currentVideo, setCurrentVideo] = useState<string>('/템플릿.gif');
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // 추후 동영상 재생되면 바꿀 예정
  // const videoPaths = useMemo(
  //   () => ['/test1.mp4', '/test2.mp4', '/test3.mp4', '/test4.mp4'],
  //   []
  // );
  const gifPaths = useMemo(
    () => ['/템플릿.gif', '/에디터.gif', '/공유.gif', '/통계.gif'],
    []
  );

  const switchVideo = useCallback(
    (index: number) => {
      gsap.to('#videoWrapper', {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          setCurrentVideo(gifPaths[index]);
          gsap.to('#videoWrapper', { opacity: 1, duration: 0.5 });
        },
      });
    },
    [gifPaths]
  );

  useEffect(() => {
    sectionRefs.current.forEach((section, i) => {
      if (!section) return;
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => switchVideo(i),
        onEnterBack: () => switchVideo(i),
      });
    });
    ScrollTrigger.refresh();
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [switchVideo]);

  return (
    <section
      ref={containerRef}
      className='relative mx-auto flex w-full max-w-6xl bg-white'
    >
      {/* 왼쪽: 고정된 동영상 영역 */}
      <div
        id='videoWrapper'
        className='sticky top-0 flex h-screen w-1/2 items-center justify-center overflow-hidden'
      >
        <div className='relative h-1/2 w-full'>
          <Image
            key={currentVideo}
            src={currentVideo}
            fill
            alt='gif'
            className='transition-opacity duration-500'
            unoptimized
          />
        </div>
        {/* <video
          key={currentVideo}
          src={currentVideo}
          autoPlay
          loop
          muted
          playsInline
          className='h-1/2 object-cover transition-opacity duration-500'
        /> */}
      </div>

      {/* 오른쪽: 스크롤 섹션 */}
      <div className='flex w-1/2 flex-col'>
        {sectionsContent.map((sec, idx) => (
          <div
            key={idx}
            ref={(el) => {
              if (el) sectionRefs.current[idx] = el;
            }}
            className='flex h-screen items-center px-8'
          >
            <div>
              <h2 className='mb-4 text-3xl font-bold text-blue-500'>
                {sec.title}
              </h2>
              <h2 className='mb-4 text-2xl font-bold'>{sec.subtitle}</h2>
              <p className='max-w-md whitespace-pre-line text-base leading-relaxed text-gray-700'>
                {sec.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Section4;
