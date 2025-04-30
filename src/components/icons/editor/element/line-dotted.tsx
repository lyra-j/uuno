import { SVGProps } from 'react';

const LineDotted = (props: SVGProps<SVGSVGElement>) => {
  const { width = 54, ...restProps } = props;
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={`${width}`}
      height='2'
      viewBox={`0 0 ${width} 2`}
      fill='none'
      {...restProps}
    >
      <path
        d={`M1 1L${width} 1`}
        stroke='#37383C'
        strokeWidth='6'
        strokeDasharray='10,10'
        strokeLinecap='butt'
      />
    </svg>
  );
};

export default LineDotted;
