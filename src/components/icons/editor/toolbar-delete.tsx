import { SVGProps } from 'react';

const ToolbarDeleteIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      {...props}
    >
      <path
        d='M5.75 3H10.25V4.36364H13V5.27273H11.9855L11.7355 13H4.2645L4.0145 5.27273H3V4.36364H5.75V3ZM6.75 4.36364H9.25V3.90909H6.75V4.36364ZM5.015 5.27273L5.2355 12.0909H10.7645L10.985 5.27273H5.015ZM7 6.18182L7.5 11.1818H6.75L6.25 6.18182H7Z'
        fill='#37383C'
      />
      <path d='M9 6.18182H9.75L9.25 11.1818H8.5L9 6.18182Z' fill='#37383C' />
    </svg>
  );
};

export default ToolbarDeleteIcon;
