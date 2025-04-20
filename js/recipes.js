// Load Recipes from JSON File
async function loadRecipes() {
    try {
        const response = await fetch('recipes_categorized.json');
        const recipes = await response.json();
        return recipes;
    } catch (error) {
        console.error('Error loading recipes:', error);
        return [];
    }
}

// Search and Display Recipes (No Categories)
async function searchRecipes() {
    const recipes = await loadRecipes();
    const searchValue = document.getElementById('searchBar').value.toLowerCase().trim();
    const resultsContainer = document.getElementById('recipeResults');

    resultsContainer.innerHTML = ''; // Clear previous results

    const filtered = recipes.filter(r => r.name.toLowerCase().includes(searchValue));

    if (filtered.length === 0) {
        resultsContainer.innerHTML = `<p>No recipes found for "<strong>${searchValue}</strong>"</p>`;
        return;
    }

    const grid = document.createElement('div');
    grid.classList.add('recipe-grid');

    filtered.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-item');

        recipeCard.innerHTML = `
            <div class="recipe-content">
                <img src="${recipe.image}" alt="${recipe.name}">
                <h3>${recipe.name}</h3>
                <p>${recipe.description}</p>
                <div class="recipe-ingredients">
                    <strong>Ingredients:</strong>
                    <ul>
                        ${recipe.ingredients.map(i => `<li>${i}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;

        if (recipe.anchor && recipe.anchor !== "") {
            const link = document.createElement("a");
            link.href = `starting.html#${recipe.anchor}`;
            link.className = "recipe-link";
            link.innerText = "See in guide →";
            recipeCard.appendChild(link);
        }

        grid.appendChild(recipeCard);
    });

    resultsContainer.appendChild(grid);
}

// Display all recipes on page load
window.onload = async () => {
    await searchRecipes();
};
