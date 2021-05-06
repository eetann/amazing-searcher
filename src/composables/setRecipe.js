function checkElement(element) {
  // check for correct formant of element of recipe
  return ("lang" in element &&
    typeof element.lang == "string" &&
    "url" in element &&
    typeof element.url == "string")
}

function checkRecipe(recipe) {
  // check for correct recipe format
  // check 'target'
  if (!recipe.target) {
    throw "The value of the 'target' key is empty."
  }

  // The 'lang' key can be empty, so don't check it.

  // check 'keyword'
  if (!recipe.keyword) {
    throw "The value of the 'keyword' key is empty."
  }
  // check the regular expression
  try {
    new RegExp(recipe.keyword);
  } catch (e) {
    throw "The regular expression for the 'lang' key " + recipe.keyword + " is wrong."
  }

  // check 'kind'
  if (!recipe.kind) {
    throw "The value of the 'kind' key is empty."
  }

  // check 'URL'
  if (!recipe.url) {
    throw "The value of the 'url' key is empty."
  }
  return true
}

export function checkRecipeJson(resjson) {
  // check for correct 'recipe list' format
  if (!Array.isArray(resjson)) {
    throw "There is no recipe list.";
  }

  // get recipes
  let errorMsg = "";
  let recipes = resjson.filter((recipe, idx) => {
    let correctRecipe = false;
    try {
      correctRecipe = checkRecipe(recipe);
    } catch (e) {
      errorMsg += "Eoor in recipe at index " + idx + ":" + e + "\n";
    }
    return correctRecipe
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
}
