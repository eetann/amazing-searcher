function checkElement(element) {
  // check for correct formant of element of recipe
  return ("lang" in element &&
    typeof element.lang == "string" &&
    "url" in element &&
    typeof element.url == "string")
}

function checkRecipe(recipe) {
  // check for correct recipe format
  let kindRecipes = [];
  if (!("target" in recipe)) {
    return [];
  }
  if (typeof recipe.target != "string") {
    return [];
  }
  if (!("keyword" in recipe)) {
    return [];
  }
  if (typeof recipe.keyword != "string") {
    return [];
  }
  // check the regular expression
  try {
    new RegExp(recipe.keyword);
  } catch (e) {
    console.log(recipe.keyword);
    console.log("keyword '" + recipe.target + "' is wrong.(recipe target is " + recipe.target + ")");
    return []
  }
  if ("homepage" in recipe) {
    // check homepage expression
    if (!Array.isArray(recipe.homepage)) {
      return [];
    }
    recipe.homepage.forEach(element => {
      if (checkElement(element)) {
        kindRecipes.push({
          'target': recipe.target,
          'keyword': recipe.keyword,
          'kind': 'homepage',
          'lang': element.lang,
          'url': element.url
        });
      }
    })
  }
  if ("doc" in recipe) {
    if (!Array.isArray(recipe.doc)) {
      return [];
    }
    recipe.doc.forEach(element => {
      if (checkElement(element)) {
        kindRecipes.push({
          'target': recipe.target,
          'keyword': recipe.keyword,
          'kind': 'doc',
          'lang': element.lang,
          'url': element.url
        });
      }
    })
  }
  if ("search_by_doc" in recipe) {
    if (!Array.isArray(recipe.search_by_doc)) {
      return [];
    }
    let checkDocSearch = recipe.search_by_doc.every(element => checkElement(element));
    if (!checkDocSearch) {
      return []
    }
    recipe.search_by_doc.forEach(element => {
      if (checkElement(element)) {
        kindRecipes.push({
          'target': recipe.target,
          'keyword': recipe.keyword,
          'kind': 'search_by_doc',
          'lang': element.lang,
          'url': element.url
        });
      }
    })
  }
  return kindRecipes
}
export function checkRecipeList(resjson) {
  // check for correct 'recipe list' format
  if (!("items" in resjson)) {
    return [];
  }
  if (!Array.isArray(resjson.items)) {
    return [];
  }
  let recipes = [];
  resjson.items.forEach(recipe => recipes.push(...checkRecipe(recipe)));
  return recipes
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
