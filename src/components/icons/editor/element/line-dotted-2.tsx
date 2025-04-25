import { SVGProps } from 'react';

const LineDotted2 = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width='54'
      height='3'
      viewBox='0 0 54 3'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M1 1L53 1'
        stroke='#37383C'
        strokeWidth='5'
        strokeDasharray='4,4'
        strokeLinecap='butt'
      />
    </svg>
  );
};

export default LineDotted2;
