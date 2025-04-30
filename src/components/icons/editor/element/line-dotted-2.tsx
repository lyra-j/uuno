import { SVGProps } from 'react';

const LineDotted2 = (props: SVGProps<SVGSVGElement>) => {
  const { width = 54, ...restProps } = props;
  return (
    <svg
      width={`${width}`}
      height='3'
      viewBox={`0 0 ${width} 3`}
      xmlns='http://www.w3.org/2000/svg'
      {...restProps}
    >
      <path
        d={`M1 1L${width} 1`}
        stroke='#37383C'
        strokeWidth='5'
        strokeDasharray='4,4'
        strokeLinecap='butt'
      />
    </svg>
  );
};

export default LineDotted2;
