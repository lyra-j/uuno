import Link from 'next/link';

const Header = () => {
  return (
    <header
      className='fixed top-0 z-50 h-16 w-full'
      style={{ backgroundColor: '#0C1B37' }}
    >
      <div className='flex h-full items-center justify-between px-[100px]'>
        <div className='text-xl font-bold text-white'>Uuno</div>

        <nav className='flex items-center space-x-8'>
          <Link href='' className='text-white'>
            템플릿
          </Link>
          <Link href='' className='text-blue-500'>
            만들기
          </Link>
          <Link href='' className='text-white'>
            내 명함
          </Link>

          <div className='space-x-3 text-[14px]'>
            <button className='rounded-md bg-blue-600 px-3 py-[6px] text-white'>
              내 명함 만들기
            </button>
            <button className='rounded-md bg-white px-3 py-[6px]'>
              로그인
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
