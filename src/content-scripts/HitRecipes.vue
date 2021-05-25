<template>
  <div
    class="mx-4 mb-4 text-2xl w-96"
    v-for="(targets, targetName) in showHitRecipes"
    :key="targetName"
  >
    {{ targetName }}
    <div v-for="target in targets" :key="targetName + target.title">
      <ul v-if="target.links.length > 0" class="list-disc list-inside">
        <li
          class="text-xl break-all"
          v-for="recipe in target.links"
          :key="recipe.id"
        >
          <span v-if="target.title == 'Memo'">
            {{ recipe.url }}
          </span>
          <a
            v-else-if="target.title == 'Another'"
            :href="recipe.url"
            class="text-blue-600"
          >
            {{ recipe.kind }}
          </a>
          <a v-else :href="recipe.url" class="text-xl text-blue-600">
            {{ target.title }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import iconBadgeCheck from "@/components/iconBadgeCheck.vue";
import iconDocumentText from "@/components/iconDocumentText.vue";
import iconDocumentSearch from "@/components/iconDocumentSearch.vue";
import iconSearch from "@/components/iconSearch.vue";
export default {
  components: {
    iconBadgeCheck,
    iconDocumentText,
    iconDocumentSearch,
    iconSearch,
  },
  props: ["paramQ"],
  setup(props) {
    const hitRecipesRef = ref({});

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
          if (!regex_q.test(props.paramQ)) {
            continue;
          }
          // delete and replace keyword from the query to add 'Search by'
          const regex_r = new RegExp(recipe.keyword, "i");
          recipe.keyword = props.paramQ.replace(regex_r, "").trim();

          if (!(recipe.target in hitRecipes)) {
            hitRecipes[recipe.target] = {
              homepage: { title: "Homepage", links: [] },
              doc: { title: "Document", links: [] },
              sbd: { title: "Search by Document", links: [] },
              sbg: { title: "Search by Google", links: [] },
              memo: { title: "Memo", links: [] },
              another: { title: "Another", links: [] },
            };
          }
          if (recipe.kind == "Search By Reference") {
            recipe.url = recipe.url.replace("%s", recipe.keyword);
            hitRecipes[recipe.target].sbd.links.push(recipe);
          } else if (recipe.kind == "Reference") {
            hitRecipes[recipe.target].doc.links.push(recipe);

            // add 'Search by Google'
            let sbgRecipe = Object.assign({}, recipe);
            let doc_url = sbgRecipe.url
              .replace(/^https?:\/\//, "")
              .replace(/[^/]*\.(html|php)$/, "");
            sbgRecipe.url =
              "https://www.google.com/search?q=site:" +
              doc_url +
              " " +
              encodeURIComponent(sbgRecipe.keyword);
            hitRecipes[sbgRecipe.target].sbg.links.push(sbgRecipe);
          } else if (recipe.kind == "Homepage") {
            hitRecipes[recipe.target].homepage.links.push(recipe);
          } else if (recipe.kind == "Memo") {
            hitRecipes[recipe.target].memo.links.push(recipe);
          } else {
            hitRecipes[recipe.target].another.links.push(recipe);
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
