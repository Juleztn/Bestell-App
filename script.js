let pickupBtn = document.getElementById('pickup');
let deliveryBtn = document.getElementById('delivery');
let bicycle = document.getElementById('bicycle-img');
let hand = document.getElementById('hand-img');
let mealAmount = document.getElementsByClassName('meal-amount');


function init() {
    getFromLocalStorage();
    renderDeliveryCosts();
    renderCategories();
    renderMeals();
    renderBasket();
}

function changeDeliveryBtn() {
    deliveryBtn.classList.add("delivery");
    pickupBtn.classList.remove("delivery");
    bicycle.src = "./assets/icons/bicycle-solid-orange.svg";
    hand.src = "./assets/icons/hand-holding-heart-solid.svg";
    renderDeliveryCosts();
}

function changePickupBtn() {
    pickupBtn.classList.add("delivery");
    deliveryBtn.classList.remove("delivery");
    bicycle.src = "./assets/icons/bicycle-solid.svg";
    hand.src = "./assets/icons/hand-holding-heart-solid-orange.svg";
    renderLocation();
}

function moveToBasket(iCat, iMeals) {
    basket.push(meals.categories[iCat].items[iMeals]);
    saveToLocalStorage();
    renderBasket();
}

function saveToLocalStorage() {
    localStorage.setItem("basket", JSON.stringify(basket));
}

function getFromLocalStorage() {
    let myArr = JSON.parse(localStorage.getItem("basket"));

    if (myArr != null) {
        basket = myArr;
    }
}

function plusMealAmount(iBasket) {
    let amount = parseInt(mealAmount[iBasket].innerHTML);
    mealAmount[iBasket].innerHTML = amount + 1;
    if (mealAmount[iBasket].innerHTML > 1) {
        minusTrash[iBasket].innerHTML = `<img src="./assets/icons/minus-solid.svg" alt="">`;
    }
}

function minusMealAmount(iBasket) {
    amount = parseInt(mealAmount[iBasket].innerHTML);
    mealAmount[iBasket].innerHTML = amount - 1;
    if (mealAmount[iBasket].innerHTML == 1) {
        minusTrash[iBasket].innerHTML = `<img src="./assets/icons/trash-solid.svg" alt="">`;
    }
}