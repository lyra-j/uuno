'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import React from 'react';

gsap.registerPlugin(ScrollTrigger);

const Pixso = () => {
  const [currentVideo, setCurrentVideo] = useState('/test1.mp4');
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const videoPaths = ['/test1.mp4', '/test2.mp4', '/test3.mp4', '/test4.mp4'];

  useEffect(() => {
    sectionRefs.current.forEach((section, i) => {
      if (!section) return;
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center-=10',
        onEnter: () => switchVideo(i),
        onEnterBack: () => switchVideo(i),
      });
    });
    ScrollTrigger.refresh();
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const switchVideo = (index: number) => {
    gsap.to('#videoWrapper', {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        setCurrentVideo(videoPaths[index]);
        gsap.to('#videoWrapper', { opacity: 1, duration: 0.5 });
      },
    });
  };

  return (
    <section ref={containerRef} className='relative flex w-full bg-white'>
      <div
        id='videoWrapper'
        className='sticky top-0 flex h-[50vh] w-[50%] items-center justify-center overflow-hidden bg-black'
        
      >
        <video
          key={currentVideo}
          src={currentVideo}
          autoPlay
          loop
          muted
          playsInline
          className='h-full w-full object-cover transition-opacity duration-500'
        />
      </div>

      {/* 오른쪽 스크롤 섹션: 50% 너비 */}
      <div className='w-[50%]'>
        {[0, 1, 2, 3].map((idx) => (
          <div
            key={idx}
            ref={(el) => {
              if (el) {
                sectionRefs.current[idx] = el;
              }
            }}
            className='flex h-screen flex-col items-center justify-center px-4'
            style={{ backgroundColor: idx % 2 === 0 ? '#f0f0f0' : '#ddd' }}
          >
            <h2 className='text-3xl'>Section {idx + 1}</h2>
            <p className='mt-4 max-w-md text-center text-lg'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pixso;
