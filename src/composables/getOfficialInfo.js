// import officialInfo from '@/assets/official-info.json';

async function getAmzSchRecipeList() {
  let recipes = [];
  const response = await fetch('https://raw.githubusercontent.com/eetann/amazing-searcher-recipes/main/amz-sch-recipes.json')
  if (response.ok) {
    recipes = await response.json();
  }
  return recipes;
}

async function getRecipeByList() {
  var queryString = window.location.search;
  let params = new URLSearchParams(queryString);
  let param_q = params.get("q");
  let recipes = await getAmzSchRecipeList();
  let infos = [];
  for (let item of recipes.items) {
    const regex_q = new RegExp('(^|\\s)(' + item.keyword + ')(\\s|$)', 'i');
    if (regex_q.test(param_q)) {
      const regex_r = new RegExp(item.keyword, 'i');
      item.keyword = param_q.replace(regex_r, "").trim();
      infos.push(item);
    }
  }
  return infos;
}

export async function getRecipes() {
  let officials = [];
  let infos = await getRecipeByList();
  if (infos.length !== 0) {
    for (let info of infos) {
      let items = [];

      // add Homepage
      let heading = {id: 0, title: "Homepage", links: []};
      for (let item of info.home_url) {
        heading.links.push(item);
      }
      if (heading.links.length > 0) {
        items.push(heading);
      }

      // add Document
      heading = {id: 1, title: "Document", links: []};
      for (let item of info.doc_url) {
        heading.links.push(item);
      }
      if (heading.links.length > 0) {
        items.push(heading);
      }

      // add Search By Document
      heading = {id: 2, title: "Search By Document", links: []};
      for (let item of info.doc_search) {
        item.url = item.url.replace("{}", info.keyword);
        heading.links.push(item);
      }
      if (heading.links.length > 0) {
        items.push(heading);
      }

      // add Search By Google
      heading = {id: 3, title: "Search By Google", links: []};
      for (let item of info.doc_url) {
        let doc_url = item.url
          .replace(/https?:\/\//, "")
          .replace(/[^/]*\.(html|php)$/, "")
        item.url = "https://www.google.com/search?q=site:" + doc_url + " " + info.keyword;
        heading.links.push(item)
      }
      if (heading.links.length > 0) {
        items.push(heading);
      }
      officials.push({"name": info.name, "items": items});
    }
  }
  return officials
}
