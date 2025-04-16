export const TABLES = {
  USERS: 'users',
  CARD_VIEWS: 'card_views',
  CARDS: 'cards',
  TEMPLATES: 'templates',
  LINKS: 'links',
} as const;

export const SUB_TABLES = {
  DAILY_CARD_VIEWS: 'daily_card_views',
  DAILY_CARD_SAVES: 'daily_card_saves',
} as const;

export const STORAGE = {
  CARDS: 'cards',
  QRCODES: 'qrcodes',
  BGIMG: 'bgimg',
  TEMPLATES: 'templates',
  ICONS: 'icons',
};

export const DB_COLUMNS = {
  CARD_VIEWS: {
    ID: 'id',
    CARD_ID: 'card_id',
    VIEWER_IP: 'viewer_ip',
    SOURCE: 'source',
    ELEMENT_NAME: 'element_name',
    OCCURRED_AT: 'occurred_at',
    VIEWER_ID: 'viewer_id',
    STARTED_AT: 'started_at',
    END_AT: 'end_at',
    TYPE: 'type',
    SESSION_ID: 'session_id',
    DURATION: 'duration',
  },
  CARDS: {
    ID: 'id',
    CREATED_AT: 'created_at',
    USER_ID: 'user_id',
    TITLE: 'title',
    TEMPLATE_ID: 'template_id',
    STATUS: 'status',
    FRONT_CONTENT: 'front_content',
    BACK_CONTENT: 'back_content',
    SLUG: 'slug',
    UPDATED_AT: 'updated_at',
    FRONT_IMG_URL: 'frontImgURL',
    BACK_IMG_URL: 'backImgURL',
    CONTENT: 'content',
    IS_HORIZONTAL: 'isHorizontal',
  },
  LINKS: {
    ID: 'id',
    CARD_ID: 'card_id',
    PLATFORM: 'platform',
    URL: 'url',
    ICON_PATH: 'icon_path',
  },
  USERS: {
    ID: 'id',
    CREATED_AT: 'created_at',
    NICK_NAME: 'nick_name',
    EMAIL: 'email',
  },
  DAILY_CARD_VIEWS: {
    VIEW_DATE: 'view_date',
    CARD_ID: 'card_id',
    UNIQUE_SESSIONS: 'unique_sessions',
  },
  DAILY_CARD_SAVES: {
    SAVE_DATE: 'save_date',
    CARD_ID: 'card_id',
    UNIQUE_SAVES: 'unique_saves',
  },
} as const;

export const CARD_VIEW_TYPES = {
  SAVE: 'save',
  CLICK: 'click',
} as const;
