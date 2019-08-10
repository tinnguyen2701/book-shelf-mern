/* eslint no-param-reassign: "error" */

export default (postId, amount, title, poster) => {
  let carts = window.localStorage.getItem('carts');
  if (!carts) {
    window.localStorage.setItem(
      'carts',
      JSON.stringify([{ bookId: postId, amount, title, poster }]),
    );
  } else {
    carts = JSON.parse(carts);
    carts = carts.filter(cart => cart.bookId !== postId);
    carts.push({ bookId: postId, amount, title, poster });
    window.localStorage.setItem('carts', JSON.stringify(carts));
  }
};
