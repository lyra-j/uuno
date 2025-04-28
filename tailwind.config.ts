import type { Config } from 'tailwindcss';
import typography from './src/config/tailwind.typography';
import tailwindcssAnimate from 'tailwindcss-animate';
import { CSSRuleObject } from 'tailwindcss/types/config';
import uunoColors from './src/config/tailwind.colors';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/sweetalert2/**/*.{js,ts}',
  ],
  safelist: [
    'py-2',
    'px-3',
    'flex-1',
    'rounded-md',
    'bg-blue-600',
    'text-white',
    'text-sm',
    'font-normal',
    'border',
    'border-gray-300',
    'bg-white',
    'text-black',
  ],
  theme: {
    extend: {
      fontSize: {
        // Uuno 타이포그래피
        ...typography,
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',

        // Uuno 컬러칩
        ...uunoColors,

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
          '100%': { transform: 'translateX(-25%)' },
        },
        moveUp: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-25%)' },
        },
      },
      animation: {
        moveLeft: 'moveLeft 20s linear infinite',
        moveUp: 'moveUp 20s linear infinite',
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
