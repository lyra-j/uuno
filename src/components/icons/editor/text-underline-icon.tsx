import { SVGProps } from 'react';

const TextUnderLineIcon = (props: SVGProps<SVGSVGElement>) => {
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
        d='M12.0003 2V8C12.0003 9.06087 11.5789 10.0783 10.8288 10.8284C10.0786 11.5786 9.06119 12 8.00033 12C6.93946 12 5.92204 11.5786 5.1719 10.8284C4.42175 10.0783 4.00033 9.06087 4.00033 8V2H5.33366V8C5.33366 8.70724 5.61461 9.38552 6.11471 9.88562C6.6148 10.3857 7.29308 10.6667 8.00033 10.6667C8.70757 10.6667 9.38585 10.3857 9.88594 9.88562C10.386 9.38552 10.667 8.70724 10.667 8V2H12.0003ZM2.66699 13.3333H13.3337V14.6667H2.66699V13.3333Z'
        fill='#1A1A1A'
      />
    </svg>
  );
};

export default TextUnderLineIcon;
