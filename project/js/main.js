const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// Переделать в ДЗ
let getRequest = (url, cb) => {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status !== 200) {
        console.log('Error');
      } else {
        cb(xhr.responseText);
      }
    }
  };
  xhr.send();
};

// let getRequest = (url) => {

//   return new Promise((resolve, reject) => {

//   })
// }


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
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
  }
}

class ProductList {
  constructor(container = '.products') {
    this.container = container;
    this.goods = [];
    this.allProducts = [];
    this._fetchProducts();
    // this._getProducts()
    //     .then(data => {
    //       this.goods = [...data];
    //       this.render();
    //     });
    //this.render();
    this.calcSum();    
  }
  
  _fetchProducts() {
    getRequest(`${API}/catalogData.json`, (data) => {
      this.goods = JSON.parse(data);
      this.render();
      console.log(this.goods);
    });
  }

  // _getProducts() {
  //   return fetch(`${API}/catalogData.json`)
  //       .then(result => result.json())
  //       .catch(error => {
  //         console.log('Error:', error);
  //       });
  // }

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

class Cart {
  //рендер корзины
  //подсчет общей стоимости товаров
}

class CartItems {
  //добавление товара
  //удаление товара
  //изменение количества товара
  //рендер товара
}

const list = new ProductList();