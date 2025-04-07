import Section1 from '@/components/main/section-one';
import Section2 from '@/components/main/section-two';
import Section3 from '@/components/main/section-three';
import Section5 from '@/components/main/section-five';
import Section4 from '@/components/main/section-four';

export default function Homepage() {
  return (
    <div className='flex flex-col'>
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
    </div>
  );
}
