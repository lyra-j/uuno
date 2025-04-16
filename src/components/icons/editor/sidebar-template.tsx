import { SVGProps } from 'react';

interface TemplateIconProps extends SVGProps<SVGSVGElement> {
  active?: boolean;
}

const TemplateIcon = ({ active = false, ...props }: TemplateIconProps) => {
  const fill = active ? '#3970D5' : '#37383C';
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
        fill={fill}
      />
    </svg>
  );
};

export default TemplateIcon;
