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
    renderBasketDialogTotal();
    updateMealElements();
    applyLocalStorageValue();
}

function renderDeliveryCosts() {
    deliveryOrLocation.innerHTML = showDeliveryCosts();
}

function renderLocation() {
    deliveryOrLocation.innerHTML = showLocation();
}

function renderCategories() {
    for (let iCat = 0; iCat < meals.categories.length; iCat++) {
        categories.innerHTML += showCategories(iCat);
    }
}

function renderMeals() {
    for (let iCat = 0; iCat < meals.categories.length; iCat++) {
        mealsContent.innerHTML += showMealCategoriesImg(iCat);
        for (let iMeals = 0; iMeals < meals.categories[iCat].items.length; iMeals++) {
            let item = meals.categories[iCat].items[iMeals];
            mealsContent.innerHTML += showMealsContent(item, iCat, iMeals);
        }
    }
}

function renderBasket() {
    if (screenWidth.matches) {
        if (Object.keys(basket).length == 0) {
            emptyBasket();
        } else {
            showBasketContent();
        }
    } else {
        if (Object.keys(basket).length == 0) {
            basketBtn.innerHTML = "";
        } else {
            basketDialogContentShow();
        }
    }
}

function emptyBasket() {
    basketContent.innerHTML = showEmptyBasket();
    basketSubtotalTemplate.innerHTML = "";
    basketTotalTemplate.innerHTML = "";
    orderBtn.innerHTML = "";
}

function showBasketContent() {
    basketContent.innerHTML = "";
    for (let iBasket = 0; iBasket < basket.length; iBasket++) {
        basketContent.innerHTML += showBasketMeals(iBasket);
        basketSubtotalTemplate.innerHTML = showBasketSubtotal();
        basketTotalTemplate.innerHTML = showBasketTotal();
        orderBtn.innerHTML = showOrderBtn();
    }
}

function basketDialogContentShow() {
    basketBtn.innerHTML = showBasketBtnResponsive();
    basketDialogTitle.innerHTML = showBasketDialogTitle();
    basketDialogContent.innerHTML = "";
    for (let iBasket = 0; iBasket < basket.length; iBasket++) {
        basketDialogContent.innerHTML += showBasketDialogContent(iBasket);
    }
}

function showBasketBtnMealAmounts() {
    let allAmounts = 0;
    for (let iAmount = 0; iAmount < amounts.length; iAmount++) {
        allAmounts += amounts[iAmount];
    }
    return allAmounts;
}

function renderBasketDialogTotal() {
    if (deliveryBtnResponsive.classList.contains("delivery")) {
        basketDialogSubtotal.innerHTML = showBasketDialogSubtotalDelivery();
        basketDialogTotal.innerHTML = showBasketDialogTotalDelivery();
    } else {
        basketDialogSubtotal.innerHTML = showBasketDialogSubtotalPickup();
        basketDialogTotal.innerHTML = showBasketDialogTotalPickup();
    }
}

function changeDeliveryBtn() {
    deliveryBtn.classList.add("delivery");
    pickupBtn.classList.remove("delivery");
    bicycle.src = "./assets/icons/bicycle-solid-orange.svg";
    hand.src = "./assets/icons/hand-holding-heart-solid.svg";
    renderDeliveryCosts();
    if (basket.length > 0 && screenWidth.matches) {
        basketSubtotalTemplate.innerHTML = showBasketSubtotal();
        basketTotalTemplate.innerHTML = showBasketTotal();
        orderBtn.innerHTML = showOrderBtn();
    }
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
    if (basket.length > 0 && screenWidth.matches) {
        basketSubtotalTemplate.innerHTML = showBasketSubtotal();
        basketTotalTemplate.innerHTML = showBasketTotal();
        orderBtn.innerHTML = showOrderBtn();
    }
}

function changeDeliveryBtnResponsive() {
    deliveryBtnResponsive.classList.add("delivery");
    pickupBtnResponsive.classList.remove("delivery");
    bicycleResponsive.src = "./assets/icons/bicycle-solid-orange.svg";
    handResponsive.src = "./assets/icons/hand-holding-heart-solid.svg";
    renderDeliveryCosts();
    for (let i = 0; i < deliveryCost.length; i++) {
        deliveryCost[i].classList.remove("d_none");
    }
    changeBasketTotal();
}

