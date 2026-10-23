import { Pagination, Typography } from 'antd';
import { parseAsInteger, useQueryState } from 'nuqs';
import { useMemo } from 'react';

import type { Book } from './api/getSearchBook';
import BookItem from './components/BookItem';
import { useLocalStorage } from './hooks/useStorage';
import iconBook from './images/icon_book.png';

const { Text, Title } = Typography;

const Wishlist = () => {
  const [page, setPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(1).withOptions({ history: 'push' }),
  );
  const [wishlist] = useLocalStorage<Book[]>('wishlist', []);

  const currPage = Math.max(1, Math.min(page, Math.ceil(wishlist.length / 10)));

  const sliceList = useMemo(
    () => wishlist.slice((currPage - 1) * 10, currPage * 10),
    [wishlist, currPage],
  );

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
        <>
          <ul className="mt-9 list-none p-0">
            {sliceList.map((book) => (
              <BookItem key={book.url} book={book} />
            ))}
          </ul>
          <Pagination
            className="mt-8 justify-center"
            current={currPage}
            pageSize={10}
            total={wishlist.length}
            showSizeChanger={false}
            hideOnSinglePage
            onChange={(page) => setPage(page)}
          />
        </>
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
