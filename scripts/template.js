let deliveryOrLocation = document.getElementById('delivery-costs_location');
let categories = document.getElementById('categories');
let mealsContent = document.getElementById('meals');
let mealCategory = document.getElementById('meal-category');
let basketContent = document.getElementById('basket-content');

function renderDeliveryCosts() {
    deliveryOrLocation.innerHTML = `
        <img src="./assets/icons/bicycle-solid.svg">
        <span>1,99€</span>
    `;
}

function renderLocation() {
    deliveryOrLocation.innerHTML = `
        <img src="./assets/icons/location-dot-solid.svg">
        <span>Musterstraße 12</span>
    `;
}

function renderCategories() {
    for (let iCat = 0; iCat < meals.categories.length; iCat++) {
        categories.innerHTML += `
            <p><a href="#cat${iCat}">${meals.categories[iCat].name}</a></p>
        `;
    }
}

function renderMeals() {
    for (let iCat = 0; iCat < meals.categories.length; iCat++) {
        mealsContent.innerHTML += `
                <div class="meal-category">
                    <img id="cat${iCat}" src="${meals.categories[iCat].image}" alt="">
                    <h2>${meals.categories[iCat].name}</h2>
                </div>`;
        for (let iMeals = 0; iMeals < meals.categories[iCat].items.length; iMeals++) {
            let item = meals.categories[iCat].items[iMeals];
            mealsContent.innerHTML += `
                <div class="meals">
                    <div class="meal-info">
                        <h3>${item.name}</h3>
                        <p>${item.price.toFixed(2)} €</p>
                        <p class="description">${item.description || ""}</p>
                    </div>
                    <div class="image-plus">
                        ${renderMealImage(iCat, iMeals)}
                        <img class="plus" src="./assets/icons/plus-solid-orange.svg" alt="">
                    </div>
                </div>
            `;
        }
    }
}

function renderMealImage(iCat, iMeals) {
    if (meals.categories[iCat].items[iMeals].image != null) {
        return `<img src="${meals.categories[iCat].items[iMeals].image}">`;
    } else {
        return "";
    }
}

function renderBasket() {
    if (basket.length == null) {
        basketContent.innerHTML = `
            <img src="./assets/icons/basket.svg">
            <h2>Fülle deinen Warenkorb</h2>
            <p>Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen.</p>
        `;
    }
}