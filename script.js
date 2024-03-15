const CART__ITEMS = document.querySelector('.cart__items');

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
    section.appendChild(
        createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'),
    );

    return section;
};

const getSkuFromProductItem = (item) =>
    item.querySelector('span.item__sku').innerText;

// Funções implementadas no requisito 8;
const formatThatAreInHTML = (savedProducts) => {
    // função que pega a string contendo todo o innerHTML da lista de produtos e trata ela para que de cada li da string se transforme em um array com apenas as informações sobre os produtos
    const firstFormatting = savedProducts.split('<li class="cart__item">'); // devolve um array similar à ['', 'SKU: id | NAME: nomedoproduto | PRICE: preço</li>', ... outros]
    const secondFormatting = firstFormatting.map((li) =>
        li.replace('</li>', '')); // devolve um array similar à ['', 'SKU: id | NAME: nomedoproduto | PRICE: preço', ... outros] sem </li> no final
    let detailsProductList = secondFormatting.map((s) => s.split(' |')); // devolve um array similar à [[''], ["SKU: id "], [" NAME: nomedoproduto "], [" PRICE: preço' "]] com um array vazio no inicio
    detailsProductList = detailsProductList.splice(1); // devolve um array similar à [["SKU: id "], [" NAME: nomedoproduto "], [" PRICE: preço' "]] com arrays só com os valores uteis
    return detailsProductList;
};

// Função implementada no requisito 9;
const aroudNumber = (valor) => {
    const string = valor.toString();
    if (string.includes('.')) {
        const twoDecimalsPlaces = string.indexOf('.') + 3;
        const num = string.slice(0, twoDecimalsPlaces);
        return Number(num);
    }
    return Number(valor);
};

// Função implementada no requisito 9;
const calculatePrice = () => {
    const list = formatThatAreInHTML(CART__ITEMS.innerHTML);

    let valor = 0;
    if (list.length === 0) {
        valor = 0;
    } else {
        list.forEach((product) => {
            const priceProduct = product[2].replace('PRICE: $', '');
            valor += Number(priceProduct);
        });
    }
    const totalPrice = document.querySelector('.total-price');
    totalPrice.innerText = aroudNumber(valor);
};

const cartItemClickListener = (event) => {
    const cart = event.target.parentElement;
    const item = event.target;
    cart.removeChild(item);

    // código implementado no requisito 8;
    saveCartItems(cart.innerHTML); // recebe todas as LIs de dentro da tag <ol class="cart__items"></ol>, e as adiciona no local storage;
    calculatePrice();
};

const createCartItemElement = ({ sku, name, salePrice }) => {
    const li = document.createElement('li');
    li.className = 'cart__item';
    li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
    li.addEventListener('click', cartItemClickListener);
    return li;
};

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
const getItemID = (event) => {
    // função que faz o botão responder ao click adicionando uma descrição do produto na tag <ol class="cart__items"></ol>
    const button = event.target;
    const itemButton = button.parentElement;
    const buttonID = getSkuFromProductItem(itemButton);
    return buttonID;
};

const throwToCartComponet = async (event) => {
    const buttonID = getItemID(event);
    // usa a função fetchItem para criar o elemento
    const fetchItemObject = await fetchItem(buttonID);
    const { id: sku, title: name, price: salePrice } = fetchItemObject;
    const elementHTML = createCartItemElement({ sku, name, salePrice });
    CART__ITEMS.appendChild(elementHTML);

    // código implementado no requisito 8;
    saveCartItems(CART__ITEMS.innerHTML); // recebe todas as LIs de dentro da tag <ol class="cart__items"></ol>, e as adiciona no local storage;
    calculatePrice();
};

const createCartItemComponents = async () => {
    const buttons = document.getElementsByClassName('item__add');
    [...buttons].forEach((button) => {
        button.addEventListener('click', throwToCartComponet);
    });
};
// Função implementada no requisito 8
const rescueSavedItems = () => {
    // para cada produto salvo no local storage, monta um elemento do produto e coloca no carrinho.
    const localStorage = getSavedCartItems();
    const list = formatThatAreInHTML(localStorage);
    list.forEach((product) => {
        const obj = {
            sku: product[0].replace('SKU: ', '').replace(' ', ''), //  do array [["SKU: id "], [" NAME: nomedoproduto "], [" PRICE: preço' "]] coloca na chave sku a string contendo o id
            name: product[1].replace('NAME: ', '').replace(' ', ''), //  do array [["SKU: id "], [" NAME: nomedoproduto "], [" PRICE: preço' "]] coloca na chave sku a string contendo o nome
            salePrice: product[2].replace('PRICE: $', '').replace(' ', ''), //  do array [["SKU: id "], [" NAME: nomedoproduto "], [" PRICE: preço' "]] coloca na chave sku a string contendo o preço
        };
        const { sku, name, salePrice } = obj;
        const elementHTML = createCartItemElement({ sku, name, salePrice }); // monta o elemento que estava no local storage e ja coloca ele com as propriedades do addEventListner no carrinho!
        CART__ITEMS.appendChild(elementHTML);
    });
    calculatePrice();
};

// função implementada no requisito 10
const emptyCart = () => {
    const emptyCartButton = document.querySelector('.empty-cart');
    const totalPrice = document.querySelector('.total-price');
    emptyCartButton.addEventListener('click', () => {
        CART__ITEMS.innerText = null;
        totalPrice.innerText = 0;
        saveCartItems(CART__ITEMS.innerHTML);
    });
};

window.onload = async () => {
    emptyCart();
    await createProductsListing();
    await createCartItemComponents();
    rescueSavedItems();
};
