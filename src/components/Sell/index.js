/* eslint-disable */
import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import store from 'store';
import { SELL_REQUEST } from './duck';
import Button from 'utils/Button';

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;

  > form {
    background: tomato;
    color: white;
    padding: 7%;
    border-radius: 5px;
    box-shadow: 1px 0px 5px rgba(122, 116, 123, 0.83);
    margin: 2%;

    input {
      float: right;
      border-radius: 5px;
      border: none;
      padding: 5px;
    }

    p {
      margin-bottom: 15px;
    }
`;

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
    <Div>
      <form onSubmit={e => onSubmitHandler(e)}>
        <p>
          <span>Title: </span>
          <input
            type="text"
            placeholder="Title.."
            value={title || ''}
            onChange={e => setTitle(e.target.value)}
          />
        </p>
        {title === '' && <p>Title is required!</p>}
        <p>
          <span>Description: </span>
          <input
            type="text"
            placeholder="Description.."
            value={description || ''}
            onChange={e => setDescription(e.target.value)}
          />
        </p>
        {description === '' && <p>Description is required!</p>}
        <p>
          <span>Money: </span>
          <input
            type="text"
            placeholder="Money.."
            value={money || ''}
            onChange={e => setMoney(e.target.value)}
          />
        </p>
        {money === '' && <p>Money is required!</p>}
        <p>
          <span>Amount: </span>
          <input
            type="text"
            placeholder="Amount.."
            value={amount || ''}
            onChange={e => setAmount(e.target.value)}
          />
        </p>
        {amount === '' && <p>Amount is required!</p>}
        <p>
          <span>Poster: </span>
          <input type="file" onChange={e => setPosterHandler(e)} />
        </p>
        <p>
          <span>Images: </span>
          <input type="file" multiple onChange={e => setImagesHandler(e)} />
        </p>
        <p>
          <Button
            type="submit"
            disabled={!title || !description || !money || !amount || !poster || !images}
          />
        </p>
        <p>{isSuccess && 'sell thanh cong'}</p>
      </form>
    </Div>
  );
};

export default connect(state => ({
  isSuccess: state.sell,
}))(Sell);
