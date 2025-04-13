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
    <select name='card-list' id='card-list' className='py-2'>
      {data?.data?.map((item: CardItem) => (
        <option key={item.id} value={item.id}>
          {item.title}
        </option>
      ))}
    </select>
  );
};

export default CardSelector;
