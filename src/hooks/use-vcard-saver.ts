export const useVCardSaver = (onSave?: () => void) => {
  const handleSaveVCard = () => {
    if (onSave) onSave();
  };

  return { handleSaveVCard };
};
