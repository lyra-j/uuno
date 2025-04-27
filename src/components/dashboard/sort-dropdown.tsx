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
import { SortKey, SortOption } from '@/types/sort.type';

interface SortDropdownProps {
  options: SortOption[]; // 드롭다운 목록
  defaultValue?: SortKey; // 초기 선택값
  onSelect: (value: SortKey) => void; // 선택 변경시 호출
  disabled?: boolean; // 비활성화 여부
}

const SortDropdown = ({
  options,
  defaultValue,
  onSelect,
  disabled = false,
}: SortDropdownProps) => {
  // 현재 선택 된 정렬 키 상태
  const [selected, setSelected] = useState<SortKey>(
    defaultValue ?? options[0].value
  );

  // 옵션 선택 핸들러
  const handleSelectOption = (option: SortOption) => {
    setSelected(option.value);
    onSelect?.(option.value);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={disabled}>
        {/* 트리거 버튼 */}
        <Button
          variant='outline'
          className='flex items-center space-x-1'
          aria-label='정렬 옵션 선택'
        >
          <span>
            {options.find((option) => option.value === selected)?.label}
          </span>
          <ChevronDown className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>

      {/* 드롭다운 메뉴 내용 */}
      {!disabled && (
        <DropdownMenuContent
          align='start'
          className='w-[118px] py-[10px] text-extra-medium text-black'
        >
          {/* 드롭다운 목록 */}
          {options.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => handleSelectOption(option)}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
};

export default SortDropdown;
