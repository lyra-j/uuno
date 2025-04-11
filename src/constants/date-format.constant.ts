export const DATE_FORMAT = {
  DOT: 'dot',
  DASH: 'dash',
} as const;

export type DateFormatType = (typeof DATE_FORMAT)[keyof typeof DATE_FORMAT];
