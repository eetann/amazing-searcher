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
  if (!("name" in recipe)) {
    return [];
  }
  if (typeof recipe.name != "string") {
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
    console.log("keyword '" + recipe.name + "' is wrong.(recipe name is " + recipe.name + ")");
    return []
  }
  if ("home_url" in recipe) {
    // check home_url expression
    if (!Array.isArray(recipe.home_url)) {
      return [];
    }
    recipe.home_url.forEach(element => {
      if (checkElement(element)) {
        let aKindRecipe = {
          'name': recipe.name,
          'keyword': recipe.keyword,
          'kind': 'home_url',
          'lang': element.lang,
          'url': element.url
        };
        kindRecipes.push(aKindRecipe);
      }
    })
  }
  if ("doc_url" in recipe) {
    if (!Array.isArray(recipe.doc_url)) {
      return [];
    }
    recipe.doc_url.forEach(element => {
      if (checkElement(element)) {
        let aKindRecipe = {
          'name': recipe.name,
          'keyword': recipe.keyword,
          'kind': 'doc_url',
          'lang': element.lang,
          'url': element.url
        };
        kindRecipes.push(aKindRecipe);
      }
    })
  }
  if ("doc_search" in recipe) {
    if (!Array.isArray(recipe.doc_search)) {
      return [];
    }
    let checkDocSearch = recipe.doc_search.every(element => checkElement(element));
    if (!checkDocSearch) {
      return []
    }
    recipe.doc_search.forEach(element => {
      if (checkElement(element)) {
        let aKindRecipe = {
          'name': recipe.name,
          'keyword': recipe.keyword,
          'kind': 'doc_search',
          'lang': element.lang,
          'url': element.url
        };
        kindRecipes.push(aKindRecipe);
      }
    })
  }
  return kindRecipes
}
export function checkRecipeList(resjson) {
  // check for correct 'recipe list' format
  if (!("name" in resjson)) {
    return [];
  }
  if (typeof resjson.name != "string") {
    return [];
  }
  if (!("items" in resjson)) {
    return [];
  }
  if (!Array.isArray(resjson.items)) {
    return [];
  }
  // TODO: レシピをkindとURLごとに分ける
  let recipes = [];
  resjson.items.forEach(recipe => recipes.push(...checkRecipe(recipe)));
  recipes = recipes.map(recipe => {
    recipe.active = true;
    recipe.from = resjson.name;
    return recipe
  })
  console.log(recipes);
  return recipes
}
