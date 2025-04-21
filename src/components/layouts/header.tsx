import { getUserDataServer } from '@/apis/user-server.api';
import NavBar from '@/components/layouts/nav-bar';

const Header = async () => {
  const { user, message } = await getUserDataServer();
  if (message) {
    console.error(message);
  }

  return (
    <header className='fixed top-0 z-50 flex w-full bg-primary-80 text-white'>
      {/* 네비 영역 w-1024px */}
      <NavBar user={user} />
    </header>
  );
};

export default Header;
