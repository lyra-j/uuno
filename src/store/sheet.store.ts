import { create } from 'zustand';

type SheetContent = React.ReactNode;
type SheetSide = 'top' | 'right' | 'bottom' | 'left';

interface SheetState {
  isOpen: boolean;
  content: SheetContent | null;
  title?: string;
  description?: string;
  side?: SheetSide;
  showCloseButton?: boolean;
  onClose?: () => void;

  open: (params: {
    content: SheetContent;
    title?: string;
    description?: string;
    side?: SheetSide;
    showCloseButton?: boolean;
    onClose?: () => void;
  }) => void;
  close: () => void;
}

export const useSheetStore = create<SheetState>((set, get) => ({
  isOpen: false,
  content: null,
  title: undefined,
  description: undefined,
  side: 'bottom',
  showCloseButton: false,
  onClose: undefined,

  open: ({ content, title, description, side, onClose, showCloseButton }) => {
    set({
      isOpen: true,
      content,
      title,
      description,
      side,
      showCloseButton,
      onClose,
    });
  },

  close: () => {
    const { onClose } = get();
    if (onClose) {
      onClose();
    }
    set({
      isOpen: false,
      content: null,
      title: undefined,
      description: undefined,
      onClose: undefined,
    });
  },
}));
