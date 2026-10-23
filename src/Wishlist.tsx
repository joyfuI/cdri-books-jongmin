import { Typography } from 'antd';

import type { Book } from './api/getSearchBook';
import BookItem from './components/BookItem';
import { useLocalStorage } from './hooks/useStorage';
import iconBook from './images/icon_book.png';

const { Text, Title } = Typography;

const Wishlist = () => {
  const [wishlist] = useLocalStorage<Book[]>('wishlist', []);

  return (
    <>
      <Title className="mb-6" level={2}>
        내가 찜한 책
      </Title>
      <Text className="flex gap-4 text-base leading-6">
        찜한 책{' '}
        <span>
          총 <b className="font-normal text-[#4880ee]">{wishlist.length}</b>건
        </span>
      </Text>
      {wishlist.length ? (
        <ul className="mt-9 list-none p-0">
          {wishlist.map((book) => (
            <BookItem key={book.url} book={book} />
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center gap-6 pt-30 text-[#6d7582]">
          <img src={iconBook} alt="책" width="80" height="80" />
          <Text type="secondary">찜한 책이 없습니다.</Text>
        </div>
      )}
    </>
  );
};

export default Wishlist;
