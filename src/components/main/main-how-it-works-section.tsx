'use client';

import { useEffect, useState } from 'react';
import HowItWorksMobile from './how-it-works-mobile';
import MainHowItWorksDesktop from './how-it-works-desktop';

const MainHowItWorksSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile) {
    return <HowItWorksMobile />;
  } else return <MainHowItWorksDesktop />;
};

export default MainHowItWorksSection;
