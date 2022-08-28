const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {

 test('getSavedCartItems, deve chamar o método localStorage.getItem', () => { 
  expect.assertions(1);
  getSavedCartItems();
  expect(localStorage.getItem).toHaveBeenCalled();
 });

 test('getSavedCartItems, deve chamar o método localStorage.getItem com o parâmetro \'cartItems\'.', () => { 
  expect.assertions(1);
  getSavedCartItems();
  expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
 });

});
