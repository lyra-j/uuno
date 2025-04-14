import { SVGProps } from 'react';

const ToolbarDuplicate = (props: SVGProps<SVGSVGElement>) => {
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
        d='M6.63636 7.09091V9.36364M6.63636 9.36364V11.6364M6.63636 9.36364H4.36364M6.63636 9.36364H8.90909M5.72727 4.36364V3H13V10.2727H11.6364M3 13V5.72727H10.2727V13H3Z'
        stroke='#37383C'
      />
    </svg>
  );
};

export default ToolbarDuplicate;
