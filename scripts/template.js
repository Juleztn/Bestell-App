let deliveryOrLocation = document.getElementById('delivery-costs_location');
let categories = document.getElementById('categories');
let mealsContent = document.getElementById('meals');
let mealCategory = document.getElementById('meal-category');
let basketContent = document.getElementById('basket-content');
let minusTrash = document.getElementsByClassName('minus-trash');
let basketSubtotalTemplate = document.getElementById('basket-subtotal');
let basketTotalTemplate = document.getElementById('basket-total');
let orderBtn = document.getElementById('order-button');
let basketBtn = document.getElementById('basket-button-responsive');
let basketBtnContent = document.getElementsByClassName('basket-btn');
let basketDialog = document.getElementById('basket-dialog-responsive');
let basketDialogTitle = document.getElementById('basket-dialog-title');
let basketDialogContent = document.getElementById('basket-dialog-content');
let basketDialogSubtotal = document.getElementById('basket-dialog-subtotal');
let basketDialogTotal = document.getElementById('basket-dialog-total');
let screenWidth = window.matchMedia("(min-width: 1000px)");


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
    if (screenWidth.matches) {
        if (Object.keys(basket).length == 0) {
            basketContent.innerHTML = showEmptyBasket();
            basketSubtotalTemplate.innerHTML = "";
            basketTotalTemplate.innerHTML = "";
            orderBtn.innerHTML = "";
        } else {
            basketContent.innerHTML = "";
            for (let iBasket = 0; iBasket < basket.length; iBasket++) {
                basketContent.innerHTML += showBasketMeals(iBasket);
                basketSubtotalTemplate.innerHTML = showBasketSubtotal();
                basketTotalTemplate.innerHTML = showBasketTotal();
                orderBtn.innerHTML = `
                <button onclick="toggleOverlay(); orderMeals()" class="order-btn"><b>Bestellen (${changeBasketTotal()}€)</b></button>`;
            }
        }
    } else {
        if (Object.keys(basket).length == 0) {
            basketBtn.innerHTML = "";
        } else {
            basketBtn.innerHTML = `
            <button onclick="showBasketDialog()" class="basket-btn">Warenkorb ansehen</button>`;
            basketDialogTitle.innerHTML = `
                <div class="basket-responsive-title">
                    <h2>Warenkorb</h2>
                    <img onclick="closeBasketDialog()" src="./assets/icons/xmark-solid.svg">
                </div>
            `;
            basketDialogContent.innerHTML = "";
            for (let iBasket = 0; iBasket < basket.length; iBasket++) {
                basketDialogContent.innerHTML += `
                <div class="basket-meals">
                    <div class="basket-meal-info">
                        <b><p>${basket[iBasket].name}</p></b>
                        <div class="price-euro"><p class="price">${(basket[iBasket].price * amounts[iBasket]).toFixed(2)}</p><p>€</p></div>
                    </div>
                    <div class="basket-amount">
                        <div class="minus-trash" onclick="minusMealAmount(${iBasket})">
                            <img src="${amounts[iBasket] === 1 ? './assets/icons/trash-solid.svg' : './assets/icons/minus-solid.svg'}" alt="">
                        </div>
                        <p class="meal-amount">${amounts[iBasket]}</p>
                        <img onclick="plusMealAmount(${iBasket})" src="./assets/icons/plus-solid.svg" alt="Plus">
                    </div>
                </div>`;
            }
        }
    }
}

function renderBasketDialogTotal() {
    if (deliveryBtnResponsive.classList.contains("delivery")) {
        basketDialogSubtotal.innerHTML = `
            <div class="overall-costs">
                <div class="costs subtotal"><p>Zwischensumme</p><p>${changeBasketSubtotal()}€</p></div>
                <div class="costs"><p class="delivery-cost">Lieferkosten</p><p class="delivery-cost">1.99€</p></div>
            </div>`;
        basketDialogTotal.innerHTML = `
            <div>
                <hr>
                <div class="costs total"><p>Gesamt</p><p class="total-inner">${changeBasketTotal()}€</p></div>
            </div>`;
    } else {
        basketDialogSubtotal.innerHTML = `
            <div class="overall-costs">
                <div class="costs subtotal"><p>Zwischensumme</p><p>${changeBasketSubtotal()}€</p></div>
            </div>`;
        basketDialogTotal.innerHTML = `
            <div>
                <hr>
                <div class="costs total"><p>Gesamt</p><p class="total-inner">${changeBasketTotal()}€</p></div>
            </div>`;
    }
}

function showEmptyBasket() {
    return `
        <div class="basket-empty">
            <img class="basket-image" src="./assets/icons/basket.svg">
            <h2>Fülle deinen Warenkorb</h2>
            <p>Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen.</p>
        </div>
        `;
}

function showBasketMeals(iBasket) {
    return `
        <div class="basket-meals">
            <div class="basket-meal-info">
                <b><p>${basket[iBasket].name}</p></b>
                <div class="price-euro"><p class="price">${(basket[iBasket].price * amounts[iBasket]).toFixed(2)}</p><p>€</p></div>
            </div>
            <div class="basket-amount">
            <div class="minus-trash" onclick="minusMealAmount(${iBasket})"><img src="${amounts[iBasket] === 1 ? './assets/icons/trash-solid.svg' : './assets/icons/minus-solid.svg'}" alt=""></div>
                <p class="meal-amount">${amounts[iBasket]}</p>
                <img onclick="plusMealAmount(${iBasket})" src="./assets/icons/plus-solid.svg" alt="Plus">
            </div>
        </div>`;
}

function showBasketSubtotal() {
    if (deliveryBtn.classList.contains("delivery")) {
        return `
            <div class="overall-costs">
                <div class="costs subtotal"><p>Zwischensumme</p><p>${changeBasketSubtotal()}€</p></div>
                <div class="costs"><p class="delivery-cost">Lieferkosten</p><p class="delivery-cost">1.99€</p></div>
            </div>`;
    } else {
        return `
            <div class="overall-costs">
                <div class="costs subtotal"><p>Zwischensumme</p><p>${changeBasketSubtotal()}€</p></div>
            </div>`;
    }
}

function showBasketTotal() {
    return `
        <div>
            <hr>
            <div class="costs total"><p>Gesamt</p><p class="total-inner">${changeBasketTotal()}€</p></div>
        </div>`;
}