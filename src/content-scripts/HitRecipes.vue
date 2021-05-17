<template>
  <div
    class="mx-4 mb-4 text-2xl"
    v-for="(targets, targetName) in showHitRecipes"
    :key="targetName"
  >
    {{ targetName }}
    <div v-for="target in targets" :key="targetName + target.title">
      <div v-if="target.links.length > 0" class="flex items-center">
        <iconBadgeCheck v-if="target.title == 'Homepage'"></iconBadgeCheck>
        <iconDocumentText
          v-else-if="target.title == 'Document'"
        ></iconDocumentText>
        <iconDocumentSearch
          v-else-if="target.title == 'Search by Document'"
        ></iconDocumentSearch>
        <iconSearch v-else-if="target.title == 'Search by Google'"></iconSearch>
        <div>
          <div
            class="flex items-center"
            v-for="recipe in target.links"
            :key="recipe.id"
          >
            <a :href="recipe.url" class="text-xl text-blue-600">
              {{
                target.links.length > 1
                  ? target.title + " (" + recipe.lang + ")"
                  : target.title
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
import WithinButtons from "@/content-scripts/WithinButtons.vue";
import iconBadgeCheck from "@/components/icons/iconBadgeCheck.vue";
import iconDocumentText from "@/components/icons/iconDocumentText.vue";
import iconDocumentSearch from "@/components/icons/iconDocumentSearch.vue";
import iconSearch from "@/components/icons/iconSearch.vue";
export default {
  components: {
    WithinButtons,
    iconBadgeCheck,
    iconDocumentText,
    iconDocumentSearch,
    iconSearch,
  },
  setup() {
    const hitRecipesRef = ref({});
    // get the query for the current search result
    var queryString = window.location.search;
    let params = new URLSearchParams(queryString);
    let param_q = params.get("q");

    // get recipes
    chrome.storage.local.get("recipes", (result) => {
      // join recipes
      if (typeof result.recipes !== "undefined") {
        let hitRecipes = {};
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

          if (!(recipe.target in hitRecipes)) {
            hitRecipes[recipe.target] = {
              homepage: { title: "Homepage", links: [] },
              doc: { title: "Document", links: [] },
              sbd: { title: "Search by Document", links: [] },
              sbg: { title: "Search by Google", links: [] },
            };
          }
          if (recipe.kind == "search_by_doc") {
            recipe.url = recipe.url.replace("{}", recipe.keyword);
            hitRecipes[recipe.target].sbd.links.push(recipe);
          } else if (recipe.kind == "doc") {
            hitRecipes[recipe.target].doc.links.push(recipe);

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
            hitRecipes[sbgRecipe.target].sbg.links.push(sbgRecipe);
          } else {
            hitRecipes[recipe.target].homepage.links.push(recipe);
          }
        }
        hitRecipesRef.value = hitRecipes;
      }
    });
    const showHitRecipes = computed(() => {
      return hitRecipesRef.value;
    });
    return { hitRecipesRef, showHitRecipes };
  },
};
</script>