function changePickupBtnResponsive() {
    pickupBtnResponsive.classList.add("delivery");
    deliveryBtnResponsive.classList.remove("delivery");
    bicycleResponsive.src = "./assets/icons/bicycle-solid.svg";
    handResponsive.src = "./assets/icons/hand-holding-heart-solid-orange.svg";
    renderLocation();
    for (let i = 0; i < deliveryCost.length; i++) {
        deliveryCost[i].classList.add("d_none");
    }
    changeBasketTotal();
}

function moveToBasket(iCat, iMeals) {
    let itemToAdd = meals.categories[iCat].items[iMeals];
    for (let iBasket = 0; iBasket < basket.length; iBasket++) {
        if (basket[iBasket].name === itemToAdd.name) {
            plusMealAmount(iBasket);
            if (!screenWidth.matches) {
                basketBtn.innerHTML = showBasketBtnResponsive();
            }
            return;
        }
    }
    pushAndRenderBasket(itemToAdd);
}

function pushAndRenderBasket(itemToAdd) {
    basket.push(itemToAdd);
    amounts.push(1);
    renderBasket();
    renderBasketDialogTotal();
    updateMealElements();
    mealAmount[basket.length - 1].innerHTML = amounts[basket.length - 1];
    mealPrice[basket.length - 1].innerHTML = itemToAdd.price.toFixed(2);
    minusTrash[basket.length - 1].innerHTML = trashImage();
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
        minusTrash[iBasket].innerHTML = minusImage();
    }
    if (!screenWidth.matches) {
        renderBasketDialogTotal();
    }
    basketSubtotalTemplate.innerHTML = showBasketSubtotal();
    basketTotalTemplate.innerHTML = showBasketTotal();
    orderBtn.innerHTML = showOrderBtn();
    saveToLocalStorage();
}

function minusMealAmount(iBasket) {
    amounts[iBasket]--;
    let price = basket[iBasket].price;
    mealAmount[iBasket].innerHTML = amounts[iBasket];
    mealPrice[iBasket].innerHTML = (price * amounts[iBasket]).toFixed(2);
    if (amounts[iBasket] == 1) {
        minusTrash[iBasket].innerHTML = trashImage();
    }
    if (amounts[iBasket] == 0) {
        basket.splice(iBasket, 1);
        amounts.splice(iBasket, 1);
        updateMealElements();
        if (basket.length == 0) {
            closeBasketDialog();
        }
        renderBasket();
    }
    basketRenderScreen();
    saveToLocalStorage();
}

function basketTotalAndOrderBtn() {
    basketSubtotalTemplate.innerHTML = showBasketSubtotal();
    basketTotalTemplate.innerHTML = showBasketTotal();
    orderBtn.innerHTML = showOrderBtn();
}

function basketRenderScreen() {
    if (basket.length > 0 && screenWidth.matches) {
        basketTotalAndOrderBtn();
    }
    if (!screenWidth.matches && basket.length > 0) {
        renderBasketDialogTotal();
        showBasketDialog();
    }
}

function changeBasketSubtotal() {
    updateMealElements();
    subtotalCalculated = 0;
    for (let index = 0; index < mealPrice.length; index++) {
        subtotalCalculated += parseFloat(mealPrice[index].innerHTML);
    }
    return subtotalCalculated.toFixed(2);
}

function changeBasketTotal() {
    if (screenWidth.matches) {
        if (deliveryBtn.classList.contains("delivery")) {
            return (subtotalCalculated + 1.99).toFixed(2);
        } else {
            return subtotalCalculated.toFixed(2);
        }
    } else {
        if (deliveryBtnResponsive.classList.contains("delivery")) {
            return (subtotalCalculated + 1.99).toFixed(2);
        } else {
            return subtotalCalculated.toFixed(2);
        }
    }
}

function orderMeals() {
    basketSplice();
    orderDialog.show();
}

function orderMealsFromDialog() {
    basketSplice();
    basketDialog.close();
    orderDialog.show();
}

function basketSplice() {
    basket.length = 0;
    amounts.length = 0;
    saveToLocalStorage();
    renderBasket();
}

function showBasketDialog() {
    basketDialog.show();
    basketBtn.innerHTML = showOrderBtnResponsive();
}

function closeDialog() {
    orderDialog.close();
}

function closeBasketDialog() {
    basketDialog.close();
    basketBtn.innerHTML = showBasketBtnResponsive();
}

function toggleOverlay() {
    overlay.classList.toggle('d_none');
}

function updateMealElements() {
    mealAmount = document.getElementsByClassName('meal-amount');
    mealPrice = document.getElementsByClassName('price');
    minusTrash = document.getElementsByClassName('minus-trash');
}

screenWidth.addEventListener("change", function () {
    document.location.reload();
});