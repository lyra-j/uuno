import { SVGProps } from 'react';

const Line = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='54'
      height='2'
      viewBox='0 0 54 2'
      fill='none'
      {...props}
    >
      <path
        d='M1 1L53 1'
        stroke='#37383C'
        strokeWidth='1.6745'
        strokeLinecap='round'
      />
    </svg>
  );
};

export default Line;
