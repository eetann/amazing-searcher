async function getAmzSchRecipeList() {
  let recipeList = [];
  const response = await fetch('https://raw.githubusercontent.com/eetann/amazing-searcher-recipes/main/amz-sch-recipes.json')
  if (response.ok) {
    recipeList = await response.json();
  }
  return recipeList;
}

async function getRecipeByList() {
  var queryString = window.location.search;
  let params = new URLSearchParams(queryString);
  let param_q = params.get("q");
  let recipeList = await getAmzSchRecipeList();
  let recipes = [];
  for (let item of recipeList.items) {
    const regex_q = new RegExp('(^|\\s)(' + item.keyword + ')(\\s|$)', 'i');
    if (regex_q.test(param_q)) {
      const regex_r = new RegExp(item.keyword, 'i');
      item.keyword = param_q.replace(regex_r, "").trim();
      recipes.push(item);
    }
  }
  return recipes;
}

export async function getRecipes() {
  let headings = [];
  let recipes = await getRecipeByList();
  if (recipes.length !== 0) {
    for (let recipe of recipes) {
      let items = [];

      // add Homepage
      let heading = {id: 0, title: "Homepage", links: []};
      for (let item of recipe.home_url) {
        heading.links.push(item);
      }
      if (heading.links.length > 0) {
        items.push(heading);
      }

      // add Document
      heading = {id: 1, title: "Document", links: []};
      for (let item of recipe.doc_url) {
        heading.links.push(item);
      }
      if (heading.links.length > 0) {
        items.push(heading);
      }

      // add Search By Document
      heading = {id: 2, title: "Search By Document", links: []};
      for (let item of recipe.doc_search) {
        item.url = item.url.replace("{}", recipe.keyword);
        heading.links.push(item);
      }
      if (heading.links.length > 0) {
        items.push(heading);
      }

      // add Search By Google
      heading = {id: 3, title: "Search By Google", links: []};
      for (let item of recipe.doc_url) {
        let doc_url = item.url
          .replace(/https?:\/\//, "")
          .replace(/[^/]*\.(html|php)$/, "")
        item.url = "https://www.google.com/search?q=site:" + doc_url + " " + recipe.keyword;
        heading.links.push(item)
      }
      if (heading.links.length > 0) {
        items.push(heading);
      }
      headings.push({"name": recipe.name, "items": items});
    }
  }
  return headings
}
