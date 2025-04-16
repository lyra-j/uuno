import { SVGProps } from 'react';

const TextItalicIcon = (props: SVGProps<SVGSVGElement>) => {
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
        d='M5 2H12V3.33333H9.55333L7.80333 12.6667H11V14H4V12.6667H6.44667L8.19667 3.33333H5V2Z'
        fill='#1A1A1A'
      />
    </svg>
  );
};

export default TextItalicIcon;
