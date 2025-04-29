import { useEffect } from 'react';

interface useDeleteKeyPressProps {
  handleDelete: () => void;
}

export const useDeleteKeyPress = ({ handleDelete }: useDeleteKeyPressProps) => {
  useEffect(() => {
    const isMac = navigator.userAgent.match(/Mac/i);

    const handleKeyDown = (e: KeyboardEvent) => {
      const cmd = e.metaKey;

      if (isMac) {
        if (cmd && e.key === 'Backspace') {
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
