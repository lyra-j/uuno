import { SVGProps } from 'react';

const SquareWhite = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width='52'
      height='52'
      viewBox='0 0 52 52'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <rect
        x='0.796875'
        y='0.796875'
        width='50.4062'
        height='50.4062'
        stroke='#37383C'
        strokeWidth='1.59375'
      />
    </svg>
  );
};

export default SquareWhite;
