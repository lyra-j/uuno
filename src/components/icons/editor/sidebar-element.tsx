import { SVGProps } from 'react';

interface ElementIconProps extends SVGProps<SVGSVGElement> {
  active?: boolean;
}

const ElementIcon = ({ active = false, ...props }: ElementIconProps) => {
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
        d='M17.5 3.5C16.7044 3.5 15.9413 3.81607 15.3787 4.37868C14.8161 4.94129 14.5 5.70435 14.5 6.5C14.5 7.29565 14.8161 8.05871 15.3787 8.62132C15.9413 9.18393 16.7044 9.5 17.5 9.5C18.2956 9.5 19.0587 9.18393 19.6213 8.62132C20.1839 8.05871 20.5 7.29565 20.5 6.5C20.5 5.70435 20.1839 4.94129 19.6213 4.37868C19.0587 3.81607 18.2956 3.5 17.5 3.5ZM12.5 6.5C12.5 5.17392 13.0268 3.90215 13.9645 2.96447C14.9021 2.02678 16.1739 1.5 17.5 1.5C18.8261 1.5 20.0979 2.02678 21.0355 2.96447C21.9732 3.90215 22.5 5.17392 22.5 6.5C22.5 7.82608 21.9732 9.09785 21.0355 10.0355C20.0979 10.9732 18.8261 11.5 17.5 11.5C16.1739 11.5 14.9021 10.9732 13.9645 10.0355C13.0268 9.09785 12.5 7.82608 12.5 6.5ZM2 2H11V11H2V2ZM4 4V9H9V4H4ZM2 13H11V22H2V13ZM4 15V20H9V15H4ZM13 13H22V22H13V13ZM20 15H15V20H20V15Z'
        fill={fill}
      />
    </svg>
  );
};

export default ElementIcon;
