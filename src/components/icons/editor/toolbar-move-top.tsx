import { SVGProps } from 'react';

const ToolbarTop = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='18'
      height='18'
      viewBox='0 0 18 18'
      fill='none'
      aria-label='Move to Top'
      {...props}
    >
      <path
        d='M5.25 7.125L3 8.25L9 11.25L15 8.25L12.75 7.125M3 11.25L9 14.25L15 11.25M9 8.25V3M9 3L6.75 5.25M9 3L11.25 5.25'
        stroke='#1A1A1A'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default ToolbarTop;
