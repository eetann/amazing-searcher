<template>
  <div
    class="mx-4 mb-4 text-2xl w-96"
    v-for="(target, targetName) in showHitRecipes"
    :key="targetName"
  >
    {{ targetName }}
    <div v-for="(links, kindName) in target" :key="targetName + kindName">
      <div v-if="links.length > 0">
        <div
          class="text-xl break-all my-2"
          v-for="recipe in links"
          :key="recipe.id"
        >
          <div v-if="kindName == 'Memo'" class="flex flex-wrap">
            <iconPencil></iconPencil>
            {{ recipe.url }}
          </div>
          <a
            v-else-if="kindName == 'Query'"
            :href="recipe.url"
            class="block flex text-blue-600"
          >
            <iconDocumentSearch></iconDocumentSearch>
            {{ recipe.kind }}
          </a>
          <div v-else class="flex space-x-2 items-center">
            <a
              :href="recipe.sbg"
              class="block p-1 text-blue-600 ring-1 ring-blue-600 rounded-md"
            >
              <iconSearch width="20" height="20"></iconSearch>
            </a>
            <a :href="recipe.url" class="block flex text-xl text-blue-600">
              <iconExternalLink></iconExternalLink>
              {{ recipe.kind }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import iconExternalLink from "@/components/iconExternalLink.vue";
import iconPencil from "@/components/iconPencil.vue";
import iconDocumentSearch from "@/components/iconDocumentSearch.vue";
import iconSearch from "@/components/iconSearch.vue";
export default {
  components: {
    iconExternalLink,
    iconPencil,
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
              Homepage: [],
              Reference: [],
              Query: [],
              Memo: [],
              Another: [],
            };
          }
          if (recipe.kind == "Memo") {
            hitRecipes[recipe.target].Memo.push(recipe);
          } else if (recipe.url.match(/%s/)) {
            recipe.url = recipe.url.replace("%s", recipe.keyword);
            hitRecipes[recipe.target].Query.push(recipe);
          } else {
            // add 'Search by Google'
            let doc_url = recipe.url
              .replace(/^https?:\/\//, "")
              .replace(/[^/]*\.(html|php)$/, "");
            recipe.sbg =
              "https://www.google.com/search?q=site:" +
              doc_url +
              " " +
              encodeURIComponent(recipe.keyword);
            if (recipe.kind == "Reference") {
              hitRecipes[recipe.target].Reference.push(recipe);
            } else if (recipe.kind == "Homepage") {
              hitRecipes[recipe.target].Homepage.push(recipe);
            } else {
              hitRecipes[recipe.target].Another.push(recipe);
            }
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
