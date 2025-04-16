import { CATEGORY } from '@/constants/editor.constant';

/**
 *
 * @param type
 * @returns
 */

// 추후 type 추가하실 때 여기도 추가해 주세요
export const convertEngToKor = (type: string | null) => {
  switch (type) {
    case 'text':
      return CATEGORY.TEXT;
    case 'image':
      return CATEGORY.IMAGE;
    case 'upload':
      return CATEGORY.UPLOAD;
    case 'background':
      return CATEGORY.BACKGROUND;
    case 'qrsocial':
      return CATEGORY.SOCIAL;
    default:
      return null;
  }
};
