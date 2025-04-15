import { SVGProps } from 'react';

const SidebarToggleLeftBtn = (props: SVGProps<SVGSVGElement>) => {
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
        d='M18.4139 7.49994L13.9139 11.9999L18.4139 16.4999L16.9999 17.9139L11.0859 11.9999L16.9999 6.08594L18.4139 7.49994ZM11.9139 7.49994L7.41394 11.9999L11.9139 16.4999L10.4999 17.9139L4.58594 11.9999L10.4999 6.08594L11.9139 7.49994Z'
        fill='#37383C'
      />
    </svg>
  );
};

export default SidebarToggleLeftBtn;
