import { SVGProps } from 'react';

interface QrSocialIconProps extends SVGProps<SVGSVGElement> {
  active?: boolean;
}

const QrSocialIcon = ({ active = false, ...props }: QrSocialIconProps) => {
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
        d='M3 11H11V3H3V11ZM5 5H9V9H5V5ZM3 21H11V13H3V21ZM5 15H9V19H5V15ZM13 3V11H21V3H13ZM19 9H15V5H19V9ZM19 19H21V21H19V19ZM13 13H15V15H13V13ZM15 15H17V17H15V15ZM13 17H15V19H13V17ZM15 19H17V21H15V19ZM17 17H19V19H17V17ZM17 13H19V15H17V13ZM19 15H21V17H19V15Z'
        fill={fill}
      />
    </svg>
  );
};

export default QrSocialIcon;
