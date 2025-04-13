'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/*
  cva를 이용하여 버튼의 기본 스타일과 variant별 스타일을 정의
  - base 클래스에는 flex를 이용해 중앙 정렬, gap, padding, disabled 상태 등을 설정
  - variants에서 variant, size, borderRadius를 사용하여 각각의 스타일을 구분
  - compoundVariants를 이용해 primary 버튼의 size가 large일 경우 borderRadius를 full로 강제하고, 배경 및 텍스트 색상을 오버라이드함
*/
const buttonVariants = cva(
  // 기본 클래스
  'inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors disabled:pointer-events-none disabled:opacity-50 px-3',
  {
    variants: {
      // 버튼 종류별 스타일 설정
      variant: {
        primary: 'bg-primary-40 text-white hover:bg-primary-50',
        secondary: 'bg-primary-5 text-primary-40 hover:bg-primary-10',
        tertiary:
          'border border-gray-10 bg-white text-black hover:border-gray-5 hover:bg-gray-10',
      },
      // 버튼 사이즈: 이 값은 주로 레이아웃 조절(여기서는 별도의 사이즈 조정 없이 동일 패딩 사용)
      size: {
        small: 'py-1.5',
        medium: 'py-1.5',
        large: 'py-3',
        xlarge: 'py-[14px]',
      },
      // border-radius 옵션: "6px"와 "full" 중 선택
      borderRadius: {
        '6px': 'rounded-[6px]',
        full: 'rounded-full',
      },
    },
    compoundVariants: [
      // 각 variat별 xlarge는 rounded-full
      {
        variant: 'primary',
        size: 'xlarge',
        className: 'rounded-full',
      },
      {
        variant: 'secondary',
        size: 'xlarge',
        className: 'rounded-full',
      },
      {
        variant: 'tertiary',
        size: 'xlarge',
        className: 'rounded-full',
      },
    ],
    // 기본값: primary, small 사이즈, border-radius 6px
    defaultVariants: {
      variant: 'primary',
      size: 'small',
      borderRadius: '6px',
    },
  }
);

/*
  CommonButton 컴포넌트의 Props 타입 정의
  - React의 기본 Button 속성을 상속받으며, cva를 사용한 variant 타입도 포함.
  - asChild: Radix Slot을 사용하여 원하는 컴포넌트로 감쌀 수 있음.
  - width: 버튼의 width를 별도로 지정 (예, "150px", "10rem")
  - textClass: 버튼 내부 텍스트에 적용할 Tailwind 클래스 (예: "text-xl", "text-primary-40" 등)
  - 텍스트 스타일은 외부에서 className으로 추가해서 오버라이드 가능.
*/
export interface CommonButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  /** 버튼의 width를 지정하고 싶을 때 사용 (예: "150px", "10rem") */
  width?: string;
  /** 버튼 내부의 텍스트에 적용할 클래스(예: "text-label2-medium", "text-primary-40") */
  textClass?: string;
}

// CommonButton 컴포넌트 정의 (화살표 함수와 React.forwardRef 사용)
const CommonButton = React.forwardRef<HTMLButtonElement, CommonButtonProps>(
  (
    {
      children,
      className,
      variant,
      size,
      borderRadius,
      asChild = false,
      width,
      textClass,
      style,
      ...props
    },
    ref
  ) => {
    // asChild가 true이면 외부에서 전달한 컴포넌트를 Slot으로 사용
    const Comp = asChild ? Slot : 'button';
    // width 값이 전달되면 inline style에 병합하여 적용
    const combinedStyle = { ...style, ...(width ? { width: width } : {}) };

    return (
      <Comp
        ref={ref}
        style={combinedStyle}
        className={cn(
          buttonVariants({ variant, size, borderRadius }),
          className
        )}
        {...props}
      >
        {/* 버튼 내부 텍스트는 별도의 <span>에 적용하여,
            텍스트 관련 클래스 충돌을 방지하고, 외부에서 textClass으로 따로 지정할 수 있게 함. */}
        <span className={cn('inline-flex items-center gap-1', textClass)}>
          {children}
        </span>
      </Comp>
    );
  }
);
CommonButton.displayName = 'CommonButton';

export { CommonButton, buttonVariants };
