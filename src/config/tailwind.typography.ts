/**
 * 타이포그래피 설정
 * key: Tailwind에서 사용될 클래스 이름 (예: text-title-bold)
 * value: [fontSize: string, { lineHeight: string; fontWeight: number }] 튜플 형식
 */
const typography: Record<
  string,
  [string, { lineHeight: string; fontWeight: number }]
> = {
  // ----------------- Landing -----------------
  'landing-bold-l': ['40px', { lineHeight: '120%', fontWeight: 700 }],
  'landing-bold-m': ['32px', { lineHeight: '125%', fontWeight: 700 }],
  'landing-medium': ['28px', { lineHeight: '150%', fontWeight: 500 }],

  // ----------------- Title -----------------
  'title1-b': ['28px', { lineHeight: '150%', fontWeight: 700 }],
  'title-bold': ['24px', { lineHeight: '150%', fontWeight: 700 }],
  'title-medium': ['24px', { lineHeight: '150%', fontWeight: 500 }],
  'title-regular': ['24px', { lineHeight: '150%', fontWeight: 400 }],

  // ----------------- Heading -----------------
  'heading-bold': ['20px', { lineHeight: '150%', fontWeight: 700 }],
  'heading-medium': ['20px', { lineHeight: '150%', fontWeight: 500 }],
  'heading-semi': ['20px', { lineHeight: '150%', fontWeight: 600 }],
  'heading-regular': ['20px', { lineHeight: '150%', fontWeight: 400 }],

  // ----------------- Body -----------------
  'body-bold': ['18px', { lineHeight: '150%', fontWeight: 700 }],
  'body-medium': ['18px', { lineHeight: '150%', fontWeight: 500 }],
  'body-semi': ['18px', { lineHeight: '150%', fontWeight: 600 }],
  'body-regular': ['18px', { lineHeight: '150%', fontWeight: 400 }],

  // ----------------- Label1 -----------------
  'label1-bold': ['16px', { lineHeight: '150%', fontWeight: 700 }],
  'label1-medium': ['16px', { lineHeight: '150%', fontWeight: 500 }],
  'label1-semi': ['16px', { lineHeight: '150%', fontWeight: 600 }],
  'label1-regular': ['16px', { lineHeight: '150%', fontWeight: 400 }],

  // ----------------- Label2 -----------------
  'label2-bold': ['14px', { lineHeight: '150%', fontWeight: 700 }],
  'label2-medium': ['14px', { lineHeight: '150%', fontWeight: 500 }],
  'label2-semi': ['14px', { lineHeight: '150%', fontWeight: 600 }],
  'label2-regular': ['14px', { lineHeight: '150%', fontWeight: 400 }],

  // ----------------- Extra -----------------
  'extra-medium': ['13px', { lineHeight: '150%', fontWeight: 500 }],

  // ----------------- Caption -----------------
  'caption-bold': ['12px', { lineHeight: '150%', fontWeight: 700 }],
  'caption-medium': ['12px', { lineHeight: '150%', fontWeight: 500 }],
  'caption-semi': ['12px', { lineHeight: '150%', fontWeight: 600 }],
  'caption-regular': ['12px', { lineHeight: '150%', fontWeight: 400 }],
};

export default typography;
