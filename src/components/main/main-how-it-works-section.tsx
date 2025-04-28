'use client';

import HowItWorksMobile from '@/components/main/how-it-works-mobile';
import MainHowItWorksDesktop from '@/components/main/how-it-works-desktop';
import { useIsMobile } from '@/hooks/use-is-mobile';

const MainHowItWorksSection = () => {
  const isMobile = useIsMobile();

  return isMobile ? <HowItWorksMobile /> : <MainHowItWorksDesktop />;
};

export default MainHowItWorksSection;
