const searchBtn = document.getElementById('searchBtn');
const foodItems = document.getElementById('foods');
const foodDetails = document.querySelector('.foodDetails')
const closeBtn    = document.getElementById('closeBtn');

//  show And Remove Food List
closeBtn.addEventListener('click', () => {
    foodDetails.parentElement.classList.remove('showAndRemoveFoodList')
})



//  GET FOOD ITEM FROM DATABASE
searchBtn.addEventListener('click', function(){
    let foodInput = document.getElementById('foodInput').value.trim();
    // console.log(foodInput.length);
    if(foodInput.length > 1){
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${foodInput}`)
        .then(response => response.json())
        .then(data => getFoodItem(data))
    }
    if(foodInput.length == 1){
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${foodInput}`)
        .then(response => response.json())
        .then(data => getFoodItem(data))
    }
})
function getFoodItem(data){
    let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html = html + `
                    <div class = "food-item" data-id = "${meal.idMeal}">
                        <div class="food-img">
                            <img class="foodDesc" src="${meal.strMealThumb}" />
                        </div>
                        <div class="food-name">
                            <h2>${meal.strMeal}</h2>
                        </div>
                    </div>
                `;
            });
        }else{
            html = html + `</h1>Sorry, we didn't find any meal</h1>`;
        }
        foodItems.innerHTML = html;
}




//  GET FOOD Description 
foodItems.addEventListener('click', function(event){
    if(event.target.classList.contains('foodDesc')){
        let foodItem = event.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodItem.dataset.id}`)
        .then(response => response.json())
        .then(data => getFoodDescription(data.meals));
    }
})
function getFoodDescription(food){
    food = food[0];
    // console.log(food);
    let html = `
    <div class="foodDetails">
        <div class="food-img">
            <img id="foodBtn" src="${food.strMealThumb}" alt="">
        </div>
        <div class="food-name">
            <h2>${food.strMeal}</h2>
        </div>
        <div class="ingredients">
            <h4>Ingredients</h4>
            <div class="ingredientsList">
                <ul>
                    <li> <img src="images/ok.png" alt="">${food.strIngredient1}</li>
                    <li> <img src="images/ok.png" alt="">${food.strIngredient2}</li>
                    <li> <img src="images/ok.png" alt="">${food.strIngredient3}</li>
                    <li> <img src="images/ok.png" alt="">${food.strIngredient4}</li>
                    <li> <img src="images/ok.png" alt="">${food.strIngredient5}</li>
                    <li> <img src="images/ok.png" alt="">${food.strIngredient6}</li>
                    <li> <img src="images/ok.png" alt="">${food.strIngredient7}</li>
                </ul>
            </div>
        </div>
    </div>
    `;
    foodDetails.innerHTML = html;
    foodDetails.parentElement.classList.add('showAndRemoveFoodList')
}
