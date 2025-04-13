export const TABLES = {
  USERS: 'users',
  CARD_VIEWS: 'card_views',
  CARDS: 'cards',
  TEMPLATES: 'templates',
} as const;

export const SUB_TABLES = {
  DAILY_CARD_VIEWS: 'daily_card_views',
  DAILY_CARD_SAVES: 'daily_card_saves',
} as const;

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
