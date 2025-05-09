import { getUserDataServer } from '@/apis/user-server.api';
import AccountSocialLogin from '@/components/dashboard/account/account-social-login';
import AccountUserNameInput from '@/components/dashboard/account/account-user-name-input';

const AccountPage = async () => {
  const { user } = await getUserDataServer();
  if (!user) return;

  const socialLogin = user.app_metadata.provider;

  const fullName = user.user_metadata.full_name || user.user_metadata.nick_name;

  return (
    <article className='rounded-xl bg-white px-12 py-8'>
      {/* 기본 정보 섹션 */}
      <section className='flex h-[calc(100vh-16rem)] w-full flex-col items-center'>
        {/* 기본 정보 */}
        <div className='flex w-full flex-col'>
          <p className='text-label1-semi text-black'>기본 정보</p>

          <div className='mt-2 w-full border border-b-gray-5' />

          <AccountUserNameInput userName={fullName} />

          <div className='mt-7 flex w-full flex-col gap-2'>
            <p className='text-label2-bold text-black'>아이디</p>
            <div className='flex h-11 w-full items-center gap-[10px] rounded border border-gray-10 px-5 py-[10px]'>
              {user.email}
            </div>
          </div>
        </div>

        <AccountSocialLogin socialLogin={socialLogin} />
      </section>
    </article>
  );
};

export default AccountPage;
