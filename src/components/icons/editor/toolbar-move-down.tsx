import { SVGProps } from 'react';

const ToolbarMoveDown = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='18'
      height='18'
      viewBox='0 0 18 18'
      fill='none'
      aria-label='Move Down'
      {...props}
    >
      <path
        d='M10.5 9L15 6.75L9 3.75L3 6.75L7.5 9'
        stroke='#1A1A1A'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M7.5 9L3 11.25L9 14.25L15 11.25L10.5 9L9 9.75L7.5 9Z'
        fill='#1A1A1A'
        stroke='#1A1A1A'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default ToolbarMoveDown;
