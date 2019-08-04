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
    store.dispatch({
      type: SELL_REQUEST,
      payload: { title, description, money, amount, poster, images },
    });
    setTitle(null);
    setDescription(null);
    setAmount(null);
    setMoney(null);
    setPoster(null);
    setImages(null);
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
      <p>{isSuccess && 'sell thanh cong'}</p>
    </form>
  );
};

export default connect(state => ({
  isSuccess: state.sell,
}))(Sell);
