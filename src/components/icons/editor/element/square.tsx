import { SVGProps } from 'react';

const Square = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width='52'
      height='52'
      viewBox='0 0 52 52'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <rect width='52' height='52' fill='#37383C' />
    </svg>
  );
};

export default Square;
