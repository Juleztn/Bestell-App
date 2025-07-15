let deliveryOrLocation = document.getElementById('delivery-costs_location');
let categories = document.getElementById('categories');
let mealsContent = document.getElementById('meals');
let mealCategory = document.getElementById('meal-category');
let basketContent = document.getElementById('basket-content');
let minusTrash = document.getElementsByClassName('minus-trash');
let basketSubtotalTemplate = document.getElementById('basket-subtotal');
let basketTotalTemplate = document.getElementById('basket-total');


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
                <div onclick="moveToBasket(${iCat}, ${iMeals})" class="meals">
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
    getFromLocalStorage();
    if (Object.keys(basket).length == 0) {
        basketContent.innerHTML = `
            <div class="basket-empty">
                <img class="basket-image" src="./assets/icons/basket.svg">
                <h2>Fülle deinen Warenkorb</h2>
                <p>Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen.</p>
            </div>
        `;
    } else {
        basketContent.innerHTML = "";
        for (let iBasket = 0; iBasket < basket.length; iBasket++) {
            basketContent.innerHTML += `
            <div class="basket-meals">
                <div class="basket-meal-info">
                    <b><p>${basket[iBasket].name}</p></b>
                    <div class="price-euro"><p class="price">${basket[iBasket].price.toFixed(2)}</p><p>€</p></div>
                </div>
                <div class="basket-amount">
                <div class="minus-trash" onclick="minusMealAmount(${iBasket})"><img src="./assets/icons/trash-solid.svg" alt=""></div>
                    <p class="meal-amount">1</p>
                    <img onclick="plusMealAmount(${iBasket})" src="./assets/icons/plus-solid.svg" alt="Plus">
                </div>
            </div>`;
        }
    }
}

function renderBasketSubtotal() {
    if (Object.keys(basket).length == 0) {
        basketSubtotalTemplate.innerHTML = "";
    } else {
        basketSubtotalTemplate.innerHTML = `
            <div class="overall-costs">
                <div class="costs subtotal"><p>Zwischensumme</p><p>${changeBasketSubtotal()}€</p></div>
                <div class="costs"><p class="delivery-cost">Lieferkosten</p><p class="delivery-cost">1.99€</p></div>
            </div>
        `;
    }
}

function renderBasketTotal() {
    if (Object.keys(basket).length == 0) {
        basketTotalTemplate.innerHTML = "";
    } else {
        basketTotalTemplate.innerHTML = `
            <div>
                <hr>
                <div class="costs total"><p>Gesamt</p><p class="total-inner">${showBasketTotal()}€</p></div>
            </div>
        `;
    }
}
