import { toastWarning } from '@/lib/toast-util';
import sweetAlertUtil from './sweet-alert-util';

export const sweetComingSoonAlert = () => {
  sweetAlertUtil.info('곧 만나요!', '해당 기능은 곧 업데이트될 예정입니다');
};

export const toastComingSoonAlert = () => {
  toastWarning('곧 만나요!', '해당 기능은 곧 업데이트될 예정입니다');
};
