'use client';

import { useEffect, useState } from 'react';
import HowItWorksMobile from '@/components/main/how-it-works-mobile';
import MainHowItWorksDesktop from '@/components/main/how-it-works-desktop';

const MainHowItWorksSection = () => {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth <= 768
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };
    const mq = window.matchMedia('(max-width: 768px)');
    mq.addEventListener('change', handleResize);
    handleResize();
    return () => mq.removeEventListener('change', handleResize);
  }, []);

  if (isMobile) {
    return <HowItWorksMobile />;
  } else return <MainHowItWorksDesktop />;
};

export default MainHowItWorksSection;
