import { SVGProps } from 'react';

interface LeftArrowProps {
  size?: number;
}

const LeftArrow = ({
  size = 32,
  ...props
}: LeftArrowProps & SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox='3.67 4 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <g id='tdesign:chevron-left'>
        <path
          id='Vector'
          d='M21.2187 23.3333L13.8854 15.9999L21.2187 8.66658L19.3334 6.78125L10.1147 15.9999L19.3334 25.2186L21.2187 23.3333Z'
          fill={props.fill || 'currentColor'}
        />
      </g>
    </svg>
  );
};

export default LeftArrow;
