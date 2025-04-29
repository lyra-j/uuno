import { toast } from '@/hooks/use-toast';

export const toastSuccess = (title: string, description?: string) =>
  toast({ title, description });

export const toastError = (title: string, description?: string) =>
  toast({ title, description, variant: 'destructive' });
