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
import { useSheetStore } from '@/store/sheet.store';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/constants/path.constant';

interface ParamsData {
  title: string;
  id: string;
}

interface CardSelectorParams {
  cardId: string;
  data?: ParamsData[] | null;
}

const CardSelector = ({ cardId, data }: CardSelectorParams) => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string>(cardId);
  const openSheet = useSheetStore((state) => state.open);
  const close = useSheetStore((state) => state.close);

  const handleSelectCard = (cardId: string) => {
    setSelectedOption(cardId);
    close();
    router.push(`${ROUTES.MYCARD}/${cardId}`);
  };

  const selectedCard = data?.find((item) => item.id === selectedOption);
  const handleOpenBottomSheet = () => {
    openSheet({
      side: 'bottom',
      title: '내 명함 목록',
      showCloseButton: false,
      content: (
        <ul className='px-[18px]'>
          {data?.map((item: ParamsData) => (
            <li
              key={item.id}
              onClick={() => handleSelectCard(item.id)}
              className={cn(
                'truncate py-3 text-left text-label2-medium',
                selectedCard?.id === item.id &&
                  'text-sm font-medium leading-5 text-primary-40'
              )}
            >
              {item.title}
            </li>
          ))}
        </ul>
      ),
    });
  };
  return (
    <>
      <div className='hidden md:block'>
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
      </div>
      <div className='block md:hidden'>
        <Button
          onClick={handleOpenBottomSheet}
          variant='outline'
          className='mb-[18px] ml-3 flex w-[142px] items-center justify-between px-4 text-body-medium text-primary-40 md:mb-5'
          aria-label='명함 선택'
        >
          <span className='truncate'>{selectedCard?.title}</span>
          <Icon icon='tdesign:caret-down-small' width='24' height='24' />
        </Button>
      </div>
    </>
  );
};

export default CardSelector;
