const loadAllMeals = () => {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
        .then((res) => res.json())
        .then((data) => {
            displayMeals(data.meals);
        })
};
const displayMeals = (meals) => {
    const productContainer = document.getElementById("product-container");
    productContainer.innerHTML = "";  

    meals.forEach((meal) => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.onclick = () => showMealDetails(meal.idMeal);
        div.innerHTML = `
            <img class="card-img" src=${meal.strMealThumb} alt="" />
            <h5>${meal.strMeal}</h5>
            <p>Category: ${meal.strCategory}</p>
        `;
        productContainer.appendChild(div);
    });
};
const searchMeal = (event) => {
    event.preventDefault();
    const query = document.getElementById("search-input").value.toLowerCase();
    console.log('Searching for meal:', query);

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
        .then((res) => res.json())
        .then((data) => {
            if (data.meals) {
                console.log('Search results:', data.meals);
                displayMeals(data.meals);
            } else {
                console.log('No meals found for query:', query);
                document.getElementById("product-container").innerHTML = "<p>Meal not found.</p>";
            }
        })
};
const showMealDetails = (id) => {
    console.log('Showing details for meal ID:', id);

    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((res) => res.json())
        .then((data) => {
            const meal = data.meals[0];
            document.getElementById("modalMealImg").src = meal.strMealThumb;
            document.getElementById("modalMealName").innerText = meal.strMeal;
            document.getElementById("modalMealCategory").innerText = meal.strCategory;
            document.getElementById("modalMealArea").innerText = meal.strArea;

            const ingredientsList = document.getElementById("modalMealIngredients");
            ingredientsList.innerHTML = ""; 
            for (let i = 1; i <= 20; i++) {
                const ingredient = meal[`strIngredient${i}`];
                const measure = meal[`strMeasure${i}`];
                if (ingredient) {
                    const li = document.createElement("li");
                    li.innerText = `${ingredient} - ${measure}`;
                    ingredientsList.appendChild(li);
                }
            }
            const mealModal = new bootstrap.Modal(document.getElementById('mealModal'));
            mealModal.show();
        });
};
loadAllMeals();