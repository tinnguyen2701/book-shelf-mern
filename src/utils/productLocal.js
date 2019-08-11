/* eslint no-param-reassign: "error" */

export default (postId, money, amount, title, poster) => {
  let carts = window.localStorage.getItem('carts');
  if (!carts) {
    window.localStorage.setItem(
      'carts',
      JSON.stringify([{ bookId: postId, money, amount, title, poster }]),
    );
  } else {
    carts = JSON.parse(carts);
    carts = carts.filter(cart => cart.bookId !== postId);
    carts.push({ bookId: postId, money, amount, title, poster });
    window.localStorage.setItem('carts', JSON.stringify(carts));
  }
};
