const saveCartItems = (elementHTML) => localStorage.setItem('cartItems', elementHTML);

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
