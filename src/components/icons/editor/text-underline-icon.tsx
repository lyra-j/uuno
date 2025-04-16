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
        d='M12 2V8C12 9.06087 11.5785 10.0783 10.8284 10.8284C10.0782 11.5786 9.06083 12 7.99996 12C6.93909 12 5.92168 11.5786 5.17153 10.8284C4.42139 10.0783 3.99996 9.06087 3.99996 8V2H5.33329V8C5.33329 8.70724 5.61424 9.38552 6.11434 9.88562C6.61444 10.3857 7.29272 10.6667 7.99996 10.6667C8.7072 10.6667 9.38548 10.3857 9.88558 9.88562C10.3857 9.38552 10.6666 8.70724 10.6666 8V2H12ZM2.66663 13.3333H13.3333V14.6667H2.66663V13.3333Z'
        fill='#1A1A1A'
      />
    </svg>
  );
};

export default TextUnderLineIcon;
