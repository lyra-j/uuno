import { SVGProps } from 'react';

const CircleDotted = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='52'
      height='52'
      viewBox='0 0 52 52'
      fill='none'
      {...props}
    >
      <circle
        cx='26'
        cy='26'
        r='25.2031'
        stroke='#37383C'
        strokeWidth='1.59375'
        strokeDasharray='3.19 3.19'
      />
    </svg>
  );
};

export default CircleDotted;
