const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductItem {
  constructor(product, img='https://placehold.it/200x150') {
    this.title = product.product_name;
    this.price = product.price;
    this.id = product.id_product;
    this.img = img;
  }

  render() {
    return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} \u20bd</p>
                    <button class="buy-btn" data-id="${this.id}" data-price="${this.price}"  data-name="${this.title}">Купить</button>
                </div>
            </div>`
  }
}

class List {
  constructor(container) {
    this.container = container;
    this.goods = [];
    this.allProducts = [];
  }
  
  render() {
    const block = document.querySelector(this.container);
    for (let product of this.goods) {
      const productObject = new ProductItem(product);
      this.allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());
    }
    block.insertAdjacentHTML('beforeend', `<p>Сумма всех товаров: ${this.calcSum()}`);
  }

  calcSum() {
    return this.allProducts.reduce((accum, item) => accum +=item.price, 0);
  }
}

class ProductList extends List {
  constructor(container = '.products') {   
    super(container);
    this._getProducts()
        .then(data => {
          this.goods = [...data];
          this.render();
        });
  } 

  _getProducts() {
    return fetch(`${API}/catalogData.json`)
        .then(result => result.json())
        .catch(error => {
          console.log('Error:', error);
        });
  } 
}

class Cart extends List {
  constructor(container = '.cart-block', img='https://placehold.it/100x80') {
    super(container, img);    
    this.addItemsInCart();
    console.log(this.allProducts);
    this._init();
  }

  addItemsInCart() {
    let products = document.querySelector('.products');
    products.addEventListener('click', (event) => {
      if (event.target.className === "buy-btn") {
        let product = {
          id_product: +event.target.dataset['id'],
          price: +event.target.dataset['price'],
          product_name: event.target.dataset['name'],
          quantity: 1
        }
        this.goods = [product];
        this.render();
      }      
    })
  }

  _init() {
    document.querySelector('.btn-cart').addEventListener('click', (event) => {
      document.querySelector(this.container).classList.toggle('invisible');
    });
  }
}

class CartItems {  
}

const list = new ProductList();
const cart = new Cart();
