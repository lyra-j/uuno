'use client';

import React, { useState } from 'react';
import clsx from 'clsx';

interface Props {
  // 부모 컴포넌트에서 섹션 스크롤 함수 전달
  onScrollTo: (label: 'simple' | 'trendy') => void;
}

// 버튼 라벨과 스크롤 섹션 키 매핑
const tagOptions = [
  { label: '심플한', scrollKey: 'simple' },
  { label: '트렌디한', scrollKey: 'trendy' },
] as const;

const StyleSelectButton = ({ onScrollTo }: Props) => {
  // 현재 선택된 버튼 상태
  const [selected, setSelected] = useState<'심플한' | '트렌디한'>('심플한');

  /**
   * 버튼 클릭시 실행
   * 1. 선택된 상태 업데이트
   * 2. 해당 섹션으로 스크롤
   * @param label - 버튼 라벨
   * @param scrollKey - 스크롤 이동 키
   */
  const handleClick = (
    label: '심플한' | '트렌디한',
    scrollKey: 'simple' | 'trendy'
  ) => {
    setSelected(label);
    onScrollTo(scrollKey);
  };

  return (
    <div className='flex gap-2.5'>
      {tagOptions.map(({ label, scrollKey }) => (
        <button
          key={label}
          onClick={() => handleClick(label, scrollKey)}
          className={clsx(
            // 공통 스타일
            'text-label2-b h-9 w-[108px] rounded-md px-3 py-1.5 text-[#1a1a1a] transition-colors',
            // 선택된 버튼 스타일
            selected === label
              ? 'border-transparent bg-primary-5 text-primary-40'
              // 선택x 기본상태 & hover
              : 'text-label2-m border border-[#e1e1e4] bg-white hover:bg-primary-5 hover:font-bold hover:text-primary-40'
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default StyleSelectButton;
