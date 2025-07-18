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

function showDeliveryCosts() {
    return `
        <img src="./assets/icons/bicycle-solid.svg">
        <span>1,99€</span>
    `;
}

function showLocation() {
    return `
        <img src="./assets/icons/location-dot-solid.svg">
        <span>Musterstraße 12</span>
    `;
}

function showCategories(iCat) {
    return `
        <p><a href="#cat${iCat}">${meals.categories[iCat].name}</a></p>
    `;
}

function showMealCategoriesImg(iCat) {
    return `
        <div class="meal-category">
            <img id="cat${iCat}" src="${meals.categories[iCat].image}" alt="">
            <h2>${meals.categories[iCat].name}</h2>
        </div>`;
}

function showMealsContent(item, iCat, iMeals) {
    return `
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

function renderMealImage(iCat, iMeals) {
    if (meals.categories[iCat].items[iMeals].image != null) {
        return `<img src="${meals.categories[iCat].items[iMeals].image}">`;
    } else {
        return "";
    }
}

function showOrderBtn() {
    return `
        <button onclick="toggleOverlay(); orderMeals()" class="order-btn"><b>Bestellen (${changeBasketTotal()}€)</b></button>
        `;
}

function showBasketBtnResponsive() {
    return `
        <button onclick="showBasketDialog()" class="basket-btn">
        <div>Warenkorb ansehen</div>
        <div class="basket-btn-amount">${showBasketBtnMealAmounts()}</div>
        </button>
    `;
}

function showOrderBtnResponsive() {
    return `
        <button onclick="orderMealsFromDialog(); toggleOverlay()" class="basket-btn">Bestellen ${changeBasketTotal()} €</button>`;
}

function showBasketDialogTitle() {
    return `
        <div class="basket-responsive-title">
            <h2>Warenkorb</h2>
            <img onclick="closeBasketDialog()" src="./assets/icons/xmark-solid.svg">
        </div>
    `;
}

function showBasketDialogContent(iBasket) {
    return `
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

function showBasketDialogSubtotalDelivery() {
    return `
        <div class="overall-costs">
            <div class="costs subtotal"><p>Zwischensumme</p><p>${changeBasketSubtotal()}€</p></div>
            <div class="costs"><p class="delivery-cost">Lieferkosten</p><p class="delivery-cost">1.99€</p></div>
        </div>
    `;
}

function showBasketDialogTotalDelivery() {
    return `
        <div>
            <hr>
            <div class="costs total"><p>Gesamt</p><p class="total-inner">${changeBasketTotal()}€</p></div>
        </div>
    `;
}

function showBasketDialogSubtotalPickup() {
    return `
        <div class="overall-costs">
            <div class="costs subtotal"><p>Zwischensumme</p><p>${changeBasketSubtotal()}€</p></div>
        </div>
    `;
}

function showBasketDialogTotalPickup() {
    return `
        <div>
            <hr>
            <div class="costs total"><p>Gesamt</p><p class="total-inner">${changeBasketTotal()}€</p></div>
        </div>
    `;
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

function trashImage() {
    return `<img src="./assets/icons/trash-solid.svg" alt="">`;
}

function minusImage() {
    return `<img src="./assets/icons/minus-solid.svg" alt="">`;
}