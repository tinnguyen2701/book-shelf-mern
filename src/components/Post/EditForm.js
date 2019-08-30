/* eslint-disable */
import React, { useState } from 'react';
import styled from 'styled-components';
import store from 'store';
import Image from 'utils/Image';
import Button from 'utils/Button';
import { UPDATE_POST_REQUEST } from './ducks';

const Div = styled.div`
  padding: 3% 3%;

  > form > p {
    width: 300px;
    margin-bottom: 10px;

    > input {
      float: right;
    }
  }

  > form div:nth-child(5) {
    display: flex;
    align-items: center;

    > div:first-child {
      margin: 10px;
      width: 100px;
      height: 100px;
      border-radius: 5px;
      box-shadow: 1px 0px 5px rgba(122, 116, 123, 0.83);
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
    }
  }

  > form div:nth-child(6) {
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;

    div:nth-child(2) {
      display: flex;
      div {
        width: 100px;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
`;
export default ({ book, status }) => {
  const [title, setTitle] = useState(book.title);
  const [description, setDescription] = useState(book.description);
  const [money, setMoney] = useState(book.money);
  const [amount, setAmount] = useState(book.amount);
  const [poster, setPoster] = useState(null);
  const [images, setImages] = useState(null);

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
          {title === '' && <span>Title is required</span>}
        </p>
        <p>
          <span>Description: </span>
          <input
            type="text"
            placeholder="Description.."
            value={description || ''}
            onChange={e => setDescription(e.target.value)}
          />
          {description === '' && <span>Description is required</span>}
        </p>
        <p>
          <span>Money: </span>
          <input
            type="text"
            placeholder="Money.."
            value={money || ''}
            onChange={e => setMoney(e.target.value)}
          />
          {money === '' && <span>Money is required</span>}
        </p>
        <p>
          <span>Amount: </span>
          <input
            type="text"
            placeholder="Amount.."
            value={amount || ''}
            onChange={e => setAmount(e.target.value)}
          />
          {amount === '' && <span>Amount is required</span>}
        </p>
        <div>
          Poster:{' '}
          <div>
            <Image src={displayPoster} alt={title} size="100%" />
          </div>
          <div>
            <input type="file" onChange={e => setPosterHandler(e)} />
          </div>
        </div>
        <div>
          <p>Images:</p>
          <div>
            {displayImages.map((image, index) => (
              <div key={index.toString()}>
                <Image src={image} alt={title} size="100%" />
              </div>
            ))}
          </div>
          <div>
            <input type="file" multiple onChange={e => setImagesHandler(e)} />
          </div>
        </div>
        <p>
          <Button
            type="submit"
            disabled={!title || !description || !money || !amount || !poster || !images}
          />
        </p>
        {status && <p>{status}</p>}
      </form>
    </Div>
  );
};
