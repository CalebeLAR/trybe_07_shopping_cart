const fetchProducts = async (searchedProduct) => {
  if (searchedProduct) {
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${searchedProduct}`;
    const response = await fetch(url);
    const productList = await response.json();
    return productList;
  } 
  throw new Error('You must provide an url');
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
