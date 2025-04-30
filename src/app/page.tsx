import MainFeatureSection from '@/components/main/main-feature-section';
import MainFooter from '@/components/main/main-footer';
import MainHowItWorksSection from '@/components/main/main-how-it-works-section';
import MainIntorSection from '@/components/main/main-Intor-section';
import MainLastSection from '@/components/main/main-last-section';
import MainPromotionSection from '@/components/main/main-promotion-section';
import MainTipSection from '@/components/main/main-tip-section';
import ScrollToTopButton from '@/components/main/ScrollToTopButton';

export default function Homepage() {
  return (
    <div className='flex w-full flex-col'>
      <MainIntorSection />
      <MainFeatureSection />
      <MainTipSection />
      <MainPromotionSection />
      <MainHowItWorksSection />
      <MainLastSection />
      <MainFooter />

      <ScrollToTopButton />
    </div>
  );
}
