let pickupBtn = document.getElementById('pickup');
let deliveryBtn = document.getElementById('delivery');
let pickupBtnResponsive = document.getElementById('pickup-responsive');
let deliveryBtnResponsive = document.getElementById('delivery-responsive');
let bicycle = document.getElementById('bicycle-img');
let hand = document.getElementById('hand-img');
let bicycleResponsive = document.getElementById('bicycle-img-responsive');
let handResponsive = document.getElementById('hand-img-responsive');
let mealAmount = document.getElementsByClassName('meal-amount');
let mealPrice = document.getElementsByClassName('price');
let basketSubtotal = document.getElementsByClassName('subtotal');
let basketTotal = document.getElementsByClassName('total-inner');
let deliveryCost = document.getElementsByClassName('delivery-cost');
let subtotalCalculated = 0;
let overlay = document.getElementById('overlay');
let orderDialog = document.getElementById('successfully-ordered');


function init() {
    renderDeliveryCosts();
    renderCategories();
    renderMeals();
    getFromLocalStorage();
    renderBasket();
    updateMealElements();
    applyLocalStorageValue();
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
    changeBasketTotal();
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
    changeBasketTotal();
}

function changeDeliveryBtnResponsive() {
    deliveryBtnResponsive.classList.add("delivery");
    pickupBtnResponsive.classList.remove("delivery");
    bicycleResponsive.src = "./assets/icons/bicycle-solid-orange.svg";
    handResponsive.src = "./assets/icons/hand-holding-heart-solid.svg";
    renderDeliveryCosts();
}

function changePickupBtnResponsive() {
    pickupBtnResponsive.classList.add("delivery");
    deliveryBtnResponsive.classList.remove("delivery");
    bicycleResponsive.src = "./assets/icons/bicycle-solid.svg";
    handResponsive.src = "./assets/icons/hand-holding-heart-solid-orange.svg";
    renderLocation();
}

function moveToBasket(iCat, iMeals) {
    let itemToAdd = meals.categories[iCat].items[iMeals];
    for (let iBasket = 0; iBasket < basket.length; iBasket++) {
        if (basket[iBasket].name === itemToAdd.name) {
            plusMealAmount(iBasket);
            return;
        }
    }
    basket.push(itemToAdd);
    amounts.push(1);
    renderBasket();
    updateMealElements();
    mealAmount[basket.length - 1].innerHTML = amounts[basket.length - 1];
    mealPrice[basket.length - 1].innerHTML = itemToAdd.price.toFixed(2);
    minusTrash[basket.length - 1].innerHTML = `<img src="./assets/icons/trash-solid.svg" alt="">`;
    saveToLocalStorage();
}

function saveToLocalStorage() {
    localStorage.setItem("basket", JSON.stringify(basket));
    localStorage.setItem("amounts", JSON.stringify(amounts));
    for (let index = 0; index < basket.length; index++) {
        localStorage.setItem(`minusOrTrash${index + 1}`, minusTrash[index].innerHTML);
    }
}

function getFromLocalStorage() {
    let myArr = JSON.parse(localStorage.getItem("basket"));
    let myAmounts = JSON.parse(localStorage.getItem("amounts"));
    if (myArr != null) {
        basket = myArr;
        amounts = myAmounts || new Array(basket.length).fill(1);
    }
}

function applyLocalStorageValue() {
    if (basket.length > 0) {
        for (let index = 0; index < basket.length; index++) {
            let minusOrTrash = localStorage.getItem(`minusOrTrash${index + 1}`);
            if (minusOrTrash != null && minusTrash[index]) {
                minusTrash[index].innerHTML = minusOrTrash;
            }
        }
    }
}

function plusMealAmount(iBasket) {
    amounts[iBasket]++;
    let price = basket[iBasket].price;
    mealAmount[iBasket].innerHTML = amounts[iBasket];
    mealPrice[iBasket].innerHTML = (price * amounts[iBasket]).toFixed(2);
    if (amounts[iBasket] > 1) {
        minusTrash[iBasket].innerHTML = `<img src="./assets/icons/minus-solid.svg" alt="">`;
    }
    renderBasket();
    changeBasketTotal();
    saveToLocalStorage();
}

function minusMealAmount(iBasket) {
    amounts[iBasket]--;
    let price = basket[iBasket].price;
    mealAmount[iBasket].innerHTML = amounts[iBasket];
    mealPrice[iBasket].innerHTML = (price * amounts[iBasket]).toFixed(2);
    if (amounts[iBasket] == 1) {
        minusTrash[iBasket].innerHTML = `<img src="./assets/icons/trash-solid.svg" alt="">`;
    }
    if (amounts[iBasket] == 0) {
        basket.splice(iBasket, 1);
        amounts.splice(iBasket, 1);
        updateMealElements();
    }
    renderBasket();
    saveToLocalStorage();
}

function changeBasketSubtotal() {
    subtotalCalculated = 0;
    for (let index = 0; index < mealPrice.length; index++) {
        subtotalCalculated += parseFloat(mealPrice[index].innerHTML);
    }
    return subtotalCalculated.toFixed(2);
}

function changeBasketTotal() {
    for (let i = 0; i < deliveryCost.length; i++) {
        if (deliveryCost[i].classList.contains("d_none")) {
            return subtotalCalculated.toFixed(2);
        } else {
            return (subtotalCalculated + 1.99).toFixed(2);
        }
    }
}

function orderMeals() {
    basket.length = 0;
    amounts.length = 0;
    saveToLocalStorage();
    renderBasket();
    renderBasketTotal();
    orderDialog.show();
}

function closeDialog() {
    orderDialog.close();
}

function toggleOverlay() {
    overlay.classList.toggle('d_none');
}

function updateMealElements() {
    mealAmount = document.getElementsByClassName('meal-amount');
    mealPrice = document.getElementsByClassName('price');
    minusTrash = document.getElementsByClassName('minus-trash');
}

screenWidth.addEventListener("change", function(){
    document.location.reload();
});