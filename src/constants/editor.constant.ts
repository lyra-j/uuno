import UploadIcon from '@/components/icons/editor/sidebar-upload';
import TemplateIcon from '@/components/icons/editor/sidebar-template';
import ImageIcon from '@/components/icons/editor/sidebar-image';
import ElementIcon from '@/components/icons/editor/sidebar-element';
import TextIcon from '@/components/icons/editor/sidebar-text';
import BackgroundIcon from '@/components/icons/editor/sidebar-background';
import QrSocialIcon from '@/components/icons/editor/sidebar-social';
import React from 'react';

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
  LINE: 'line',
  RECTANGLE: 'rectangle',
  CIRCLE: 'circle',
  REGULAR_POLYGON: 'regularPolygon',
  STAR: 'star',
};

export const DECORATION_TYPE = {
  ARROW: 'arrow',
  CIRCLE: 'circle',
  RECTANGLE: 'rectangle',
};

export const CATEGORYLIST = [
  {
    icon: TemplateIcon,
    name: CATEGORY.TEMPLATE,
    activeIcon: () => React.createElement(TemplateIcon, { active: true }),
  },
  {
    icon: ImageIcon,
    name: CATEGORY.IMAGE,
    activeIcon: () => React.createElement(ImageIcon, { active: true }),
  },
  {
    icon: UploadIcon,
    name: CATEGORY.UPLOAD,
    activeIcon: () => React.createElement(UploadIcon, { active: true }),
  },
  {
    icon: ElementIcon,
    name: CATEGORY.ELEMENT,
    activeIcon: () => React.createElement(ElementIcon, { active: true }),
  },
  {
    icon: TextIcon,
    name: CATEGORY.TEXT,
    activeIcon: () => React.createElement(TextIcon, { active: true }),
  },
  {
    icon: BackgroundIcon,
    name: CATEGORY.BACKGROUND,
    activeIcon: () => React.createElement(BackgroundIcon, { active: true }),
  },
  {
    icon: QrSocialIcon,
    name: CATEGORY.SOCIAL,
    activeIcon: () => React.createElement(QrSocialIcon, { active: true }),
  },
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

export const TOOLBAR_WIDTH = 56;

export const BASE_STAGE_WIDTH = 468;
export const BASE_STAGE_HEIGHT = 244;

export const VERTICAL_ALIGN_TYPES: Array<'top' | 'middle' | 'bottom'> = [
  'top',
  'middle',
  'bottom',
];

export const ALIGN_TYPES: Array<'left' | 'center' | 'right' | 'justify'> = [
  'left',
  'center',
  'right',
  'justify',
];

//에디터 기본 색 검정
export const DEFAULT_COLOR = '#000000';

//에디터 기본 폰트
export const DEFAULT_FONT = 'Pretendard';

//에디터 최대 저장 갯수
export const MAX_CARDS_PER_USER = 3;

// unsplash 페이지 수
export const PER_PAGE = 30;

// 이미지 최대크기
export const MAX_IMAGE_SIZE = 100;

//
export const MAX_UNSPALSH_API_PAGES = 7;
