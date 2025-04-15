import { SVGProps } from 'react';

const TemplateIcon = (props: SVGProps<SVGSVGElement>) => {
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
        d='M2 2H22V22H2V2ZM4 4V20H11V4H4ZM13 4V11H20V4H13ZM20 13H13V20H20V13Z'
        fill='#37383C'
      />
    </svg>
  );
};

export default TemplateIcon;
