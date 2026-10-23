import { AutoComplete, Button, Input, Pagination, Typography } from 'antd';
import {
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
  useQueryStates,
} from 'nuqs';
import { useEffect, useState } from 'react';

import type { GetSearchBookParams } from './api/getSearchBook';
import AdvancedSearchButton from './components/AdvancedSearchButton';
import BookItem from './components/BookItem';
import useGetSearchBookQuery from './hooks/query/useGetSearchBookQuery';
import { useLocalStorage } from './hooks/useStorage';
import closeIcon from './images/close.svg';
import iconBook from './images/icon_book.png';
import searchIcon from './images/search.svg';

const { Text, Title } = Typography;

const Search = () => {
  const [historyOpen, setHistoryOpen] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [search, setSearch] = useQueryStates(
    {
      query: parseAsString.withDefault(''),
      page: parseAsInteger.withDefault(1),
      target: parseAsStringLiteral(['title', 'isbn', 'publisher', 'person']),
    },
    { history: 'push' },
  );
  const [value, setValue] = useState(search.query);
  const [history, setHistory] = useLocalStorage<string[]>('searchHistory', []);

  const page = Math.min(50, Math.max(1, search.page));
  const { data } = useGetSearchBookQuery({
    query: search.query.trim(),
    target: search.target ?? undefined,
    page,
  });

  useEffect(() => {
    setValue(search.query);
  }, [search.query]);

  const submitSearch = (
    value: string,
    target?: GetSearchBookParams['target'],
  ) => {
    const trimValue = value.trim();
    setValue(trimValue);
    setSearch({
      query: trimValue,
      target: trimValue ? (target ?? null) : null,
      page: 1,
    });
    setHistoryOpen(false);
    setAdvancedOpen(false);
    if (trimValue) {
      setHistory((oldHistory) =>
        [...new Set([trimValue, ...oldHistory])].slice(0, 8),
      );
    }
  };

  return (
    <>
      <Title className="mb-6" level={2}>
        도서 검색
      </Title>
      <search className="mb-6 flex items-center gap-4">
        <form
          className="w-120"
          onSubmit={(event) => {
            event.preventDefault();
            submitSearch(value);
          }}
        >
          <AutoComplete
            className="flex w-full rounded-3xl bg-transparent shadow-none outline-none"
            variant="borderless"
            classNames={{
              popup: {
                root: 'rounded-t-none rounded-b-3xl bg-[#f3f4f6] px-0 pt-2 pb-4 shadow-none',
                listItem:
                  'h-10 min-h-10 rounded-none bg-transparent py-0 pr-6 pl-12 text-base [&.ant-select-item-option-active]:bg-[#e9ebef] [&.ant-select-item-option-selected]:bg-transparent',
              },
            }}
            popupAlign={{ offset: [0, 0] }}
            virtual={false}
            listHeight={320}
            value={value}
            onChange={setValue}
            open={historyOpen && history.length > 0}
            onOpenChange={setHistoryOpen}
            onSelect={(value) => submitSearch(value)}
            options={history.map((item) => ({
              value: item,
              label: (
                <div className="flex h-10 items-center justify-between gap-3 text-[#8d94a0]">
                  <span className="truncate">{item}</span>
                  <Button
                    className="size-6 shrink-0 rounded-none p-0 text-[#353c49] hover:bg-transparent"
                    type="text"
                    size="small"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={(event) => {
                      event.stopPropagation();
                      setHistory((oldHistory) =>
                        oldHistory.filter((value) => value !== item),
                      );
                    }}
                    icon={
                      <img
                        className="size-4 shrink-0"
                        src={closeIcon}
                        alt="close"
                      />
                    }
                  />
                </div>
              ),
            }))}
          >
            <Input
              className={`h-12.5 border-0 bg-[#f3f4f6] px-3 py-0 shadow-none ${historyOpen && history.length > 0 ? 'rounded-t-3xl rounded-b-none outline-none' : 'rounded-3xl'}`}
              classNames={{
                prefix: 'mr-3',
                input:
                  'bg-transparent text-base text-[#353c49] placeholder:text-[#8d94a0]',
              }}
              variant="borderless"
              placeholder="검색어를 입력하세요"
              prefix={
                <button
                  className="grid size-6 place-items-center border-0 bg-transparent p-0"
                  type="submit"
                >
                  <img
                    className="size-5 shrink-0"
                    src={searchIcon}
                    alt="search"
                  />
                </button>
              }
              allowClear={{
                clearIcon: (
                  <img
                    className="size-4 shrink-0"
                    src={closeIcon}
                    alt="close"
                  />
                ),
              }}
            />
          </AutoComplete>
        </form>
        <AdvancedSearchButton
          open={advancedOpen}
          onOpenChange={setAdvancedOpen}
          query={search.query}
          target={search.target}
          onSearch={submitSearch}
        />
      </search>
      <Text className="flex gap-4 text-base leading-6">
        도서 검색 결과{' '}
        <span>
          총{' '}
          <span className="text-[#4880ee]">
            {(data?.meta.total_count ?? 0).toLocaleString()}
          </span>
          건
        </span>
      </Text>
      {data?.documents.length ? (
        <>
          <ul className="mt-9 list-none p-0">
            {data?.documents.map((book) => (
              <BookItem key={book.url} book={book} />
            ))}
          </ul>
          <Pagination
            className="mt-8 justify-center"
            current={page}
            total={Math.min(data?.meta.pageable_count ?? 0, 500)}
            showSizeChanger={false}
            hideOnSinglePage
            onChange={(page) => setSearch({ page })}
          />
        </>
      ) : (
        <div className="flex flex-col items-center gap-6 pt-30">
          <img src={iconBook} alt="책" width="80" height="80" />
          <Text type="secondary">검색된 결과가 없습니다.</Text>
        </div>
      )}
    </>
  );
};

export default Search;
