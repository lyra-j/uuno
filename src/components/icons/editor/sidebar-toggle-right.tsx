import { SVGProps } from 'react';

const SidebarToggleRightBtn = (props: SVGProps<SVGSVGElement>) => {
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
        d='M5.58594 16.4999L10.0859 11.9999L5.58594 7.49994L6.99994 6.08594L12.9139 11.9999L6.99994 17.9139L5.58594 16.4999ZM12.0859 16.4999L16.5859 11.9999L12.0859 7.49994L13.4999 6.08594L19.4139 11.9999L13.4999 17.9139L12.0859 16.4999Z'
        fill='#30395f'
      />
    </svg>
  );
};

export default SidebarToggleRightBtn;
