'use client';

import { ROUTES } from '@/constants/path.constant';
import Link from 'next/link';
import React from 'react';
import { Icon } from '@iconify/react';
import sweetAlertUtil from '@/utils/common/sweet-alert-util';

interface CreateNewCardProps {
  cardCount: number;
}

const CreateNewCard = ({ cardCount }: CreateNewCardProps) => {
  const isDisabled = cardCount >= 3;

  /**
   * 버튼 클릭 핸들러
   * isDisabled가 true인 경우 링크 이동을 막고
   * SweetAlert로 제한 메시지 표시
   */
  const handleClick = (e: React.MouseEvent) => {
    if (isDisabled) {
      e.preventDefault();
      sweetAlertUtil.error(
        '명함 생성 제한',
        '최대 3개의 명함만 생성할 수 있습니다.'
      );
    }
  };

  return (
    <Link
      href={ROUTES.EDITOR}
      onClick={handleClick}
      className={`flex aspect-[9/5] w-full cursor-pointer items-center justify-center rounded-xl border border-dashed border-gray-40 transition-colors ${cardCount >= 1 ? 'max-md:hidden' : ''} ${
        isDisabled
          ? 'cursor-not-allowed opacity-50' // 활성화 스타일
          : 'hover:bg-gray-10' // 활성화 hover
      }`}
    >
      <div className='flex flex-col items-center justify-center text-extra-medium text-gray-40'>
        <Icon icon='mdi:add' width='26' height='26' />
        새로운 명함 만들기
      </div>
    </Link>
  );
};

export default CreateNewCard;
