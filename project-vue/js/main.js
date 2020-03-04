const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#app',
  data: {
    catalogUrl: '/catalogData.json',
    products: [],
    imgCatalog: 'https://placehold.it/200x150',
    textUser: '',
    showCart: false,
  },
  methods: {
    getJson(url){
      return fetch(url)
        .then(result => result.json())
        .catch(error => {
          console.log(error);
        })
    },
    addProduct(product){
      console.log(product.id_product);
    },
    filter() {      
      const regexp = new RegExp(this.textUser, 'i');
      let allProducts = document.querySelectorAll('.product-item');
      for (let product of allProducts) {
        if (!regexp.test(product.dataset.name)) {
          product.classList.add('invisible');
        } else {
          product.classList.remove('invisible');
        };
      }
    }
  },
  // хук жизненного цикла
  mounted(){
    this.getJson(`${API + this.catalogUrl}`)
      .then(data => {
        for(let el of data){
          this.products.push(el);
        }
      });
  }
});