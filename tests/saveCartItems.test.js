const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {

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

  test('saveCartItems ao receber nem um argumento deve lançar um erro com a mensagem \'You must provide a valid value\'', ()=>{
    expect.assertions(1);
    expect(()=>(saveCartItems())).toThrowError('You must provide a valid value');
   });

});
