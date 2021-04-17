function checkElement(element) {
  // check for correct formant of element of recipe
  return ("lang" in element &&
    typeof element.lang == "string" &&
    "url" in element &&
    typeof element.url == "string")
}

function checkRecipe(recipe) {
  // check for correct recipe format
  if (!("name" in recipe)) {
    return false;
  }
  if (typeof recipe.name != "string") {
    return false;
  }
  if (!("keyword" in recipe)) {
    return false;
  }
  if (typeof recipe.keyword != "string") {
    return false;
  }
  // check the regular expression
  try {
    new RegExp(pattern);
  } catch (e) {
    return false
  }
  if ("home_url" in recipe) {
    if (!Array.isArray(recipe.home_url)) {
      return false;
    }
    let checkHomeUrl = recipe.home_url.every(element => checkElement(element));
    if (!checkHomeUrl) {
      return false
    }
  }
  if ("doc_url" in recipe) {
    if (!Array.isArray(recipe.doc_url)) {
      return false;
    }
    let checkDocUrl = recipe.doc_url.every(element => checkElement(element));
    if (!checkDocUrl) {
      return false
    }
  }
  if ("doc_search" in recipe) {
    if (!Array.isArray(recipe.doc_search)) {
      return false;
    }
    let checkDocSearch = recipe.doc_search.every(element => checkElement(element));
    if (!checkDocSearch) {
      return false
    }
  }
  return true
}
export function checkRecipeList(resjson) {
  // check for correct 'recipe list' format
  if (!("name" in resjson)) {
    return false;
  }
  if (typeof resjson.name != "string") {
    return false;
  }
  if (!("items" in resjson)) {
    return false;
  }
  if (!Array.isArray(resjson.items)) {
    return false;
  }
  let recipes = resjson.items.filter(recipe => checkRecipe(recipe));
  recipes = recipes.map(recipe => {
    recipe.active = true;
    recipe.from = resjson.name;
    return recipe
  })
  return recipes
}
