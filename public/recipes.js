document.addEventListener('DOMContentLoaded', async () => {
    const recipeList = document.getElementById('recipe-list');
    const likedRecipes = document.getElementById('liked-recipes');
    const addBtn = document.getElementById('addRecipeBtn');
    const msg = document.getElementById('addRecipeMsg');
  

    async function loadRecipes() {
      try {
        recipeList.innerHTML = '';
        likedRecipes.innerHTML = '';
        const response = await fetch('/recipes');
        const recipes = await response.json();
  
        recipes.forEach(recipe => {
          const card = document.createElement('div');
          card.className = 'recipe-card';
          card.innerHTML = `
            <h3>${recipe.title}</h3>
            <p><strong>Ingredients:</strong> ${recipe.ingredients || 'Not mentioned'}</p>
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
        console.error('Failed to load recipes:', err);
        recipeList.innerHTML = '<p>Error loading recipes. Please try again later.</p>';
      }
    }
  
    loadRecipes();
  
    
    addBtn.addEventListener('click', async () => {
      const title = document.getElementById('newTitle').value.trim();
      const ingredients = document.getElementById('newIngredients').value.trim();
      const description = document.getElementById('newDescription').value.trim();
  
      if (!title || !ingredients || !description) {
        msg.textContent = 'Please fill in all fields.';
        return;
      }
  
      try {
        const res = await fetch('/recipes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, ingredients, description })
        });
  
        const result = await res.json();
        msg.textContent = result.message;
  
        document.getElementById('newTitle').value = '';
        document.getElementById('newIngredients').value = '';
        document.getElementById('newDescription').value = '';
        loadRecipes();
      } catch (err) {
        msg.textContent = 'Failed to add recipe.';
        console.error(err);
      }
    });
  });
  
  
  