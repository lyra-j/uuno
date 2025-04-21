'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!showButton) return null;

  return (
    <button
      aria-label='Scroll to top'
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className='fixed bottom-[84px] right-[84px] z-10 flex items-center justify-center gap-[10px] rounded-[56px] border border-gray-5 bg-white p-[10px] shadow-[0_4px_20px_0_rgba(0,0,0,0.15)] transition-all hover:bg-gray-5'
    >
      <Icon icon='tdesign:arrow-up' width='28' height='28' />
    </button>
  );
};

export default ScrollToTopButton;
