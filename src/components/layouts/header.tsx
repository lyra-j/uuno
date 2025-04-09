import { getUserDataServer } from '@/services/user.server.dto';
import Link from 'next/link';
import HeaderAuthButton from './header-auth-button';

const Header = async () => {
  const { user, message } = await getUserDataServer();
  if (message) {
    console.error(message);
  }

  const userNickName =
    user?.user_metadata.nick_name || user?.user_metadata.full_name;

  return (
    <header
      className='fixed top-0 z-50 h-16 w-full'
      style={{ backgroundColor: '#0C1B37' }}
    >
      <div className='flex h-full items-center justify-between px-[100px]'>
        <div className='text-xl font-bold text-white'>Uuno</div>
        <div className='text-xl font-bold text-white'>{userNickName}</div>

        <nav className='flex items-center space-x-8'>
          <Link href='' className='text-white'>
            템플릿
          </Link>
          <Link href='/editor' className='text-blue-500'>
            만들기
          </Link>
          <Link href='' className='text-white'>
            내 명함
          </Link>

          <div className='space-x-3 text-[14px]'>
            <button className='rounded-md bg-blue-600 px-3 py-[6px] text-white'>
              내 명함 만들기
            </button>
            {user ? (
              <HeaderAuthButton type='logout' />
            ) : (
              <HeaderAuthButton type='login' />
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
