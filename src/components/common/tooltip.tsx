import { ReactNode } from 'react';

interface ToolTipProps {
  children: ReactNode;
  text: string;
}

const ToolTip = ({ children, text }: ToolTipProps) => {
  return (
    <div className='group relative w-fit'>
      {children}
      <div className='absolute left-1/2 top-full mt-2 w-max -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-3 py-2 text-sm text-white opacity-0 transition group-hover:opacity-100'>
        {text}
        <div className='absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-gray-800'></div>
      </div>
    </div>
  );
};

export default ToolTip;
