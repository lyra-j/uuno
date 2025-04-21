import ScrollToTopButton from '@/components/main/ScrollToTopButton';
import MainIntorSection from '@/components/main/section-one';
import MainFeatureSection from '@/components/main/section-two';
import MainPromotionSection from '@/components/main/section-half';
import MainHowItWorksSection from '@/components/main/section-four';
import MainLastSection from '@/components/main/section-five';
import MainTipSection from '@/components/main/section-three';

export default function Homepage() {
  return (
    <div className='flex flex-col'>
      <MainIntorSection />
      <MainFeatureSection />
      <MainTipSection />
      <MainPromotionSection />
      <MainHowItWorksSection />
      <MainLastSection />

      <ScrollToTopButton />
    </div>
  );
}
