import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';
import { CSSRuleObject } from 'tailwindcss/types/config';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        // 기본 색상
        black: '#1A1A1A',
        white: '#FFFFFF',
        bg: '#F5F5F7',
        error: '#FF1C1C',

        // 회색 계열
        gray: {
          '5': '#F4F4F5',
          '10': '#E1E2E4',
          '20': '#DBDCDF',
          '30': '#C2C4C8',
          '40': '#AEB0B6',
          '50': '#989BA2',
          '60': '#878A93',
          '70': '#70737C',
          '80': '#5A5C63',
          '90': '#46474C',
          '100': '#37383C',
        },

        // 조회수/막대 차트 색상
        chart1: {
          'increase': '#009DD6', // 명함 상세 - 조회 수/증가
          'same': '#00B69B', // 명함 상세 - 조회 수/동일
          'decrease': '#F93C65', // 명함 상세 - 조회 수/하락
          'tag': '#FFD548', // 명함 상세 - 막대차트/Tag
          'qr': '#FFA69B', // 명함 상세 - 막대차트/QR
          'link': '#657AFF', // 명함 상세 - 막대차트/Link
          'direct': '#00D7C0', // 명함 상세 - 막대차트/Direct
        },

        // 도넛 차트 색상
        chart2: {
          'insta': '#6792CF', // 원형 그래프/인스타
          'github': '#6FD7AE', // 원형 그래프/깃 허브
          'linkedin': '#8690EE', // 원형 그래프/링크드인
          'image': '#FF7800', // 원형 그래프/이미지 저장
          'kakao': '#FFB30A', // 원형 그래프/카카오톡
          'notion': '#64B0F9', // 원형 그래프/노션
          'vcard': '#FF143F', // 원형 그래프/연락처 저장
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },

        // 기본 파란색 계열 (프라이머리)
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          '5': '#E2EAF9',
          '10': '#B7CBF0',
          '20': '#8DADE7',
          '30': '#638EDE',
          '40': '#3970D5',
          '50': '#2658B4',
          '60': '#1D448B',
          '70': '#142F61',
          '80': '#0C1B37',
          '90': '#03060D',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      fontFamily: {
        sans: ["'Pretendard'", 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        moveLeft: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-33.33%)' },
        },
      },
      animation: {
        moveLeft: 'moveLeft 30s linear infinite',
      },
    },
  },

  plugins: [
    tailwindcssAnimate,
    function ({
      addUtilities,
    }: {
      addUtilities: (
        _utilities: CSSRuleObject | CSSRuleObject[],
        _options?: Partial<{
          respectPrefix: boolean;
          respectImportant: boolean;
        }>
      ) => void;
    }) {
      addUtilities({
        '.perspective-1000': {
          perspective: '1000px',
        },
        '.transform-style-preserve-3d': {
          'transform-style': 'preserve-3d',
        },
        '.backface-hidden': {
          'backface-visibility': 'hidden',
        },
        '.rotate-y-180': {
          transform: 'rotateY(180deg)',
        },
      });
    },
  ],
};
export default config;
