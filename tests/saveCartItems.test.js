const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Testa função saveCartItems', () => {

  test('saveCartItems ao receber o argumento <ol><li>Item</li></ol>, deve chamar o método localStorage.setItem.', () => {
    expect.assertions(1);
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalled()
  })

  test('saveCartItems ao receber o argumento <ol><li>Item</li></ol>, deve chamar o método localStorage.setItem com dois parâmetros, sendo o primeiro \'cartItems\' e o segundo <ol><li>Item</li></ol>.', () => {
    expect.assertions(1);
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', '<ol><li>Item</li></ol>')
  })

});
