import { SVGProps } from 'react';

const Circle = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='52'
      height='52'
      viewBox='0 0 52 52'
      fill='none'
      {...props}
    >
      <circle cx='26' cy='26' r='26' fill='#37383C' />
    </svg>
  );
};

export default Circle;
