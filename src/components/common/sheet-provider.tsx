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
        className={side === 'bottom' ? 'rounded-t-xl pt-6' : ''}
      >
        {side === 'bottom' && (
          <div className='absolute left-0 right-0 top-2 flex justify-center'>
            <div className='h-1.5 w-12 rounded-full bg-muted-foreground/30' />
          </div>
        )}

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
