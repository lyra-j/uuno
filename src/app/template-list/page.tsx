import { ROUTES } from '@/constants/path.constant';
import { redirect } from 'next/navigation';

const TemplateList = () => {
  redirect(ROUTES.TEMPLATES.SIMPLE);
};

export default TemplateList;
