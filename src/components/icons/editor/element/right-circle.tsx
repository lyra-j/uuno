import { SVGProps } from 'react';

const RightCircle = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='58'
      height='10'
      viewBox='0 0 58 10'
      fill='none'
      {...props}
    >
      <path
        d='M1 4.16275C0.5376 4.16275 0.16275 4.5376 0.16275 5C0.16275 5.4624 0.537599 5.83725 1 5.83725L1 4.16275ZM48.5347 5C48.5347 7.46614 50.5339 9.46534 53 9.46534C55.4661 9.46534 57.4653 7.46614 57.4653 5C57.4653 2.53387 55.4661 0.534671 53 0.534671C50.5339 0.53467 48.5347 2.53387 48.5347 5ZM1 5L1 5.83725L53 5.83725L53 5L53 4.16275L1 4.16275L1 5Z'
        fill='#37383C'
      />
    </svg>
  );
};

export default RightCircle;
