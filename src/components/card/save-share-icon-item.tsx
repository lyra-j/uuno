import Image from 'next/image';

interface SaveShareIconItemParams {
  alt: string;
  src: string;
  imgHeight: number;
  imgWidth: number;
  text: string;
}

const SaveShareIconItem = ({
  alt,
  src,
  imgHeight,
  imgWidth,
  text,
}: SaveShareIconItemParams) => {
  return (
    <div className='flex min-w-[77px] flex-col items-center justify-center gap-1 md:min-w-min'>
      <Image
        src={src}
        alt={alt}
        height={imgHeight}
        width={imgWidth}
        className='cursor-pointer'
      />
      <span className='text-label2-medium'>{text}</span>
    </div>
  );
};

export default SaveShareIconItem;
