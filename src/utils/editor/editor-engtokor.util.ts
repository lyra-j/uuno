import { CATEGORY, ElEMENT_TYPE } from '@/constants/editor.constant';

/**
 *
 * @param type
 * @returns
 */

// 추후 type 추가하실 때 여기도 추가해 주세요
export const convertEngToKor = (type: string | null) => {
  switch (type) {
    case ElEMENT_TYPE.TEXT:
      return CATEGORY.TEXT;
    case ElEMENT_TYPE.IMAGE:
      return CATEGORY.IMAGE;
    case ElEMENT_TYPE.UPLOAD:
      return CATEGORY.UPLOAD;
    case ElEMENT_TYPE.BACKGROUND:
      return CATEGORY.BACKGROUND;
    case ElEMENT_TYPE.SOCIAL:
      return CATEGORY.SOCIAL;
    case ElEMENT_TYPE.TEMPLATE:
      return CATEGORY.TEMPLATE;
    case ElEMENT_TYPE.TEMPLATE:
      return CATEGORY.TEMPLATE;
    default:
      return null;
  }
};
