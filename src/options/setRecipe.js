export function checkRecipe(recipe) {
  // check for correct recipe format
  // check 'target'
  if (!recipe.target) {
    throw "The value of the 'target' key is empty.\n"
  }

  // check 'keyword'
  if (!recipe.keyword) {
    throw "The value of the 'keyword' key is empty.\n"
  }
  // check the regular expression
  try {
    new RegExp(recipe.keyword);
  } catch (e) {
    throw "The regular expression for the 'keyword' key " + recipe.keyword + " is wrong.\n"
  }

  // check 'kind'
  if (!recipe.kind) {
    throw "The value of the 'kind' key is empty.\n"
  }

  // check 'URL'
  if (!recipe.url) {
    throw "The value of the 'url' key is empty.\n"
  }
}

export function checkRecipeJson(resjson) {
  // check for correct 'recipe list' format
  if (!Array.isArray(resjson)) {
    throw "There is no recipe list.\n";
  }

  // get recipes
  let errorMsg = "";
  let recipes = resjson.filter((recipe, idx) => {
    try {
      checkRecipe(recipe);
    } catch (e) {
      errorMsg += "Error in recipe at index " + idx + ":" + e + "\n";
      return false
    }
    return true
  });
  return {recipes: recipes, errorMsg: errorMsg}
}

export function setRecipe(recipes) {
  // set recipe.id
  let recipeId = 0;
  let newRecipes = recipes.map((recipe) => {
    recipe.id = recipeId;
    recipeId++;
    return recipe;
  });
  chrome.storage.local.set({
    recipes: JSON.stringify(newRecipes),
  });
  return newRecipes
}
