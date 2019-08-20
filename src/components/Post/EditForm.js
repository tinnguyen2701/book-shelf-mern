/* eslint no-underscore-dangle: "off" */
import React, { useState } from 'react';
import store from 'store';
import { UPDATE_POST_REQUEST } from './ducks';

export default ({ book, status }) => {
  const [title, setTitle] = useState(book.title);
  const [description, setDescription] = useState(book.description);
  const [money, setMoney] = useState(book.money);
  const [amount, setAmount] = useState(book.amount);
  const [poster, setPoster] = useState(book.poster);
  const [images, setImages] = useState(book.images);

  const onSubmitHandler = e => {
    e.preventDefault();
    store.dispatch({
      type: UPDATE_POST_REQUEST,
      payload: { id: book._id, title, description, money, amount, poster, images },
    });
  };

  return (
    <form onSubmit={e => onSubmitHandler(e)}>
      <p>
        <input
          type="text"
          placeholder="Title.."
          value={title || ''}
          onChange={e => setTitle(e.target.value)}
        />
        {title === '' && <span>Title is required</span>}
      </p>
      <p>
        <input
          type="text"
          placeholder="Description.."
          value={description || ''}
          onChange={e => setDescription(e.target.value)}
        />
        {description === '' && <span>Description is required</span>}
      </p>
      <p>
        <input
          type="text"
          placeholder="Money.."
          value={money || ''}
          onChange={e => setMoney(e.target.value)}
        />
        {money === '' && <span>Money is required</span>}
      </p>
      <p>
        <input
          type="text"
          placeholder="Amount.."
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
        {amount === '' && <span>Amount is required</span>}
      </p>
      <p>
        <input
          type="text"
          placeholder="Poster.."
          value={poster || ''}
          onChange={e => setPoster(e.target.value)}
        />
        {poster === '' && <span>Poster is required</span>}
      </p>
      <p>
        <input
          type="text"
          placeholder="Images.."
          value={images || ''}
          onChange={e => setImages(e.target.value)}
        />
        {images === '' && <span>Images is required</span>}
      </p>
      <p>
        <button
          type="submit"
          disabled={!title || !description || !money || !amount || !poster || !images}
        >
          Submit
        </button>
      </p>
      {status && <p>{status}</p>}
    </form>
  );
};
