// const fetch = require('node-fetch');

const fetchItem = async (ItemID) => {  
  if (!ItemID) {
    throw new Error('You must provide an url');
  } 
  const url = `https://api.mercadolibre.com/items/${ItemID}`;
  const request = await fetch(url);
  const requestJson = await request.json();
  return requestJson;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
