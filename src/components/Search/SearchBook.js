import React from 'react';

export default ({ book }) => (
  <div>
    <p>poster: {book.poster}</p>
    <p>title: {book.title}</p>
    <p>money: {book.money}</p>
    <hr />
  </div>
);
