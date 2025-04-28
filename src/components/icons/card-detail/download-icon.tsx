interface DownloadIcon {
  props?: React.SVGProps<SVGSVGElement>;
  isActive?: boolean;
}

const DownloadIcon = ({ props, isActive = false }: DownloadIcon) => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <g id='tdesign:download'>
      <path
        id='Vector'
        d='M12.8335 5V12.9883L15.7502 10.0717L16.9285 11.25L12.0002 16.1783L7.07183 11.25L8.25016 10.0717L11.1668 12.9883V5H12.8335ZM5.75016 14.1667V18.3333H18.2502V14.1667H19.9168V20H4.0835V14.1667H5.75016Z'
        fill={isActive ? '#1A1A1A' : '#AEB0B6'}
      />
    </g>
  </svg>
);

export default DownloadIcon;
