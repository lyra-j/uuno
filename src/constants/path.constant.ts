export const ROUTES = {
  HOME: '/',
  EDITOR: '/editor',
  TEMPLATES: {
    BASE: '/template-list',
    SIMPLE: '/template-list/simple',
    TRENDY: '/template-list/trendy',
  },
  MYCARD: '/card',
  DASHBOARD: {
    BASE: '/dashboard',
    MYCARDS: '/dashboard/my-cards',
    ACCOUNT: '/dashboard/account',
  },
} as const;
