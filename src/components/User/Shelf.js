import React from 'react';

export default ({ currentUser }) => {
  return (
    <div>
      <hr />
      <p>List</p>
      <div>
        b u y
        {currentUser.buy.map((item, index) => (
          <div key={index.toString()}>
            <p>poster: {item.poster}</p>
            <p>title: {item.title}</p>
            <p>amount: {item.amount}</p>
            <p>money: {item.money}</p>
          </div>
        ))}
      </div>
      <div>
        <hr />s e l l
        {currentUser.sell.map((item, index) => (
          <div key={index.toString()}>
            <p>poster: {item.poster}</p>
            <p>title: {item.title}</p>
            <p>amount: {item.amount + item.bought}</p>
            <p>soll: {item.bought}</p>
            <p>money: {item.money}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
