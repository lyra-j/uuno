import { SVGProps } from 'react';

const SwitchIcon = (props: SVGProps<SVGSVGElement>) => {
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
        d='M16.5001 20.4139L11.5861 15.4999L13.0001 14.0859L15.5001 16.5859V4.49994H17.5001V16.5859L20.0001 14.0859L21.4141 15.4999L16.5001 20.4139ZM6.50006 19.4999V7.41394L4.00006 9.91394L2.58606 8.49994L7.50006 3.58594L12.4141 8.49994L11.0001 9.91394L8.50006 7.41394V19.4999H6.50006Z'
        fill='#1A1A1A'
      />
    </svg>
  );
};

export default SwitchIcon;
