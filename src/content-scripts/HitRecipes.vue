<template>
  <div
    class="mx-4 mb-4 text-2xl w-96"
    v-for="(target, targetName) in showHitRecipes"
    :key="targetName"
  >
    {{ targetName }}
    <div v-for="(links, kindName) in target" :key="targetName + kindName">
      <ul v-if="links.length > 0" class="list-disc list-inside">
        <li class="text-xl break-all" v-for="recipe in links" :key="recipe.id">
          <span v-if="kindName == 'Memo'">
            {{ recipe.url }}
          </span>
          <a
            v-else-if="kindName == 'Query'"
            :href="recipe.url"
            class="text-blue-600"
          >
            {{ recipe.kind }}
          </a>
          <span v-else>
            <a :href="recipe.url" class="text-xl text-blue-600">
              {{ recipe.kind }} </a
            ><a :href="recipe.sbg" class="text-xl text-blue-600">
              Search By Google
            </a></span
          >
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
