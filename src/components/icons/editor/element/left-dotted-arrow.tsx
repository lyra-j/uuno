import { SVGProps } from 'react';

const LeftDottedArrow = (props: SVGProps<SVGSVGElement>) => {
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
          d='M1 4.16275C0.5376 4.16275 0.16275 4.5376 0.16275 5C0.16275 5.4624 0.5376 5.83725 1 5.83725V4.16275ZM53 5L44.6275 0.166134V9.83387L53 5ZM1 5.83725H2.625V4.16275H1V5.83725ZM5.875 5.83725H9.125V4.16275H5.875V5.83725ZM12.375 5.83725H15.625V4.16275H12.375V5.83725ZM18.875 5.83725H22.125V4.16275H18.875V5.83725ZM25.375 5.83725H28.625V4.16275H25.375V5.83725ZM31.875 5.83725H35.125V4.16275H31.875V5.83725ZM38.375 5.83725H41.625V4.16275H38.375V5.83725ZM44.875 5.83725H48.125V4.16275H44.875V5.83725Z'
          fill='#37383C'
        />
      </g>
    </svg>
  );
};

export default LeftDottedArrow;
