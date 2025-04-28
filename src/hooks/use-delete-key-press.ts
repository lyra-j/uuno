import { useEffect } from 'react';

interface useDeleteKeyPressProps {
  handleDelete: () => void;
}

export const useDeleteKeyPress = ({ handleDelete }: useDeleteKeyPressProps) => {
  useEffect(() => {
    const isMac = navigator.userAgent.match(/Mac/i);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isMac) {
        if (e.key === 'Backspace') {
          handleDelete();
        }
      } else {
        if (e.key === 'Delete') {
          handleDelete();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleDelete]);
};
