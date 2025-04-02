'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
// import Image from 'next/image';
// import { Button } from '@/components/ui/button';
// import Link from 'next/link';

// const images = [
//   { src: '', alt: '' },
//   { src: '', alt: '' },
//   { src: '', alt: '' },
// ];

//자동 넘기는 시간 정하기
//const autoplayOptions = { delay: 1000 * 2, stopOnInteraction: false };

const MainCarousel = () => {
  return (
    <div className='flex justify-center'>
      <Carousel
        opts={{ loop: true }}
        // plugins={[Autoplay(autoplayOptions)]}
        className='w-full max-w-xs'
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className='p-1'>
                <Card>
                  <CardContent className='flex aspect-square items-center justify-center p-6'>
                    <span className='text-4xl font-semibold'>{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default MainCarousel;
