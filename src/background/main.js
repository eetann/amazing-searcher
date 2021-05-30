import {
  checkRecipeJson,
  setRecipe,
} from "@/options/setRecipe.js";
import {checkTermJson, setTerm} from "@/options/setTerm.js";
import {setLang} from "@/options/setLang.js";
chrome.runtime.onInstalled.addListener(details => {
  if (details.reason == "install") {
    // register recipes
    let json = require("@/assets/default_recipes.csv");
    let resRecipes = checkRecipeJson(json);
    setRecipe(resRecipes.recipes);

    // register terms
    json = require("@/assets/default_terms.csv");
    let resTerms = checkTermJson(json);
    setTerm(resTerms.terms);

    // register langs
    let defaultLangs = [
      {id: 0, param: "lang_en", str: "English"},
      {id: 1, param: "lang_ja", str: "Japanese"},
    ];
    setLang(defaultLangs);
  }
});
