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

interface Props {
  options?: string[];
  defaultOption?: string;
  onSelect?: (option: string) => void;
}

const SortDropdown = ({
  options = [
    '최근 생성 순',
    '최근 수정 순',
    '높은 조회 순',
    '낮은 조회 순',
    '저장 많은 순',
  ],
  defaultOption,
  onSelect,
}: Props) => {
  const [selectedOption, setSelectedOption] = useState(
    defaultOption || options[0]
  );

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
    onSelect?.(option);
    // 추후 supabase로직 추가
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* 트리거 버튼 */}
        <Button variant='outline' className='flex items-center space-x-1' aria-label='정렬 옵션 선택'>
          <span>{selectedOption}</span>
          <ChevronDown className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align='start'
        className='w-[118px] py-[10px] text-extra-medium text-black'
      >
        {/* 드롭다운 목록 */}
        {options.map((option) => (
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
