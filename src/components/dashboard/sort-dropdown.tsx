'use client';

import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

const SortDropdown = () => {
  const sortOptions = [
    '최근 생성 순',
    '최근 수정 순',
    '높은 조회 순',
    '낮은 조회 순',
    '저장 많은 순',
  ];

  const [selectedOption, setSelectedOption] = useState(sortOptions[0]);

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
    // 추후 supabase로직 추가
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* 트리거 버튼 */}
        <Button variant='outline' className='flex items-center space-x-1'>
          <span>{selectedOption}</span>
          <ChevronDown className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align='start'
        className='w-[118px] py-[10px] text-extra-medium text-black'
      >
        {/* 드롭다운 목록 */}
        {sortOptions.map((option) => (
          <DropdownMenuItem
            key={option}
            onClick={() => handleSelectOption(option)}
          >
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortDropdown;
