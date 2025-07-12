let deliveryOrLocation = document.getElementById('delivery-costs_location');
let categories = document.getElementById('categories');
let mealsContent = document.getElementById('meals');

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
            <p>${meals.categories[iCat].name}</p>
        `;
    }
}

function renderMeals() {
    for (let iCat = 0; iCat < meals.categories.length; iCat++) {
        for (let iMeals = 0; iMeals < meals.categories[iCat].items.length; iMeals++) {
            let item = meals.categories[iCat].items[iMeals];
            mealsContent.innerHTML += `
                <div class="meals">
                    <div class="meal-info">
                        <h3>${item.name}</h3>
                        <p>${item.price}</p>
                        <p class="description">${item.description || ""}</p>
                    </div>
                    <div class="image-plus">
                        <img class="meal-img" src="${item.image || ""}">
                        <img class="plus" src="./assets/icons/plus-solid-orange.svg" alt="">
                    </div>
                </div>
            `;

        }

    }
}