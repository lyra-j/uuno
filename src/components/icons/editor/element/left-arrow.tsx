import { SVGProps } from 'react';

const LeftArrow = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='53'
      height='10'
      viewBox='0 0 53 10'
      fill='none'
      {...props}
    >
      <g transform='scale(-1, 1) translate(-53, 0)'>
        <path
          d='M1 4.16275C0.5376 4.16275 0.16275 4.5376 0.16275 5C0.16275 5.4624 0.537599 5.83725 1 5.83725L1 4.16275ZM53 5L44.6275 0.166138L44.6275 9.83387L53 5ZM1 5.83725L45.4647 5.83725L45.4647 4.16275L1 4.16275L1 5.83725Z'
          fill='#37383C'
        />
      </g>
    </svg>
  );
};

export default LeftArrow;
