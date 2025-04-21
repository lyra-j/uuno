'use client';

import { ROUTES } from '@/constants/path.constant';
import { getCardCount } from '@/apis/card-interaction';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import sweetAlertUtil from '@/utils/common/sweet-alert-util';

const CreateNewCard = () => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  /**
   * 컴포넌트 마운트 시 한 번 실행:
   * Supabase로부터 현재 로그인한 사용자를 조회하고,
   * getCardCount 호출하여 사용자가 생성한 명함 개수를 가져옴
   * 개수가 3개 이상이면 버튼을 비활성화 상태로 설정
   */
  useEffect(() => {
    const checkCardCount = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        try {
          const count = await getCardCount(user.id);
          setIsDisabled(count >= 3);
        } catch (error: any) {
          console.error('명함 개수 조회 중 오류 발생 : ', error);
        }
      }
    };

    checkCardCount();
  }, []);

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
      className={`flex aspect-[9/5] w-[220px] cursor-pointer items-center justify-center rounded-xl border border-dashed border-gray-40 transition-colors ${
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
