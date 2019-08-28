import React from 'react';
import Image from 'utils/Image';

export default ({ book }) => (
  <div>
    <p>
      poster: <Image src={book.poster} alt={book.title} size={60} />
    </p>
    <p>title: {book.title}</p>
    <p>money: {book.money}</p>
    <hr />
  </div>
);
