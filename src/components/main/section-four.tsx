'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import React from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react/dist/iconify.js';

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
    title: '통계 확인',
    subtitle: '쉽고 간편하게 원하는 템플릿 선택하기',
    content:
      '원하는 키워드의 템플릿을 선택하고 제작하세요.\n 내가 원하는 대로 처음부터 제작할 수 있어요.',
  },
  {
    title: '명함 공유',
    subtitle: '내 명함을 확인하고 다른 사람들에게 공유하기',
    content:
      '원하는 키워드의 템플릿을 선택하고 제작하세요.\n 내가 원하는 대로 처음부터 제작할 수 있어요.',
  },
];

const gifPaths = [
  '/gif/template-manual.gif',
  '/gif/editor-manual.gif',
  '/gif/chart-manual.gif',
  '/gif/share-manual.gif',
];

const iconList = [
  'tdesign:module',
  'tdesign:palette',
  'oui:stats',
  'tdesign:share',
];

const MainHowItWorksSection = () => {
  const [currentVideo, setCurrentVideo] = useState<string>(
    '/gif/template-manual.gif'
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const switchVideo = useCallback(
    (index: number) => {
      gsap.to('#videoWrapper', {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          setActiveIndex(index);
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
        start: 'top ㅅ',
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

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      onEnter: () => setInView(true),
      onLeave: () => setInView(false),
      onEnterBack: () => setInView(true),
      onLeaveBack: () => setInView(false),
    });

    return () => trigger.kill();
  }, []);

  return (
    <section
      ref={containerRef}
      className='relative mx-auto flex w-full max-w-5xl gap-[200px] bg-white'
    >
      {/* 왼쪽: GIF */}
      <div
        id='videoWrapper'
        className='sticky top-0 flex h-screen w-1/2 items-center justify-center overflow-hidden'
      >
        <div className='relative h-[313px] w-[500px]'>
          <Image
            key={currentVideo}
            src={currentVideo}
            fill
            alt='gif'
            className='rounded-md transition-opacity duration-500'
            unoptimized
          />
        </div>
      </div>

      {/* 오른쪽: 텍스트 */}
      <div className='flex w-1/2 flex-col'>
        {sectionsContent.map((sec, idx) => (
          <div
            key={idx}
            ref={(el) => {
              if (el) sectionRefs.current[idx] = el;
            }}
            className='flex h-screen items-center'
          >
            <div>
              <h2 className='mb-[6px] text-title-bold text-primary-40'>
                {sec.title}
              </h2>
              <h3 className='mb-[15px] text-body-medium text-primary-80'>
                {sec.subtitle}
              </h3>
              <p className='whitespace-pre-line text-label2-regular text-gray-70'>
                {sec.content}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 아이콘 바  */}
      {inView && (
        <div className='fixed bottom-[120px] left-1/2 z-50 -translate-x-1/2'>
          <div className='flex gap-3 rounded-full bg-[#F5F6F7] px-4 py-2'>
            {iconList.map((icon, idx) => (
              <div
                key={idx}
                className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${
                  idx === activeIndex
                    ? 'scale-110 bg-[#2C64F5] text-white shadow-lg'
                    : 'text-[#B0B0B0] hover:scale-110 hover:text-[#2C64F5]'
                }`}
              >
                <Icon icon={icon} width={18} height={18} />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default MainHowItWorksSection;

// <Icon icon='tdesign:module' width='24' height='24' />
// <Icon icon='tdesign:palette' width='24' height='24' />
// <Icon icon='oui:stats' width='16' height='16' />
// <Icon icon='tdesign:share' width='24' height='24' />
