import { SVGProps } from 'react';

const ToolBarBottom = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='18'
      height='18'
      viewBox='0 0 18 18'
      fill='none'
      {...props}
    >
      <path
        d='M4.5 7.5L3 8.25L9 11.25L15 8.25L13.5 7.5M3 11.25L9 14.25L15 11.25M9 3V8.25'
        stroke='#1A1A1A'
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M11.25 6L9 8.25L6.75 6'
        stroke='#1A1A1A'
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  );
};

export default ToolBarBottom;
