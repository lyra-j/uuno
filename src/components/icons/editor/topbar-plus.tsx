import { SVGProps } from 'react';

const PlusIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='23'
      height='24'
      viewBox='0 0 23 24'
      fill='none'
      {...props}
    >
      <rect y='0.5' width='23' height='23' rx='2.70588' fill='white' />
      <path
        d='M12.1765 6.08838V10.8237H16.9118V12.1766H12.1765V16.9119H10.8236V12.1766H6.08826V10.8237H10.8236V6.08838H12.1765Z'
        fill='#46474C'
      />
    </svg>
  );
};

export default PlusIcon;
