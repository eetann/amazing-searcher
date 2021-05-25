export function checkRecipe(recipe) {
  // check for correct recipe format
  // check 'target'
  if (!recipe.target) {
    throw "The value of the 'Target' key is empty.\n"
  }

  // check 'keyword'
  if (!recipe.keyword) {
    throw "The value of the 'Keyword' key is empty.\n"
  }
  // check the regular expression
  try {
    new RegExp(recipe.keyword);
  } catch (e) {
    throw "The regular expression for the 'Keyword' key " + recipe.keyword + " is wrong.\n"
  }

  // check 'kind'
  if (!recipe.kind) {
    throw "The value of the 'Kind' key is empty.\n"
  }

  if (recipe.kind == "Memo") {
    // check 'url' as 'Memo' 
    if (!recipe.url) {
      throw "The value of the 'Memo' key is empty.\n"
    }
  } else {
    // check 'URL'
    if (!recipe.url) {
      throw "The value of the 'URL' key is empty.\n"
    } else if (!recipe.url.match(/^https?:\/\//)) {
      throw "The value of the 'URL' key is bad .\n"
    }
    if (recipe.kind == "Search By Reference") {
      // check 'URL'
      if (!recipe.url.match(/%s/)) {
        throw "To set the value of Kind to 'Search By Reference', replace the query string in URL with '%s'.\n"
      }
    }
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
