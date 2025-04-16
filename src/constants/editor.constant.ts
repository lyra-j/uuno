import UploadIcon from '@/components/icons/editor/sidebar-upload';
import TemplateIcon from '@/components/icons/editor/sidebar-template';
import ImageIcon from '@/components/icons/editor/sidebar-image';
import ElementIcon from '@/components/icons/editor/sidebar-element';
import TextIcon from '@/components/icons/editor/sidebar-text';
import BackgroundIcon from '@/components/icons/editor/sidebar-background';
import QrSocialIcon from '@/components/icons/editor/sidebar-social';

export const CATEGORY = {
  TEMPLATE: '템플릿',
  IMAGE: '이미지',
  UPLOAD: '업로드',
  ELEMENT: '요소',
  TEXT: '텍스트',
  BACKGROUND: '배경',
  SOCIAL: 'QR/소셜',
};

export const ElEMENT_TYPE = {
  TEXT: 'text',
  IMAGE: 'image',
  TEMPLATE: 'template',
  UPLOAD: 'upload',
  ELEMENT: 'element',
  BACKGROUND: 'background',
  SOCIAL: 'social',
  QR: 'qr',
  QRSOCIAL: 'qrsocial',
};

export const CATEGORYLIST = [
  { icon: TemplateIcon, name: CATEGORY.TEMPLATE },
  { icon: ImageIcon, name: CATEGORY.IMAGE },
  { icon: UploadIcon, name: CATEGORY.UPLOAD },
  { icon: ElementIcon, name: CATEGORY.ELEMENT },
  { icon: TextIcon, name: CATEGORY.TEXT },
  { icon: BackgroundIcon, name: CATEGORY.BACKGROUND },
  { icon: QrSocialIcon, name: CATEGORY.SOCIAL },
];

export const SOCIAL_LIST = [
  { name: 'kakao', icon: '/icons/kakaotalk.svg', baseURL: '' },
  {
    name: 'instagram',
    icon: '/icons/instagram.svg',
    baseURL: 'https://www.instagram.com/',
    showURL: 'instagram.com/',
  },
  {
    name: 'youtube',
    icon: '/icons/youtube.svg',
    baseURL: 'https://www.youtube.com/@',
    showURL: 'youtube.com/@',
  },
  {
    name: 'linkedin',
    icon: '/icons/linkedin.svg',
    baseURL: 'https://linkedin.com/in/',
    showURL: 'linkedin.com/in/',
  },
  { name: 'notion', icon: '/icons/notion.svg', baseURL: '', showURL: '' },
  {
    name: 'github',
    icon: '/icons/github.svg',
    baseURL: 'https://github.com/',
    showURL: 'githun.com/',
  },
];

export const MAX_ZOOM = 3;
export const MIN_ZOOM = 0.3;
export const ZOOM_RATION = 0.1;

export const TOOLBAR_WIDTH = 50;
export const TOOLBAR_HEIGHT = 50;
