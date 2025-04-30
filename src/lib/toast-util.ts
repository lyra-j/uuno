// lib/toast-util.ts
import { toast } from '@/hooks/use-toast';

export const toastSuccess = (title: string, description?: string) =>
  toast({ title, description, variant: 'success' });

export const toastError = (title: string, description?: string) =>
  toast({ title, description, variant: 'destructive' });

export const toastWarning = (title: string, description?: string) =>
  toast({ title, description, variant: 'warning' });
