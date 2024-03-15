require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Testa função fetchProducts', () => {
  test('verifica se fetchProducts é uma função.', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  test('verifica se fetchProducts ao receber o argumento \'computador\' chama a função fetch.', async ()=>{
    expect.assertions(1);
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  test('verifica se fetchProducts ao receber o argumento \'computador\' chama a função fetch com o endpoint \'https://api.mercadolibre.com/sites/MLB/search?q=computador\'.', async ()=>{
    expect.assertions(1);
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(url);
  });

  test('verifica se fetchProducts ao receber o argumento \'computador\' retorna um objeto similar ao armazenado em \'item\'.', async ()=>{
    expect.assertions(1);
    const result = await fetchProducts('computador');
    expect(result).toStrictEqual(computadorSearch); // testa se os objetos são iguais em tipo e em estrutura
  });

  test('verifica se ao chamar fetchProducts sem argumento, ela retorna um erro com a mensagem: \'You must provide an url\'', async ()=>{
    expect.assertions(1);
    await expect(fetchProducts()).rejects.toThrow('You must provide an url');
    });
});
