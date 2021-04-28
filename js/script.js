var app = new Vue({
    el: '#root',
    data: {
        drinks: [],
        ingridients: [],
    },
    methods: {
        flipCard(drink) {
            if (drink.strIngredient15 === null) {
                drink.strIngredient15 = false
            } else {
                drink.strIngredient15 = null
            }
            this.drinks.forEach(el =>{
                if (el.strDrink != drink.strDrink) {
                    el.strIngredient15 = null
                }
            })
        },
        visibility(drink) {
            if (drink.strIngredient15 === null) {
                return true
            } else {
                return false
            }
        }
    },
    mounted(){
        axios.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=').then(response => {
            this.drinks = response.data.drinks
            this.drinks.forEach(drink=>{
                console.log(drink.strIngredient15);
            })
        })
    },
    beforeUpdate(){
        this.drinks.forEach(drink => {
            let ingredients = []
            for (const key in drink) {
                if (key.includes('strIngredient')) {
                    if (drink[key] != null) {
                        ingredients.push(drink[key])
                    }
                }
            }
            drink.ingredients = ingredients
            let measure = []
            for (const key in drink) {
                if (key.includes('strMeasure')) {
                    if (drink[key] != null) {
                        measure.push(drink[key])
                    }
                }
            }
            drink.measure = measure
        });
    }
})



