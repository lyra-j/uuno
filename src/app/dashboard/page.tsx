import { ROUTES } from '@/constants/path.constant';
import { redirect } from 'next/navigation';

const DashboardPage = () => {
  redirect(ROUTES.DASHBOARD.MYCARDS);
};

export default DashboardPage;
