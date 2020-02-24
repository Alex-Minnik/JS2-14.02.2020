class BurgerTitle {
    constructor(text) {
        this.text = text;
    }
    renderText() {
        return `<p>${this.text}</p>`        
    }
}

class BurgerProperties {
    constructor(item, name, type) {
        this.name = name;        
        this.type = type;
        this.item = item;        
    }    

    renderProperies() {
        return `<input type="${this.type}" id="${this.item.title}" name="${this.name}" data-price="${this.item.price}" data-calories="${this.item.calories}">
                <label for="${this.item.title}">${this.item.titleRus}(${this.item.price}р, ${this.item.calories}к)</label>`
    }
}

class Burger {
    constructor(container = 'main') {
        this.container = container;
        this.goods = [];
        this.allproducts = [];
        this.text ='';
        this.type ='';
        this._fetchElement();
        this.render();
    }
    
    _fetchElement() {
        this.allproducts = [
            {
                name: 'typeBurger',
                text: 'Выберите размер бургера',
                type: 'radio',
                goods: [
                    {title: 'small', titleRus: 'Маленький', price: 50, calories: 20},
                    {title: 'big', titleRus: 'Большой', price:100, calories: 40},
                ],
            },

            {
                name: 'filling',
                text: 'Выберите начинку бургера',
                type: 'radio',
                goods: [
                    {title: 'cheese', titleRus: 'Сыр', price: 10, calories: 20},
                    {title: 'salad', titleRus: 'Салат', price: 20, calories: 5},
                    {title: 'potato', titleRus: 'Картофель', price: 15, calories: 10},
                ],
            },

            {
                name: 'additionally',
                text: 'Дополнительно',
                type: 'checkbox',        
                goods: [         
                    {title: 'seasonings', titleRus: 'Приправы', price: 15, calories: 0},
                    {title: 'mayonnaise', titleRus: 'Майонез', price: 20, calories: 5},          
                ],
            },
        ];                               
    }

    render() { 
        const block = document.querySelector(this.container);        
        for (let elem of this.allproducts) {
            const elementBurger = new BurgerTitle(elem.text);
            block.insertAdjacentHTML('beforeend', elementBurger.renderText());
                        
            for (let item of elem.goods) {
                const propertyElement = new BurgerProperties(item, elem.name, elem.type);
                block.insertAdjacentHTML('beforeend', propertyElement.renderProperies());
            }
        }
        block.insertAdjacentHTML('beforeend', '<button class=button>Рассчитать</button>')
    }
}    

new Burger();

let btn = document.querySelector('button')
btn.addEventListener('click', () => {
    let sumPrice = 0;
    let sumCalories = 0;
    let elem = document.querySelectorAll('input');
    for (item of elem) {
        if (item.checked === true) {
            sumPrice += +item.dataset.price;
            sumCalories += +item.dataset.calories;
        }
    }
    const mainBlock = document.querySelector('main'); 
    mainBlock.insertAdjacentHTML('beforeend', `<p>Сумма вашего заказа: ${sumPrice}. Калорийность: ${sumCalories}`);
})