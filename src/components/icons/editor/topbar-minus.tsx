import { SVGProps } from 'react';

const MinusIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      {...props}
    >
      <rect width='24' height='24' rx='2.82353' fill='white' />
      <path
        d='M6.35291 11.2939H17.647V12.7057H6.35291V11.2939Z'
        fill='#46474C'
      />
    </svg>
  );
};

export default MinusIcon;
