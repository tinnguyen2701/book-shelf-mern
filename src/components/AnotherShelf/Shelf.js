import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Image from 'utils/Image';

const Div = styled.div`
  display: flex;
  align-items: center;
  margin: 15px 0;

  > div:first-child {
    margin-right: 10px;
    width: 110px;
    height: 110px;
    overflow: hiddent;
    box-shadow: 1px 0px 5px rgba(122, 116, 123, 0.83);
    display: flex;
    justify-content: center;
    align-items: center;

    :hover {
      position: relative;
      transform: scale(1.08);
      transition: 200ms all;
      box-shadow: 2px 0px 10px rgba(122, 116, 123, 0.83);
    }
  }
  > div:last-child {
    > p {
      margin: 5px 0;
    }
  }
`;

const WrapperImage = styled.div`
  :hover {
    cursor: pointer;
  }
`;

const Shelf = ({ item, history }) => {
  return (
    <Div>
      <WrapperImage onClick={() => history.push(`/post/${item.id}`)}>
        <Image src={item.poster} size="100%" />
      </WrapperImage>
      <div>
        <p>Title: {item.title}</p>
        <p>Money: {item.money}.000vnđ</p>
        <p>Amount: {item.amount}</p>
      </div>
    </Div>
  );
};

export default withRouter(Shelf);
