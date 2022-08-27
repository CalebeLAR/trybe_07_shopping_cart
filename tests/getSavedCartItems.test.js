const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {

 test('getSavedCartItems, deve chamar o método localStorage.getItem', () => { 
  getSavedCartItems();
  expect(localStorage.getItem).toHaveBeenCalled();
 });

 test('getSavedCartItems, deve chamar o método localStorage.getItem com o parâmetro \'cartItems\'.', () => { 
  getSavedCartItems();
  expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
 });

});
