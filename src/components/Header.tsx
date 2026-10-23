import { Menu } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router';

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <header className="relative flex h-20 items-center px-40">
      <Link
        className="text-2xl leading-9 font-bold tracking-[-0.6px] whitespace-nowrap text-black"
        to="/"
      >
        CERTICOS BOOKS
      </Link>
      <nav className="absolute left-1/2 -translate-x-1/2">
        <Menu
          mode="horizontal"
          selectedKeys={[pathname]}
          onClick={({ key }) => navigate(key)}
          className="border-b-0"
          classNames={{
            item: 'px-0 text-lg leading-10 not-first:ms-14 after:inset-x-0 after:border-b',
            itemContent: 'text-black',
          }}
          items={[
            { key: '/search', label: '도서 검색' },
            { key: '/wishlist', label: '내가 찜한 책' },
          ]}
        />
      </nav>
    </header>
  );
};

export default Header;
