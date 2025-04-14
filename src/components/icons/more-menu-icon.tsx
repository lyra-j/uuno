const MoreMenuIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='44'
    height='44'
    viewBox='0 0 44 44'
    fill='none'
    {...props}
  >
    <g filter='url(#filter0_d_855_4889)'>
      <rect
        x='34'
        y='30'
        width='24'
        height='24'
        rx='12'
        transform='rotate(180 34 30)'
        fill='white'
      />
      <rect
        x='33.5'
        y='29.5'
        width='23'
        height='23'
        rx='11.5'
        transform='rotate(180 33.5 29.5)'
        stroke='#F4F4F5'
      />
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M16.8571 18.0001C16.8571 18.9468 16.0896 19.7143 15.1429 19.7143C14.1962 19.7143 13.4286 18.9468 13.4286 18.0001C13.4286 17.0533 14.1962 16.2858 15.1429 16.2858C16.0896 16.2858 16.8571 17.0533 16.8571 18.0001ZM23.7143 18.0001C23.7143 18.9468 22.9467 19.7143 22 19.7143C21.0533 19.7143 20.2857 18.9468 20.2857 18.0001C20.2857 17.0533 21.0533 16.2858 22 16.2858C22.9467 16.2858 23.7143 17.0533 23.7143 18.0001ZM28.8571 19.7143C29.8039 19.7143 30.5714 18.9468 30.5714 18.0001C30.5714 17.0533 29.8039 16.2858 28.8571 16.2858C27.9104 16.2858 27.1429 17.0533 27.1429 18.0001C27.1429 18.9468 27.9104 19.7143 28.8571 19.7143Z'
        fill='#1A1A1A'
      />
    </g>
    <defs>
      <filter
        id='filter0_d_855_4889'
        x='-30'
        y='-34'
        width='104'
        height='104'
        filterUnits='userSpaceOnUse'
        color-interpolation-filters='sRGB'
      >
        <feFlood flood-opacity='0' result='BackgroundImageFix' />
        <feColorMatrix
          in='SourceAlpha'
          type='matrix'
          values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
          result='hardAlpha'
        />
        <feOffset dy='4' />
        <feGaussianBlur stdDeviation='5' />
        <feComposite in2='hardAlpha' operator='out' />
        <feColorMatrix
          type='matrix'
          values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0'
        />
        <feBlend
          mode='normal'
          in2='BackgroundImageFix'
          result='effect1_dropShadow_855_4889'
        />
        <feBlend
          mode='normal'
          in='SourceGraphic'
          in2='effect1_dropShadow_855_4889'
          result='shape'
        />
      </filter>
    </defs>
  </svg>
);

export default MoreMenuIcon;
