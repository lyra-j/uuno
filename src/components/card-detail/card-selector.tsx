'use client';

import useCardSelectList from '@/hooks/queries/use-card-select-list';
import { authStore } from '@/store/auth.store';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';

type CardItem = { id: string; title: string };

interface CardSelectorParams {
  card_id: string;
}

const CardSelector = ({ card_id }: CardSelectorParams) => {
  const userId = authStore((state) => state.userId);
  const { data, error } = useCardSelectList(userId as string);
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string>(card_id);

  if (error) {
    return <div>에러가 발생했습니다.</div>;
  }

  const getCardItem = (e: ChangeEvent<HTMLSelectElement>): void => {
    const card_id = e.target.value;

    setSelectedOption(card_id);
    router.push(`/card/${card_id}`);
  };

  return (
    <select
      name='card-list'
      id='card-list'
      className="mx-7 appearance-none overflow-hidden truncate whitespace-nowrap bg-[length_0.65rem] bg-white bg-[url('/icons/triangle.svg')] bg-[right_0.75rem_center] bg-no-repeat py-2 pl-2 pr-11 text-body-medium text-primary-40"
      onChange={getCardItem}
      value={selectedOption}
    >
      {data?.data?.map((item: CardItem) => (
        <option
          key={item.id}
          value={item.id}
          className='overflow-hidden truncate whitespace-nowrap'
        >
          {item.title}
        </option>
      ))}
    </select>
  );
};

export default CardSelector;
