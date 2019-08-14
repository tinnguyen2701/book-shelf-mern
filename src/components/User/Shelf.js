import React from 'react';

export default ({ currentUser }) => {
  console.log(currentUser);
  return (
    <div>
      <p>List</p>
      <div>
        buy
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
        sell
        {currentUser.sell.map((item, index) => (
          <div key={index.toString()}>
            <p>poster: {item.poster}</p>
            <p>title: {item.title}</p>
            <p>sum amount</p>

            <p>amount: {item.amount}</p>
            <p>money: {item.money}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
