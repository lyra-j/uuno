'use client';

import { useToast } from '@/hooks/use-toast';
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast';
import { Icon } from '@iconify/react/dist/iconify.js';

const iconMap = {
  success: <Icon icon='tdesign:check-circle-filled' width='18' height='18' />,
  warning: <Icon icon='tdesign:error-triangle-filled' width='18' height='18' />,
  destructive: (
    <Icon icon='tdesign:close-circle-filled' width='18' height='18' />
  ),
  default: <Icon icon='tdesign:check-circle-filled' width='18' height='18' />,
};

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider duration={3000}>
      {toasts.map(function ({
        id,
        title,
        variant,
        description,
        action,
        ...props
      }) {
        const icon = iconMap[variant || 'default'];
        return (
          <Toast key={id} variant={variant} {...props}>
            <div className='flex items-center justify-center gap-[10px]'>
              {icon}
              <div className='flex flex-col'>
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
