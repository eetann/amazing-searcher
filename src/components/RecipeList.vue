<template>
  <div class="mt-5 mb-2 text-lg">Add new recipe.</div>
  <div
    class="flex space-x-4 items-center p-4 shadow rounded-lg border-b-2 border-gray-200"
  >
    <InputText label="Target" type="text" v-model="newTarget"></InputText>
    <InputText label="Lang" type="text" v-model="newLang"></InputText>
    <InputText label="Keyword" type="text" v-model="newKeyword"></InputText>
    <InputText label="Kind" type="text" v-model="newKind"></InputText>
    <InputText label="URL" type="URL" v-model="newURL"></InputText>
    <div class="w-24">
      <button type="button" class="my-button flex justify-center items-center">
        <iconUpload class="mr-2" :width="20" :height="20"></iconUpload>
        Add
      </button>
    </div>
  </div>
  <div class="mt-5 mb-2 text-lg">Recipes</div>
  <div class="mb-5 shadow rounded-lg w-full">
    <table class="divide-y divide-gray-200 w-full table-fixed">
      <thead class="bg-gray-50 table-head-th">
        <tr class="text-left font-medium">
          <th class="w-2/12">Target</th>
          <th class="w-1/12">Lang</th>
          <th class="w-3/12">Keyword</th>
          <th class="w-2/12">Kind</th>
          <th class="w-3/12">URL</th>
          <th class="w-1/12">Remove</th>
        </tr>
      </thead>
      <tbody class="text-base divide-y divide-gray-200 table-body-td">
        <tr v-for="recipe in showRecipes" :key="recipe.id">
          <td class="truncate">{{ recipe.name }}</td>
          <td>{{ recipe.lang }}</td>
          <td>{{ recipe.keyword }}</td>
          <td v-if="recipe.kind == 'homepage'">homepage</td>
          <td v-else-if="recipe.kind == 'doc'">document</td>
          <td v-else>search by doc</td>
          <td class="truncate text-blue-600">
            <a :href="recipe.url">{{ recipe.url }}</a>
          </td>
          <td>
            <iconTrash
              class="mx-auto cursor-pointer"
              :width="20"
              :height="20"
              @click="removeRecipe(recipe.id)"
            ></iconTrash>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="w-36">
    <button type="button" class="my-button" @click="resetRecipes">Reset</button>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import InputText from "@/components/InputText.vue";
import iconTrash from "@/components/icons/iconTrash.vue";
import iconUpload from "@/components/icons/iconUpload.vue";
import { checkRecipeList, setRecipe } from "@/composables/setRecipe.js";
export default {
  components: { InputText, iconTrash, iconUpload },
  setup() {
    const newTarget = ref("");
    const newLang = ref("");
    const newKeyword = ref("");
    const newKind = ref("");
    const newURL = ref("");
    // get storage.local recipe
    const recipes = ref([]);
    chrome.storage.local.get("recipes", (result) => {
      // join recipes
      if (typeof result.recipes !== "undefined") {
        recipes.value.push(...JSON.parse(result.recipes));
      }
    });

    const showRecipes = computed(() => {
      return recipes.value;
    });

    const resetRecipes = () => {
      chrome.storage.local.clear();
      const json = require("@/assets/official-info.json");
      let localRecipes = checkRecipeList(json);
      setRecipe(localRecipes);
      recipes.value = localRecipes;
      console.log("reset");
    };

    const removeRecipe = (recipeId) => {
      recipes.value.splice(recipeId, 1);
      setRecipe(recipes.value);
    };
    return {
      newTarget,
      newLang,
      newKeyword,
      newKind,
      newURL,
      recipes,
      showRecipes,
      resetRecipes,
      removeRecipe,
    };
  },
};
</script>

<style>
.my-button {
  @apply py-2 px-4 bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg;
}
.table-head-th > tr > *,
.table-body-td > tr > *,
.table-out-div > * {
  @apply px-5 py-1 text-left text-base;
}
.table-out-div > input {
  @apply text-gray-500 focus:text-gray-900 focus:outline-none focus:ring;
}
</style>

