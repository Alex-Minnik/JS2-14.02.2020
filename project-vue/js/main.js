const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#app',
  data: {
    catalogUrl: '/catalogData.json',
    products: [],
    cartItems: [],
    imgCatalog: 'https://placehold.it/200x150',
    imgCart: 'https://placehold.it/50x100',
    textUser: '',
    showCart: false,
    filtered: [], 
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
      let find = this.cartItems.find(el => el.id_product === product.id_product);
      if (find) {
        find.quantity++;
      } else {
        let prod = Object.assign({quantity: 1}, product);
        this.cartItems.push(prod);
      }
      console.log(find);
      console.log(product.id_product);
    },

    remove(item) {
      if(item.quantity > 1) {
        item.quantity--;
      } else {
        this.cartItems.splice(this.cartItems.indexOf(item), 1);
      }
    },

    filter() { 
      this.filtered = []; // честим перед новым поиском(удаляем старые результаты)
      const regexp = new RegExp(this.textUser, 'i');
      let allProducts = document.querySelectorAll('.product-item');
      for (let product of allProducts) {
        if (!regexp.test(product.dataset.name)) {
          product.classList.add('invisible');
        } else {
          product.classList.remove('invisible');
          this.filtered.push(product);
        };
      }
    }
  },

  computed: {
    showTextNoData() {
      return !this.filtered.length
    }
  },

  // хук жизненного цикла
  mounted(){
    this.getJson(`${API + this.catalogUrl}`)
      .then(data => {
        for(let el of data){
          this.products.push(el);
          this.filtered.push(el);
        }
      });
  }
});
