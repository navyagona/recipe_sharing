document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('/recipes');
    const recipes = await response.json();

    const recipeList = document.getElementById('recipe-list');
    const likedRecipes = document.getElementById('liked-recipes');

    recipes.forEach(recipe => {
      const card = document.createElement('div');
      card.className = 'recipe-card';

      card.innerHTML = `
        <h3>${recipe.title}</h3>
        <p class="ingredients"><strong>Ingredients:</strong> ${recipe.ingredients || 'Not mentioned'}</p>
        <p><strong>Description:</strong> ${recipe.description}</p>
      `;

      recipeList.appendChild(card);

      if (recipe.likes >= 10) {
        const li = document.createElement('li');
        li.textContent = recipe.title;
        li.onclick = () => alert(`${recipe.title}\n\n${recipe.description}`);
        likedRecipes.appendChild(li);
      }
    });

  } catch (err) {
    console.error('Failed to fetch recipes:', err);
    const recipeList = document.getElementById('recipe-list');
    recipeList.innerHTML = '<p>Error loading recipes. Please try again later.</p>';
  }
});



     

  