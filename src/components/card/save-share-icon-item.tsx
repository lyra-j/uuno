import Image from 'next/image';

interface SaveShareIconItemPrams {
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
}: SaveShareIconItemPrams) => {
  return (
    <div className='flex flex-col items-center justify-center gap-1'>
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
