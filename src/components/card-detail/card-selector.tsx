'use client';

import { ROUTES } from '@/constants/path.constant';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';

type CardItem = { id: string; title: string };

interface CardSelectorParams {
  card_id: string;
  data:
    | {
        title: string;
        id: string;
      }[]
    | null
    | undefined;
}

const CardSelector = ({ card_id, data }: CardSelectorParams) => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string>(card_id);

  const getCardItem = (e: ChangeEvent<HTMLSelectElement>): void => {
    const card_id = e.target.value;

    setSelectedOption(card_id);
    router.push(`${ROUTES.MYCARD}/${card_id}`);
  };

  return (
    <select
      name='card-list'
      id='card-list'
      className="mx-7 appearance-none overflow-hidden truncate whitespace-nowrap bg-[length_0.65rem] bg-white bg-[url('/icons/triangle.svg')] bg-[right_0.75rem_center] bg-no-repeat py-2 pl-2 pr-11 text-body-medium text-primary-40"
      onChange={getCardItem}
      value={selectedOption}
    >
      {data?.map((item: CardItem) => (
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
