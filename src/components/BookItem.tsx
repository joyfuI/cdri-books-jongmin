import { Button } from 'antd';
import { useState } from 'react';

import type { Book } from '../api/getSearchBook';
import expandIcon from '../images/expand.svg';
import BookCover from './BookCover';

export type BookItemProps = { book: Book };

const BookItem = ({ book }: BookItemProps) => {
  const [expanded, setExpanded] = useState(false);
  const salePrice = book.sale_price >= 0 ? book.sale_price : book.price;
  const hasDiscount = salePrice < book.price;

  return (
    <li
      className={`group grid gap-y-4 border-b border-[#d5d5d5] pr-4 pl-12 ${
        expanded
          ? 'grid-cols-[210px_minmax(0,1fr)_240px] grid-rows-[48px_1fr_48px] items-start gap-x-8 pt-6 pb-10'
          : 'min-h-25 grid-cols-[48px_minmax(0,1fr)_104px_278px] items-center gap-x-4 py-3'
      }`}
      data-expanded={expanded}
    >
      <BookCover book={book} />
      <div className="group-data-[expanded=true]:col-start-2 group-data-[expanded=true]:row-[1/4] group-data-[expanded=true]:pt-6">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 pl-8 group-data-[expanded=true]:pl-0">
          <h2 className="text-lg leading-normal font-bold wrap-anywhere">
            {book.title}
          </h2>
          <p className="text-sm leading-normal whitespace-nowrap text-[#8d94a0]">
            {book.authors.join(', ')}
          </p>
        </div>
        {expanded ? (
          <div className="mt-4">
            <h3 className="mb-3 text-sm font-bold">책 소개</h3>
            <p className="text-xs leading-4 break-keep wrap-anywhere">
              {book.contents || '등록된 책 소개가 없습니다.'}
            </p>
          </div>
        ) : null}
      </div>
      <div className="text-right group-data-[expanded=true]:col-start-3 group-data-[expanded=true]:row-start-2 group-data-[expanded=true]:self-end">
        {expanded && hasDiscount ? (
          <p className="mb-2 flex items-baseline justify-end gap-2 text-base whitespace-nowrap">
            <span className="text-[10px] text-[#8d94a0]">원가</span>
            <del>{book.price.toLocaleString()}원</del>
          </p>
        ) : null}
        <p className="flex items-baseline justify-end gap-2 whitespace-nowrap">
          {expanded && hasDiscount ? (
            <span className="text-[10px] text-[#8d94a0]">할인가</span>
          ) : null}
          <strong className="text-lg font-bold">
            {salePrice.toLocaleString()}원
          </strong>
        </p>
      </div>
      <div className="flex gap-2 pl-10 group-data-[expanded=true]:contents">
        <Button
          className="h-12 w-28.75 flex-none rounded-lg px-3 text-base group-data-[expanded=true]:col-start-3 group-data-[expanded=true]:row-start-3 group-data-[expanded=true]:w-full transition-colors"
          type="primary"
          href={book.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          구매하기
        </Button>
        <Button
          className="h-12 w-28.75 flex-none gap-2 rounded-lg bg-[#f3f4f6] px-3 text-base text-[#6d7582] hover:bg-[#e9ebef] group-data-[expanded=true]:col-start-3 group-data-[expanded=true]:row-start-1 group-data-[expanded=true]:justify-self-end"
          type="text"
          aria-expanded={expanded}
          onClick={() => setExpanded((oldExpanded) => !oldExpanded)}
        >
          상세보기
          <img
            className="h-2 w-3.5 transition-transform group-data-[expanded=true]:rotate-180 motion-reduce:transition-none shrink-0"
            src={expandIcon}
            alt="expand"
          />
        </Button>
      </div>
    </li>
  );
};

export default BookItem;
