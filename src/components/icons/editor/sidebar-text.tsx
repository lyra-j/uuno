import { SVGProps } from 'react';

const TextIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      {...props}
    >
      <path
        d='M2 2H22V22H2V2ZM4 4V20H20V4H4ZM11 8.5H6V6.5H18V8.5H13V18H11V8.5Z'
        fill='#37383C'
      />
    </svg>
  );
};

export default TextIcon;
