import { SVGProps } from 'react';

const LineDotted = (props: SVGProps<SVGSVGElement>) => {
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
        strokeWidth='6'
        strokeDasharray='10,10'
        strokeLinecap='butt'
      />
    </svg>
  );
};

export default LineDotted;
