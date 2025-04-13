'use client';

import useCardSelectList from '@/hooks/queries/use-card-select-list';
import { authStore } from '@/store/auth.store';

type CardItem = { id: string; title: string };

const CardSelector = () => {
  const userId = authStore((state) => state.userId);
  const { data, error } = useCardSelectList(userId as string);

  if (error) {
    return <div>에러가 발생했습니다.</div>;
  }

  return (
    <select
      name='card-list'
      id='card-list'
      className="mx-7 appearance-none overflow-hidden truncate whitespace-nowrap bg-[length_0.65rem] bg-white bg-[url('/icons/triangle.svg')] bg-[right_0.75rem_center] bg-no-repeat py-2 pl-2 pr-11 text-body-medium text-primary-40"
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
