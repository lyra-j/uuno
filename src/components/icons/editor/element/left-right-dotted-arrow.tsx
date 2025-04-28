import { SVGProps } from 'react';

const LeftRightDottedArrow = (props: SVGProps<SVGSVGElement>) => {
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
        d='M0 5L8.3725 9.83387V0.166134L0 5ZM52 5L43.6275 0.166134V9.83387L52 5ZM4.875 5.83725H8.125V4.16275H4.875V5.83725ZM11.375 5.83725H14.625V4.16275H11.375V5.83725ZM17.875 5.83725H21.125V4.16275H17.875V5.83725ZM24.375 5.83725H27.625V4.16275H24.375V5.83725ZM30.875 5.83725H34.125V4.16275H30.875V5.83725ZM37.375 5.83725H40.625V4.16275H37.375V5.83725ZM43.875 5.83725H47.125V4.16275H43.875V5.83725Z'
        fill='#37383C'
      />
    </svg>
  );
};

export default LeftRightDottedArrow;
