<template>
  <div
    class="m-4 space-y-2 text-2xl"
    v-for="(headings, target) in showHitRecipes"
    :key="target"
  >
    {{ target }}
    <div v-for="heading in headings" :key="target + heading.title">
      <div v-if="heading.links.length > 0" class="flex items-center">
        <iconBadgeCheck v-if="heading.title == 'Homepage'"></iconBadgeCheck>
        <iconDocumentText
          v-else-if="heading.title == 'Document'"
        ></iconDocumentText>
        <iconDocumentSearch
          v-else-if="heading.title == 'Search by Document'"
        ></iconDocumentSearch>
        <iconSearch
          v-else-if="heading.title == 'Search by Google'"
        ></iconSearch>
        <div>
          <div
            class="flex items-center"
            v-for="recipe in heading.links"
            :key="recipe.id"
          >
            <a :href="recipe.url" class="text-xl text-blue-600">
              {{
                heading.links.length > 1
                  ? heading.title + " (" + recipe.lang + ")"
                  : heading.title
              }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import iconBadgeCheck from "@/components/icons/iconBadgeCheck.vue";
import iconDocumentText from "@/components/icons/iconDocumentText.vue";
import iconDocumentSearch from "@/components/icons/iconDocumentSearch.vue";
import iconSearch from "@/components/icons/iconSearch.vue";
export default {
  components: {
    iconBadgeCheck,
    iconDocumentText,
    iconDocumentSearch,
    iconSearch,
  },
  setup() {
    const hitRecipes = ref({});
    // get the query for the current search result
    var queryString = window.location.search;
    let params = new URLSearchParams(queryString);
    let param_q = params.get("q");

    // get recipes
    chrome.storage.local.get("recipes", (result) => {
      // join recipes
      if (typeof result.recipes !== "undefined") {
        let recipes = JSON.parse(result.recipes);
        // search recipes that match.
        for (let recipe of recipes) {
          const regex_q = new RegExp(
            "(^|\\s)(" + recipe.keyword + ")(\\s|$)",
            "i"
          );
          if (!regex_q.test(param_q)) {
            continue;
          }
          // delete and replace keyword from the query to add 'Search by'
          const regex_r = new RegExp(recipe.keyword, "i");
          recipe.keyword = param_q.replace(regex_r, "").trim();

          if (!(recipe.target in hitRecipes.value)) {
            hitRecipes.value[recipe.target] = {
              homepage: { title: "Homepage", links: [] },
              doc: { title: "Document", links: [] },
              sbd: { title: "Search by Document", links: [] },
              sbg: { title: "Search by Google", links: [] },
            };
          }
          if (recipe.kind == "search_by_doc") {
            recipe.url = recipe.url.replace("{}", recipe.keyword);
            hitRecipes.value[recipe.target].sbd.links.push(recipe);
          } else if (recipe.kind == "doc") {
            hitRecipes.value[recipe.target].doc.links.push(recipe);

            // add 'Search by Google'
            let sbgRecipe = Object.assign({}, recipe);
            let doc_url = sbgRecipe.url
              .replace(/https?:\/\//, "")
              .replace(/[^/]*\.(html|php)$/, "");
            sbgRecipe.url =
              "https://www.google.com/search?q=site:" +
              doc_url +
              " " +
              sbgRecipe.keyword;
            hitRecipes.value[sbgRecipe.target].sbg.links.push(sbgRecipe);
          } else {
            hitRecipes.value[recipe.target].homepage.links.push(recipe);
          }
        }
      }
    });
    const showHitRecipes = computed(() => {
      return hitRecipes.value;
    });
    return { hitRecipes, showHitRecipes };
  },
};
</script>
