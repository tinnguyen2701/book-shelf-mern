/* eslint-disable */
import React, { useState } from 'react';
import store from 'store';
import Image from 'utils/Image';
import { UPDATE_POST_REQUEST } from './ducks';

export default ({ book, status }) => {
  const [title, setTitle] = useState(book.title);
  const [description, setDescription] = useState(book.description);
  const [money, setMoney] = useState(book.money);
  const [amount, setAmount] = useState(book.amount);
  const [poster, setPoster] = useState(book.poster);
  const [images, setImages] = useState(book.images);

  const displayPoster = book.poster;
  const displayImages = book.images;

  const onSubmitHandler = e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('id', book._id);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('money', money);
    formData.append('amount', amount);
    formData.append('images', images);
    formData.append('poster', poster);

    for (const image of images) {
      formData.append('images[]', image, image.name);
    }

    store.dispatch({
      type: UPDATE_POST_REQUEST,
      payload: formData,
    });

    setTitle(null);
    setDescription(null);
    setAmount(null);
    setMoney(null);
    setPoster(null);
    setImages(null);
  };

  const setPosterHandler = e => {
    e.persist();
    setPoster(e.target.files[0]);
  };

  const setImagesHandler = e => {
    e.persist();
    setImages(e.target.files);
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
          value={amount || ''}
          onChange={e => setAmount(e.target.value)}
        />
        {amount === '' && <span>Amount is required</span>}
      </p>
      <p>
        poster: <Image src={displayPoster} alt={title} size={60} />
        <input type="file" onChange={e => setPosterHandler(e)} />
      </p>
      <p>
        images:
        {displayImages.map((image, index) => (
          <Image key={index.toString()} src={image} alt={title} size={60} />
        ))}
        <input type="file" multiple onChange={e => setImagesHandler(e)} />
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
