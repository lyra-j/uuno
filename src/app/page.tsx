import Pixso from './_components/Pixso';
import Section1 from './_components/Section1';
import Section2 from './_components/Section2';
import Section3 from './_components/Section3';
import Section5 from './_components/Section5';

export default function Homepage() {
  return (
    <div className='flex flex-col'>
      <Section1 />
      <Section2 />
      <Section3 />
      <Pixso />
      <Section5 />
    </div>
  );
}
