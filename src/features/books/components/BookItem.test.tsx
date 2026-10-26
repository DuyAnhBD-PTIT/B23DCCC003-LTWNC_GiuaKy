import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BookItem } from './BookItem';
import type { Book } from '../../../types/book';

const book: Book = {
  id: 'b1',
  title: 'Clean Code',
  author: 'Robert C. Martin',
  category: 'CNTT',
  year: 2008,
  available: 3,
  total: 3,
};

describe('<BookItem />', () => {
  it('hiển thị đúng tên, tác giả, thể loại, năm xuất bản và số bản còn lại', () => {
    render(<BookItem book={book} isBorrowed={false} onBorrow={jest.fn()} onReturn={jest.fn()} />);

    expect(screen.getByRole('heading', { name: 'Clean Code' })).toBeInTheDocument();
    expect(screen.getByText('Robert C. Martin')).toBeInTheDocument();
    expect(screen.getByText('CNTT')).toBeInTheDocument();
    expect(screen.getByText('2008')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('click "Mượn" gọi onBorrow với đúng id', async () => {
    const user = userEvent.setup();
    const onBorrow = jest.fn();
    render(<BookItem book={book} isBorrowed={false} onBorrow={onBorrow} onReturn={jest.fn()} />);

    await user.click(screen.getByRole('button', { name: 'Mượn' }));

    expect(onBorrow).toHaveBeenCalledTimes(1);
    expect(onBorrow).toHaveBeenCalledWith('b1');
  });

  it('vô hiệu hoá nút "Mượn" khi sách đã hết bản', async () => {
    const user = userEvent.setup();
    const onBorrow = jest.fn();
    render(
      <BookItem book={{ ...book, available: 0 }} isBorrowed={false} onBorrow={onBorrow} onReturn={jest.fn()} />,
    );

    const button = screen.getByRole('button', { name: 'Mượn' });
    expect(button).toBeDisabled();

    await user.click(button);
    expect(onBorrow).not.toHaveBeenCalled();
  });

  it('hiện nút "Trả" cho sách đang mượn và gọi onReturn với đúng id', async () => {
    const user = userEvent.setup();
    const onReturn = jest.fn();
    render(<BookItem book={book} isBorrowed onBorrow={jest.fn()} onReturn={onReturn} />);

    expect(screen.queryByRole('button', { name: 'Mượn' })).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Trả' }));

    expect(onReturn).toHaveBeenCalledWith('b1');
  });
});
