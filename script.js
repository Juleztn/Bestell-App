let pickupBtn = document.getElementById('pickup');
let deliveryBtn = document.getElementById('delivery');
let bicycle = document.getElementById('bicycle-img');
let hand = document.getElementById('hand-img');

function init() {
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