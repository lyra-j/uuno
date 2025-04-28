'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Cards } from '@/types/supabase.type';
import { ROUTES } from '@/constants/path.constant';

interface ParamsData {
  title: string;
  id: string;
}

interface CardSelectorParams {
  card_id: string;
  data?: ParamsData[] | null;
}

const CardSelector = ({ card_id, data }: CardSelectorParams) => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string>(card_id);

  const handleSelectCard = (card_id: string) => {
    setSelectedOption(card_id);
    router.push(`${ROUTES.MYCARD}/${card_id}`);
  };

  const selectedCard = data?.find((item) => item.id === selectedOption);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          className='mb-[18px] ml-3 flex w-[142px] items-center justify-between px-4 text-body-medium text-primary-40 md:mb-5'
          aria-label='명함 선택'
        >
          <span className='truncate'>{selectedCard?.title}</span>
          <Icon icon='tdesign:caret-down-small' width='24' height='24' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-[142px]' align='start'>
        {data?.map((item: ParamsData) => (
          <DropdownMenuItem
            key={item.id}
            onClick={() => handleSelectCard(item.id)}
            className='truncate'
          >
            {item.title}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CardSelector;
