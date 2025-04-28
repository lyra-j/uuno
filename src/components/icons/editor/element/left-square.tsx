import { SVGProps } from 'react';

const LeftSquare = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='58'
      height='10'
      viewBox='0 0 58 10'
      fill='none'
      {...props}
    >
      <g transform='scale(-1, 1) translate(-58, 0)'>
        <path
          d='M1 4.16275C0.5376 4.16275 0.16275 4.5376 0.16275 5C0.16275 5.4624 0.537599 5.83725 1 5.83725L1 4.16275ZM57.8339 5L53 0.166139L48.1661 5L53 9.83387L57.8339 5ZM1 5.83725L53 5.83725L53 4.16275L1 4.16275L1 5.83725Z'
          fill='#37383C'
        />
      </g>
    </svg>
  );
};

export default LeftSquare;
