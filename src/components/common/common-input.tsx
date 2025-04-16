'use client';

import React, { useState, useEffect } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

// 인풋 스타일 정의
const inputStyles = cva(
  'w-full h-10 px-3 rounded-md border focus:outline-none transition-colors duration-200',
  {
    variants: {
      variant: {
        default: 'border-gray-300',
        focus: 'border-blue-500 shadow-[0_0_0_2px_rgba(59,130,246,0.3)]',
        error: 'border-red-500',
        used: 'border-red-500',
        available: 'border-green-500',
        filled: 'border-gray-300',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// Label 스타일 정의
const labelStyles = cva('mb-1 text-label2-bold', {
  variants: {
    variant: {
      default: 'text-gray-700',
      error: 'text-red-500',
      focus: 'text-blue-500',
      available: 'text-green-500',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

// Input 컴포넌트 Props
interface CommonInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputStyles> {
  width?: string | number;
  errorMessage?: string;
  successMessage?: string;
  label?: string; // Label을 선택적으로 표시
  labelVariant?: 'default' | 'error' | 'focus' | 'available';
  wrapperClassName?: string;
  inputClassName?: string;
}

export const CommonInput: React.FC<CommonInputProps> = ({
  width,
  variant,
  errorMessage,
  successMessage,
  label,
  labelVariant = 'default',
  wrapperClassName,
  inputClassName,
  ...rest
}) => {
  const [currentVariant, setCurrentVariant] = useState(variant || 'default');

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setCurrentVariant('focus');
    if (rest.onFocus) {
      rest.onFocus(e);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (
      rest.value &&
      typeof rest.value === 'string' &&
      rest.value.trim() !== ''
    ) {
      setCurrentVariant('filled');
    } else {
      setCurrentVariant('default');
    }
    if (rest.onBlur) {
      rest.onBlur(e);
    }
  };

  useEffect(() => {
    if (variant) setCurrentVariant(variant);
  }, [variant]);

  // width prop이 지정되었을 경우 인라인 스타일로 적용, 그렇지 않으면 기본 Tailwind 클래스(w-full)를 사용
  const wrapperStyle: React.CSSProperties | undefined = width
    ? typeof width === 'number'
      ? { width: `${width}px` }
      : { width }
    : undefined;

  return (
    <div
      style={wrapperStyle}
      className={`flex flex-col ${!width ? 'w-full' : ''} ${wrapperClassName || ''}`}
    >
      {label && (
        <label className={labelStyles({ variant: labelVariant })}>
          {label}
        </label>
      )}
      <input
        type='text'
        className={`${inputStyles({ variant: currentVariant })} ${inputClassName || ''} mt-1`}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...rest}
      />
      {(currentVariant === 'error' || currentVariant === 'used') &&
        errorMessage && (
          <span
            className={`mt-2 text-sm ${currentVariant === 'error' || currentVariant === 'used' ? 'text-red-500' : ''}`}
          >
            {errorMessage}
          </span>
        )}
      {currentVariant === 'available' && successMessage && (
        <span
          className={`mt-2 text-sm ${currentVariant === 'available' ? 'text-green-500' : ''}`}
        >
          {successMessage}
        </span>
      )}
    </div>
  );
};
