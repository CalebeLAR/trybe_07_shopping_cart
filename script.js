const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

// const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

// const cartItemClickListener = () => {
//   // coloque seu código aqui
// };

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

// ------------------------------------------------------------------------------------------

// Função implementada no requisito 2;
const createProductsListing = async () => {
  // função que para cada produto da lista de produtos, coloca um elemento HTML do produto na tag <section class="items"></section>;

  const sectionClassItems = document.querySelector('.items');
  const object = await fetchProducts('computador');
  const { results: productsList } = object;

  productsList.forEach((product) => {
    const { id: sku, title: name, thumbnail: image } = product;
    const elementHTML = createProductItemElement({ sku, name, image });
    sectionClassItems.appendChild(elementHTML);
  });
};

// Funções implementadas no requisito 4;
const throwToCartComponet = async (event) => {
  const olClassCartItems = document.querySelector('.cart__items'); // busca <ol class="cart__items"></ol>
  const button = event.target;
  const itemButton = button.parentElement;
  const itemSkuButton = itemButton.querySelector('.item__sku'); // no elementoHTML itemButton temos outros elementos HTML, o querySlector busca por quele que tem a classe '.item__sku'.
  const buttonID = itemSkuButton.innerText;
  
  // usa a função fetchItem para criar o elemento
  const fetchItemObject = await fetchItem(buttonID);
  const { id: sku, title: name, price: salePrice } = fetchItemObject;
  const elementHTML = createCartItemElement({ sku, name, salePrice });
  olClassCartItems.appendChild(elementHTML); 
};

const createCartItemComponents = async () => {
  const buttons = document.getElementsByClassName('item__add');
  [...buttons].forEach((button) => {
    button.addEventListener('click', throwToCartComponet);
  });
};

window.onload = async () => { 
  await createProductsListing();
  await createCartItemComponents();
};
