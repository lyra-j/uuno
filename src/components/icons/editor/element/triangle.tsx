import { SVGProps } from 'react';

const Triangle = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='46'
      height='52'
      viewBox='0 0 46 39'
      fill='none'
      {...props}
    >
      <path d='M23 0L45.5167 39H0.483339L23 0Z' fill='#37383C' />
    </svg>
  );
};

export default Triangle;
