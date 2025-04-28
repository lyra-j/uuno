'use client';
import { useSheetStore } from '@/store/sheet.store';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '../ui/sheet';

const SheetProvider = () => {
  const { isOpen, content, title, description, side, close } = useSheetStore();
  return (
    <Sheet open={isOpen} onOpenChange={close}>
      <SheetContent
        side={side}
        className={side === 'bottom' ? 'rounded-t-3xl px-0 pb-10 pt-0' : ''}
      >
        {(title || description) && (
          <SheetHeader>
            {title && <SheetTitle>{title}</SheetTitle>}
            {description && <SheetDescription>{description}</SheetDescription>}
          </SheetHeader>
        )}
        {content}
      </SheetContent>
    </Sheet>
  );
};

export default SheetProvider;
