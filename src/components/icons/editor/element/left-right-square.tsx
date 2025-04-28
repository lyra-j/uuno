import { SVGProps } from 'react';

const LeftRightSquare = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='62'
      height='10'
      viewBox='0 0 62 10'
      fill='none'
      {...props}
    >
      <path
        d='M0.166134 5L5 9.83387L9.83387 5L5 0.166134L0.166134 5ZM61.8339 5L57 0.166139L52.1661 5L57 9.83387L61.8339 5ZM5 5L5 5.83725L57 5.83725L57 5L57 4.16275L5 4.16275L5 5Z'
        fill='#37383C'
      />
    </svg>
  );
};

export default LeftRightSquare;
