import { Button, Input, Popover, Select } from 'antd';
import { useEffect, useState } from 'react';

import type { GetSearchBookParams } from '../api/getSearchBook';
import closeIcon from '../images/close.svg';
import expandIcon from '../images/expand.svg';

type SearchTarget = NonNullable<GetSearchBookParams['target']>;

export type AdvancedSearchButtonProps = {
  open: boolean;
  query: string;
  target: SearchTarget | null;
  onOpenChange: (open: boolean) => void;
  onSearch: (value: string, target: SearchTarget) => void;
};

const AdvancedSearchButton = ({
  open,
  query,
  target,
  onOpenChange,
  onSearch,
}: AdvancedSearchButtonProps) => {
  const [field, setField] = useState<SearchTarget>(target ?? 'title');
  const [keyword, setKeyword] = useState(query);

  useEffect(() => {
    setField(target ?? 'title');
    setKeyword(query);
  }, [query, target]);

  return (
    <Popover
      trigger="click"
      placement="bottom"
      align={{ offset: [0, 16] }}
      open={open}
      onOpenChange={onOpenChange}
      arrow={false}
      classNames={{
        root: 'drop-shadow-none',
        container: 'rounded-lg p-0 shadow-[0_4px_20px_rgba(0,0,0,0.08)]',
      }}
      content={
        <form
          className="relative w-90 px-6 pt-10 pb-9"
          onSubmit={(event) => {
            event.preventDefault();
            onSearch(keyword, field);
          }}
        >
          <Button
            className="absolute top-2 right-2 size-6 p-0"
            type="text"
            size="small"
            icon={
              <img
                className="size-4 shrink-0 opacity-40"
                src={closeIcon}
                alt="close"
              />
            }
            onClick={() => onOpenChange(false)}
          />
          <div className="mb-4 flex h-8 gap-1">
            <Select
              className="h-8 w-25 flex-none rounded-none border-b border-b-[#d2d6da] font-bold"
              variant="borderless"
              suffixIcon={
                <img
                  className="h-1.5 w-2.5 shrink-0"
                  src={expandIcon}
                  alt="expand"
                />
              }
              value={field}
              onChange={setField}
              options={[
                { value: 'title', label: '제목' },
                { value: 'person', label: '저자명' },
                { value: 'publisher', label: '출판사' },
              ]}
            />
            <Input
              className="h-8 min-w-0 rounded-none border-b border-b-[#4880ee] px-2 text-sm placeholder:text-[#8d94a0]"
              placeholder="검색어 입력"
              variant="borderless"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
            />
          </div>
          <Button
            className="h-9 text-sm"
            type="primary"
            htmlType="submit"
            block
            disabled={!keyword.trim()}
          >
            검색하기
          </Button>
        </form>
      }
    >
      <Button
        className="h-9 rounded-[5px] border-[#8d94a0] px-3 text-[#8d94a0] shadow-none"
        size="small"
      >
        상세검색
      </Button>
    </Popover>
  );
};

export default AdvancedSearchButton;
