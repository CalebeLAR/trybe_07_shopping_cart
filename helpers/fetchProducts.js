// const fetch = require('node-fetch');

const fetchProducts = async (searchedProduct) => {
  if (!searchedProduct) {
    throw new Error('You must provide an url');
  } 
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${searchedProduct}`;
  const request = await fetch(url);
  const requestJson = await request.json();
  return requestJson;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
