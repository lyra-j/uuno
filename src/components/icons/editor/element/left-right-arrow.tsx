import { SVGProps } from 'react';

const LeftRightArrow = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='52'
      height='10'
      viewBox='0 0 52 10'
      fill='none'
      {...props}
    >
      <path
        d='M0 5L8.3725 9.83387L8.3725 0.166135L0 5ZM52 5L43.6275 0.166138L43.6275 9.83387L52 5ZM7.53525 5.83725L44.4647 5.83725L44.4647 4.16275L7.53525 4.16275L7.53525 5.83725Z'
        fill='#37383C'
      />
    </svg>
  );
};

export default LeftRightArrow;
