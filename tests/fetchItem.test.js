require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Testa função fetchItem', () => {
  test('verifica se fetchItem é uma função.', () => {
    expect(typeof fetchItem).toBe('function');
  });

  test('verifica se fetchItem ao receber o argumento \'MLB1615760527\' chama a função fetch.', async ()=>{
    expect.assertions(1);
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  test('verifica se fetchItem ao receber o argumento \'MLB1615760527\' chama a função fetch com o endpoint https://api.mercadolibre.com/items/MLB1615760527.', async ()=>{
    expect.assertions(1);
    const url = "https://api.mercadolibre.com/items/MLB1615760527";
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(url);
  });

  test('verifica se fetchItem ao receber o argumento \'MLB1615760527\' retorna um objeto similar ao armazenado em \'item\'.', async ()=>{
    expect.assertions(1);
    const result = await fetchItem('MLB1615760527');
    expect(result).toStrictEqual(item); // testa se os objetos são iguais em tipo e em estrutura
  });

  test('verifica se ao chamar fetchItem sem argumento, ela retorna um erro com a mensagem: \'You must provide an url\'', async ()=>{
    expect.assertions(1);
    await expect(fetchItem()).rejects.toThrow('You must provide an url');
    });
});
