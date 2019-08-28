/* eslint-disable */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import store from 'store';
import { SELL_REQUEST } from './duck';

const Sell = ({ isSuccess }) => {
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [money, setMoney] = useState(null);
  const [amount, setAmount] = useState(null);
  const [poster, setPoster] = useState(null);
  const [images, setImages] = useState(null);

  const onSubmitHandler = e => {
    e.preventDefault();

    const formData = new FormData();
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
      type: SELL_REQUEST,
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
        <input type="file" onChange={e => setPosterHandler(e)} />
      </p>
      <p>
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
      <p>{isSuccess && 'sell thanh cong'}</p>
    </form>
  );
};

export default connect(state => ({
  isSuccess: state.sell,
}))(Sell);
