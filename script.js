let pickupBtn = document.getElementById('pickup');
let deliveryBtn = document.getElementById('delivery');
let bicycle = document.getElementById('bicycle-img');
let hand = document.getElementById('hand-img');
let mealAmount = document.getElementsByClassName('meal-amount');
let mealPrice = document.getElementsByClassName('price');
let basketSubtotal = document.getElementsByClassName('subtotal');
let basketTotal = document.getElementsByClassName('total-inner');
let deliveryCost = document.getElementsByClassName('delivery-cost');
let subtotalCalculated = 0;



function init() {
    getFromLocalStorage();
    renderDeliveryCosts();
    renderCategories();
    renderMeals();
    renderBasket();
    renderBasketSubtotal();
    renderBasketTotal();
}

function changeDeliveryBtn() {
    deliveryBtn.classList.add("delivery");
    pickupBtn.classList.remove("delivery");
    bicycle.src = "./assets/icons/bicycle-solid-orange.svg";
    hand.src = "./assets/icons/hand-holding-heart-solid.svg";
    renderDeliveryCosts();
    for (let i = 0; i < deliveryCost.length; i++) {
        deliveryCost[i].classList.remove("d_none");
    }
    renderBasketTotal();
}

function changePickupBtn() {
    pickupBtn.classList.add("delivery");
    deliveryBtn.classList.remove("delivery");
    bicycle.src = "./assets/icons/bicycle-solid.svg";
    hand.src = "./assets/icons/hand-holding-heart-solid-orange.svg";
    renderLocation();
    for (let i = 0; i < deliveryCost.length; i++) {
        deliveryCost[i].classList.add("d_none");
    }
    renderBasketTotal();
}

function moveToBasket(iCat, iMeals) {
    basket.push(meals.categories[iCat].items[iMeals]);
    saveToLocalStorage();
    renderBasket();
    renderBasketSubtotal();
    renderBasketTotal();
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
    let price = basket[iBasket].price;
    mealAmount[iBasket].innerHTML = amount + 1;
    mealPrice[iBasket].innerHTML = (price * (amount + 1)).toFixed(2);
    if (mealAmount[iBasket].innerHTML > 1) {
        minusTrash[iBasket].innerHTML = `<img src="./assets/icons/minus-solid.svg" alt="">`;
    }
    renderBasketSubtotal();
    renderBasketTotal();
}

function minusMealAmount(iBasket) {
    amount = parseInt(mealAmount[iBasket].innerHTML);
    price = basket[iBasket].price;
    mealAmount[iBasket].innerHTML = amount - 1;
    mealPrice[iBasket].innerHTML = (price * (amount - 1)).toFixed(2);
    if (mealAmount[iBasket].innerHTML == 1) {
        minusTrash[iBasket].innerHTML = `<img src="./assets/icons/trash-solid.svg" alt="">`;
    }
    if (mealAmount[iBasket].innerHTML == 0) {
        basket.splice(iBasket, 1);
        saveToLocalStorage();
        renderBasket();
    }
    renderBasketSubtotal();
    renderBasketTotal();
}

function changeBasketSubtotal() {
    subtotalCalculated = 0;
    for (let index = 0; index < mealPrice.length; index++) {
        subtotalCalculated += parseFloat(mealPrice[index].innerHTML);
    }
    return subtotalCalculated.toFixed(2);
}

function showBasketTotal() {
    for (let i = 0; i < deliveryCost.length; i++) {
        if (deliveryCost[i].classList.contains("d_none")) {
            return subtotalCalculated.toFixed(2);
        } else {
            return (subtotalCalculated + 1.99).toFixed(2);
        }
    }
}