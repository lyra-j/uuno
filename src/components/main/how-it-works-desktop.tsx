'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import React from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react/dist/iconify.js';
import {
  mainIconList,
  mainSectionContent,
  mainVideoPaths,
} from '@/constants/main.constant';

gsap.registerPlugin(ScrollTrigger);

const MainHowItWorksSection = () => {
  const [currentVideo, setCurrentVideo] = useState<string>(
    '/gif/template-manual.mp4'
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
          setCurrentVideo(mainVideoPaths[index]);
          gsap.to('#videoWrapper', { opacity: 1, duration: 0.5 });
        },
      });
    },
    [mainVideoPaths]
  );

  useEffect(() => {
    const localTriggers: ScrollTrigger[] = [];
    sectionRefs.current.forEach((section, i) => {
      if (!section) return;
      const trig = ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => switchVideo(i),
        onEnterBack: () => switchVideo(i),
      });
      localTriggers.push(trig);
    });
    ScrollTrigger.refresh();
    return () => localTriggers.forEach((t) => t.kill());
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

  useEffect(() => {
    const fadeStart = 0.3;

    const triggers = sectionRefs.current
      .map((section) => {
        if (!section) return null;
        const textEl = section.querySelector<HTMLElement>('.section-text');
        if (!textEl) return null;

        textEl.style.opacity = '1';

        return ScrollTrigger.create({
          trigger: section,
          start: 'top center',
          end: 'bottom top',
          scrub: true,
          onUpdate: (self) => {
            const p = self.progress;
            let opacity: number;

            if (p <= fadeStart) {
              opacity = 1;
            } else {
              opacity = 1 - (p - fadeStart) / (1 - fadeStart);
            }

            textEl.style.opacity = `${Math.max(0, Math.min(1, opacity))}`;
          },
        });
      })
      .filter((t): t is ScrollTrigger => t !== null);

    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <section
      ref={containerRef}
      className='relative mx-auto flex w-full max-w-5xl items-start justify-center gap-32 bg-white'
    >
      {/* 왼쪽: video */}
      <div
        id='videoWrapper'
        className='sticky top-0 flex h-screen w-full max-w-[500px] items-center justify-center self-start overflow-hidden'
      >
        <div className='relative h-[313px] w-full'>
          <video
            key={currentVideo}
            src={currentVideo}
            className='h-full w-full rounded-md object-contain transition-opacity duration-500'
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      </div>

      {/* 오른쪽: 텍스트 */}
      <div className='flex w-full max-w-[500px] flex-col'>
        {mainSectionContent.map((sec, idx) => (
          <div
            key={idx}
            ref={(el) => {
              if (el) sectionRefs.current[idx] = el;
            }}
            className='flex h-screen items-center justify-start'
          >
            <div className='section-text'>
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
        <div className='fixed right-[128px] top-1/2 z-10 -translate-y-1/2'>
          <div className='flex flex-col gap-6 rounded-[100px] bg-gray-5 px-[6px] py-[20px]'>
            {mainIconList.map((icon, idx) => (
              <div
                key={idx}
                className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${
                  idx === activeIndex
                    ? 'scale-110 bg-primary-40 text-white shadow-lg'
                    : 'text-[#B0B0B0] hover:scale-110 hover:text-primary-40'
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
