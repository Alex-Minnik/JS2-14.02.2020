const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// Переделать в ДЗ
// let getRequest = (url, cb) => {
//   let xhr = new XMLHttpRequest();
//   xhr.open('GET', url, true);
//   xhr.onreadystatechange = () => {
//     if (xhr.readyState === 4) {
//       if (xhr.status !== 200) {
//         console.log('Error');
//       } else {
//         cb(xhr.responseText);
//       }
//     }
//   };
//   xhr.send();
// };

let getRequest = (url) => {  
  return new Promise ( (resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status !== 200) {
          reject('Error');
        } else {
          resolve(xhr.responseText);
        }
      }
    };
  xhr.send();
  });    
  
};


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

  _fetchProducts() {
    getRequest(`${API}/catalogData.json`)
      .then((data) => {
        this.goods = JSON.parse(data);
        this.render();
      })      
      .catch((error) => {
        console.log(error);
      })
  }
}

class ProductList extends List {
  constructor(container = '.products') {   
    super(container);
    this._fetchProducts();
    // this._getProducts()
    //     .then(data => {
    //       this.goods = [...data];
    //       this.render();
    //     });
    console.log(this.allProducts);     
  }
  
  
  // _fetchProducts() {
  //   getRequest(`${API}/catalogData.json`)
  //     .then((data) => {
  //       this.goods = JSON.parse(data);
  //       this.render();
  //       console.log(this.goods);
  //     })      
  //     .catch((error) => {
  //       console.log(error);
  //     })
  // }

  // _getProducts() {
  //   return fetch(`${API}/catalogData.json`)
  //       .then(result => result.json())
  //       .catch(error => {
  //         console.log('Error:', error);
  //       });
  // } 
}

class Cart extends List {
  constructor(container = '.btn-cart', img='https://placehold.it/100x80') {
    super(container, img);    
    this.addItemsInCart();
    console.log(this.allProducts);
  }
  
  addItemsInCart() {
    let products = document.querySelector('.products');
    products.addEventListener('click', (event) => {
      if (event.target.className === "buy-btn") {
        console.log(event.target.parentNode.parentNode.dataset.id);

      }
    })
  }
}

class CartItems {  
}

const list = new ProductList();
const cart = new Cart();
