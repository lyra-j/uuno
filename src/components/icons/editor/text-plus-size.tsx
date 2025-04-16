import { SVGProps } from 'react';

const TextPlusIcon = (props: SVGProps<SVGSVGElement>) => {
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
        d='M8.66663 2.66602V7.33268H13.3333V8.66602H8.66663V13.3327H7.33329V8.66602H2.66663V7.33268H7.33329V2.66602H8.66663Z'
        fill='#1A1A1A'
      />
    </svg>
  );
};

export default TextPlusIcon;
