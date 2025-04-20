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

// Group recipes by category
function groupRecipesByCategory(recipes) {
    const groups = {};
    for (const recipe of recipes) {
        const category = recipe.category || "Other";
        if (!groups[category]) groups[category] = [];
        groups[category].push(recipe);
    }
    return groups;
}

// Search and Display Recipes
async function searchRecipes() {
    const recipes = await loadRecipes();
    const searchValue = document.getElementById('searchBar').value.toLowerCase().trim();
    const resultsContainer = document.getElementById('recipeResults');

    resultsContainer.innerHTML = ''; // Clear previous results

    const filtered = recipes.filter(r => r.name.toLowerCase().includes(searchValue));
    const grouped = groupRecipesByCategory(filtered);

    if (filtered.length === 0) {
        resultsContainer.innerHTML = `<p>No recipes found for "<strong>${searchValue}</strong>"</p>`;
        return;
    }

    for (const category in grouped) {
        const section = document.createElement('div');
        section.classList.add('recipe-category-section');

        const heading = document.createElement('h2');
        heading.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        section.appendChild(heading);

        const grid = document.createElement('div');
        grid.classList.add('recipe-grid');

        grouped[category].forEach(recipe => {
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

        section.appendChild(grid);
        resultsContainer.appendChild(section);
    }
}

// Display all recipes on page load
window.onload = async () => {
    await searchRecipes();
};
