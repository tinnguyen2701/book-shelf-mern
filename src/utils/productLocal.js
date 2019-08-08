/* eslint no-param-reassign: "error" */

export default (postId, amount) => {
  let carts = window.localStorage.getItem('carts');
  if (!carts) {
    window.localStorage.setItem('carts', JSON.stringify([{ bookId: postId, amount }]));
  } else {
    carts = JSON.parse(carts);
    carts = carts.filter(cart => cart.bookId !== postId);
    carts.push({ bookId: postId, amount });
    window.localStorage.setItem('carts', JSON.stringify(carts));
  }
};
