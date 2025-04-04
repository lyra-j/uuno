import Link from 'next/link';
import HeaderNav from './HeaderNav';

const Header = () => {
  return (
    <header className='fixed top-0 z-50 h-16 w-full bg-gray-700'>
      <div className='mx-auto flex h-full max-w-7xl items-center justify-between px-12'>
        {/* 로고 / 사이트명 */}
        <div className='text-xl font-bold text-white'>Uuno</div>

        {/* 우측 메뉴 */}
        <nav className='flex items-center space-x-4'>
          <Link href='' className='text-white transition'>
            템플릿
          </Link>
          <Link href='' className='text-white transition'>
            만들기
          </Link>
          <Link href='' className='text-white transition'>
            내 명함
          </Link>

          {/* 파란색 버튼 */}
          <button className='rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-500'>
            내 명함 만들기
          </button>

          {/* 흰색 버튼 */}
          <button className='rounded-md bg-white px-4 py-2 text-blue-600 transition hover:bg-blue-100'>
            로그인
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
