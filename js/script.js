var app = new Vue({
    el: '#root',
    data: {
        URL: `https://www.thecocktaildb.com/api/json/v1/1/`,
        drinks: [],
        ingredientsList: [],
        typesList: [],
        selectedType: '',
        searchInput: '',
        typedIngredient: '',
        selectedIngredient: '',
        ingredientsListFiltered: []
    },
    mounted() {
        axios.get(`${this.URL}list.php?`, {
            params: {
                'i' : 'list'
            }
        }).then(response => {
            this.ingredientsList = response.data.drinks
            this.ingredientsListFiltered = this.ingredientsList
        }),
        axios.get(`${this.URL}list.php?`, {
            params: {
                'c' : 'list'
            }
        }).then(response => {
            this.typesList = response.data.drinks
        })
    },
    methods: {
        flipCard(drink) {
            this.drinks.forEach(singleDrink => {
                if (singleDrink.idDrink != drink.idDrink) {
                    singleDrink.boolean = true
                } else {
                    drink.boolean = !drink.boolean
                }
            })
        },
        searchByName() {
            axios.get(`${this.URL}search.php?`, {
                params: {
                    's' : this.searchInput
                }
            }).then(response => {
                this.drinks = response.data.drinks
                this.drinks.forEach(drink => {
                    this.$set(drink, 'boolean', true)
                    this.$set(drink, 'visibility', true)
                    this.$set(drink, 'ingredients', [])
                    for (const key in drink) {
                        if (key.includes('strIngredient') && drink[key] != null) {
                            drink.ingredients.push(drink[key])
                        }
                    }
                });
            })
        },
        filterIngredients() {
            if (this.typedIngredient.length != 0) {
                this.ingredientsListFiltered = this.ingredientsList.filter(ingredient => {
                    return ingredient.strIngredient1.toUpperCase().includes(this.typedIngredient.toUpperCase())
                })
            } else {
                this.ingredientsListFiltered = this.ingredientsList
            }
        },
        selectSearch() {
            console.log(this.drinks);
            if (this.selectedType === 'all' && this.selectedIngredient !== 'all') {
                if (this.selectedIngredient != '') {
                    this.drinks.forEach(drink => {
                        drink.visibility = false;
                        drink.ingredients.forEach(ingredient => {
                            if (ingredient == this.selectedIngredient) {
                                drink.visibility = true;
                            }
                        })
                    })
                } else {
                    this.drinks.forEach(drink => {
                        drink.visibility = true;
                    })
                }
            } else if (this.selectedType === 'all' && this.selectedIngredient === 'all') {
                this.drinks.forEach(drink => {
                    drink.visibility = true;
                })
            } else if (this.selectedType !== 'all' && this.selectedIngredient === 'all') {
                if (this.selectedType != '') {
                    this.drinks.forEach(drink => {
                        if (drink.strCategory == this.selectedType) {
                            drink.visibility = true;
                        }
                    })
                } else {
                    this.drinks.forEach(drink => {
                        drink.visibility = true;
                    })
                }
            } else if (this.selectedType !== 'all' && this.selectedIngredient !== 'all') {
                if (this.selectedType == '') {
                    this.drinks.forEach(drink => {
                        drink.ingredients.forEach(ingredient => {
                            if (ingredient == this.selectedIngredient) {
                                drink.visibility = true;
                            }
                        })
                    })
                } else if (this.selectedIngredient == '') {
                    this.drinks.forEach(drink => {
                        if (drink.strCategory == this.selectedType) {
                            drink.visibility = true;
                        }
                    })
                } else {
                    this.drinks.forEach(drink => {
                        if (drink.strCategory == this.selectedType) {
                            drink.ingredients.forEach(ingredient => {
                                if (ingredient == this.selectedIngredient) {
                                    drink.visibility = true
                                }
                            })
                        }
                    })
                }  
            }
        }
    }
})