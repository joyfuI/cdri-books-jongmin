import type { Book } from '../api/getSearchBook';
import { useLocalStorage } from '../hooks/useStorage';
import heartFillIcon from '../images/fill.svg';
import iconBook from '../images/icon_book.png';
import heartLineIcon from '../images/line.svg';

export type BookCoverProps = { book: Book };

const BookCover = ({ book }: BookCoverProps) => {
  const [wishlist, setWishlist] = useLocalStorage<Book[]>('wishlist', []);
  const isWish = wishlist.some((item) => item.isbn === book.isbn);

  const handleWishClick = () => {
    setWishlist((oldWishlist) => {
      if (isWish) {
        return oldWishlist.filter((item) => item.isbn !== book.isbn);
      } else {
        return [...oldWishlist, book];
      }
    });
  };

  return (
    <div className="relative aspect-7/10 w-12 self-center group-data-[expanded=true]:row-[1/4] group-data-[expanded=true]:aspect-3/4 group-data-[expanded=true]:w-52.5">
      <img
        className="block size-full bg-[#f3f4f6] object-cover"
        src={book.thumbnail || iconBook}
        width="210"
        height="300"
        alt={book.title}
        loading="lazy"
      />
      <button
        className="absolute -top-1 -right-1 grid size-7 place-items-center border-0 bg-transparent p-1 transition duration-150 hover:scale-[1.12] group-data-[expanded=true]:top-0.5 group-data-[expanded=true]:right-0.5 group-data-[expanded=true]:size-9 motion-reduce:transition-none"
        type="button"
        onClick={handleWishClick}
      >
        <img
          className="size-5 group-data-[expanded=true]:size-6"
          src={isWish ? heartFillIcon : heartLineIcon}
          width="24"
          height="24"
          alt={`${book.title} ${isWish ? '찜 해제' : '찜하기'}`}
        />
      </button>
    </div>
  );
};

export default BookCover;
