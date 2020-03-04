const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class CatalogItem {
  constructor(product, img='https://placehold.it/200x150') {
    this.product_name = product.product_name;
    this.price = product.price;
    this.id_product = product.id_product;
    this.img = img;
  }

  render() {
    return `<div class="product-item" data-id="${this.id_product}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.product_name}</h3>
                    <p>${this.price} \u20bd</p>
                    <button class="buy-btn" data-id="${this.id_product}" data-price="${this.price}"  data-name="${this.product_name}">Купить</button>
                </div>
            </div>`
  }
}

class CartItems extends CatalogItem { 
  constructor(product, img='https://placehold.it/50x100') {
    super(product, img);
    this.quantity = product.quantity;
  } 

  render(){
    return `<div class="cart-item" data-id="${this.id_product}">
            <div class="product-bio">
            <img src="${this.img}" alt="Some image">
            <div class="product-desc">
            <p class="product-title">${this.product_name}</p>
            <p class="product-quantity">Количество: ${this.quantity}</p>
        <p class="product-single-price">${this.price} за ед.</p>
        </div>
        </div>
        <div class="right-block">
            <p class="product-price">${this.quantity * this.price} ₽</p>
            <button class="del-btn" data-id="${this.id_product}">&times;</button>
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

  calcSum() {
    return this.allProducts.reduce((accum, item) => accum +=item.price, 0);
  }  
}

class Catalog extends List {
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

  render() {
    const block = document.querySelector(this.container);
    for (let product of this.goods) {
      const productObject = new CatalogItem(product);
      this.allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());
    }
    block.insertAdjacentHTML('beforeend', `<p>Сумма всех товаров: ${this.calcSum()}`);
  }
}



class Cart extends List {
  constructor(container = '.cart-block', img='https://placehold.it/100x80') {
    super(container, img);    
    this.addItemsInCart();
    this._init();
  }

  addItemsInCart() {
    let products = document.querySelector('.products');
    products.addEventListener('click', (event) => {
      if (event.target.className === "buy-btn") {
        let productId = +event.target.dataset['id'];
        //console.log(this.allProducts.['quantity']);
        
        let find = this.allProducts.find(product => product.id_product === productId);
        if (find) {
          console.log(find.quantity);
          find.quantity++;
          this._updateCart(find);
        } else {
          let product = {
            id_product: +event.target.dataset['id'],
            price: +event.target.dataset['price'],
            product_name: event.target.dataset['name'],
            quantity: 1
          }
          this.goods = [product];
          this.render();
        }
        
        
        
      }      
    })
  }

  _updateCart(product) {
    let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
    block.querySelector('.product-quantity').textContent = `Количество: ${product.quantity}`;
    block.querySelector('.product-price').textContent = `${product.quantity*product.price} ₽`;
  } 

  render() {
    const block = document.querySelector(this.container);
    for (let product of this.goods) {
      const productObject = new CartItems(product);
      this.allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());
    }
    block.insertAdjacentHTML('beforeend', `<p>Сумма всех товаров: ${this.calcSum()}`);
  }

  _init() {
    document.querySelector('.btn-cart').addEventListener('click', (event) => {
      document.querySelector(this.container).classList.toggle('invisible');
    });
  }
}



const list = new Catalog();
const cart = new Cart();
