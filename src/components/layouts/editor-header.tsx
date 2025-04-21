import { getUserDataServer } from '@/apis/user-server.api';
import EditorNavBar from './editor-nav-bar';

const EditorHeader = async () => {
  const { user, message } = await getUserDataServer();

  if (message) {
    console.error(message);
  }

  return (
    <header className='fixed top-0 z-50 flex w-full border border-b-gray-10 bg-white'>
      <EditorNavBar user={user} />
    </header>
  );
};

export default EditorHeader;
