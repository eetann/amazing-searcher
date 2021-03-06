<template>
  <div>
    <div class="text-lg font-semibold">New Recipe</div>
    <div class="pt-2 text-base">
      <p class="mb-2">Commas are not allowed the values for csv import.</p>
      <p class="mb-2">
        You can use regular expression for
        <code>Keyword</code> value.<br />
        It will be checked as <code>new RegExp(value)</code>.
      </p>
      <p class="mb-2">
        If you include <code>%s</code> in <code>URL</code> value, it will
        replace the part without the hit <code>keyword</code>. <br />
        Example : If you search for <code>python range</code> and there is a
        recipe registered with <code>Keyword:python</code> and
        <code
          >URL:https://docs.python.org/3/search.html?q=<span class="font-bold"
            >%s</span
          ></code
        >, <br />
        then the link
        <code
          >https://docs.python.org/3/search.html?q=<span class="font-bold"
            >range</span
          ></code
        >
        will show up the search results.
      </p>
      <p class="mb-2">
        If you set the value of <code>Kind</code> to <code>Memo</code>, the
        <code>URL</code> will be changed to <code>Memo</code> and you can
        display the memo in the search results.
      </p>
    </div>
    <form @submit.prevent="addRecipe" class="flex space-x-4 items-end">
      <InputText label="Target" type="text" v-model="newTarget"></InputText>
      <InputText label="Keyword" type="text" v-model="newKeyword"></InputText>
      <InputDatalist
        label="Kind"
        type="text"
        listId="kindlist"
        :options="options"
        v-model="newKind"
      ></InputDatalist>
      <InputText
        :label="newKind != 'Memo' ? 'URL' : 'Memo'"
        :type="newKind != 'Memo' ? 'url' : 'text'"
        v-model="newURL"
      ></InputText>
      <div class="w-24">
        <button type="submit" class="my-button">Add</button>
      </div>
    </form>
    <div class="pt-2 text-base whitespace-pre-wrap">{{ messages }}</div>
    <div class="pt-2 text-base text-red-600 whitespace-pre-wrap">
      {{ errorMessages }}
    </div>
  </div>
  <div>
    <div class="flex space-x-4 my-4">
      <div class="w-24">
        <button type="button" class="my-button" @click="importCSV">
          Import
        </button>
      </div>
      <div class="w-24">
        <button type="button" class="my-button" @click="exportCSV">
          Export
        </button>
      </div>
    </div>
    <div class="mb-5 shadow rounded-lg w-full">
      <table class="divide-y divide-gray-200 w-full table-fixed">
        <thead class="bg-gray-50 table-head-th">
          <tr class="text-left font-medium">
            <th class="w-2/12">Target</th>
            <th class="w-4/12">Keyword</th>
            <th class="w-2/12">Kind</th>
            <th class="w-3/12">URL or Memo</th>
            <th class="w-1/12">Remove</th>
          </tr>
        </thead>
        <tbody class="text-base divide-y divide-gray-200 table-body-td">
          <tr v-for="recipe in showRecipes" :key="recipe.id">
            <td class="truncate">{{ recipe.target }}</td>
            <td>{{ recipe.keyword }}</td>
            <td>{{ recipe.kind }}</td>
            <td v-if="recipe.kind == 'Memo'">{{ recipe.url }}</td>
            <td v-else class="truncate text-blue-600">
              <a :href="recipe.url">{{ recipe.url }}</a>
            </td>
            <td>
              <iconTrash
                class="cursor-pointer"
                :width="20"
                :height="20"
                @click="removeRecipe(recipe.id)"
              ></iconTrash>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="w-36">
    <button type="button" class="my-button" @click="resetRecipes">Reset</button>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import InputText from "@/options/InputText.vue";
import InputDatalist from "@/options/InputDatalist.vue";
import iconTrash from "@/components/iconTrash.vue";
import {
  checkRecipe,
  checkRecipeJson,
  setRecipe,
} from "@/options/setRecipe.js";
export default {
  components: { InputText, InputDatalist, iconTrash },
  setup() {
    const options = [
      { key: "Homepage", value: "Homepage" },
      { key: "Reference", value: "Reference" },
      { key: "Search By Reference", value: "Search By Reference" },
      { key: "Memo", value: "Memo" },
    ];
    const messages = ref("");
    const errorMessages = ref("");
    const newTarget = ref("");
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
      messages.value = "";
      errorMessages.value = "";
      const json = require("@/assets/default_recipes.csv");
      let resRecipes = checkRecipeJson(json);
      let newRecipes = setRecipe(resRecipes.recipes);
      recipes.value = newRecipes;
      messages.value = "The recipe has been reset.";
    };

    const removeRecipe = (recipeId) => {
      // clear messages
      errorMessages.value = "";
      let newRecipes = recipes.value.filter((recipe) => recipe.id != recipeId);
      newRecipes = setRecipe(newRecipes);
      recipes.value = newRecipes;
      messages.value = "The recipe has been deleted";
    };

    const addRecipe = () => {
      // clear messages
      errorMessages.value = "";
      messages.value = "";

      let newRecipe = {
        target: newTarget.value,
        keyword: newKeyword.value,
        kind: newKind.value,
        url: newURL.value,
      };

      // check recipe
      try {
        checkRecipe(newRecipe);
      } catch (e) {
        errorMessages.value = "Error :" + e;
        return;
      }

      // add new recipe
      let newRecipes = [newRecipe];
      newRecipes.push(...recipes.value);
      newRecipes = setRecipe(newRecipes);
      recipes.value = newRecipes;
      messages.value = "The new recipe has been added!";

      // clear the value of 'Kind' and 'URL(Memo)'
      newKind.value = "";
      newURL.value = "";
    };

    const exportCSV = () => {
      let csvStr = "target,keyword,kind,url\n";
      csvStr += recipes.value
        .map((recipe) => {
          return (
            recipe.target +
            "," +
            recipe.keyword +
            "," +
            recipe.kind +
            "," +
            recipe.url
          );
        })
        .join("\n");
      const blob = new Blob([csvStr], { type: "text/csv" });
      const dlURL = window.URL.createObjectURL(blob);
      const aTagDl = document.createElement("a");
      aTagDl.href = dlURL;
      aTagDl.download = "amazing-searcher-recipes.csv";
      aTagDl.click();
      window.URL.revokeObjectURL(dlURL);
    };

    const importCSV = () => {
      // clear messages
      errorMessages.value = "";
      messages.value = "";

      // read csv file
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".csv";
      input.onchange = (e) => {
        let errorMsg = "";
        const fileName = e.target.files[0];
        var reader = new FileReader();
        reader.onload = (readerEvent) => {
          let csvRow = readerEvent.target.result.split("\n");
          let csvRecipes = [];
          for (let i = 1; i < csvRow.length; i++) {
            // TODO: ,が文字列に含まれていた場合の対処
            // TODO: 前後に空白が文字列に含まれていた場合の対処
            let row = csvRow[i].split(",");
            if (row.length != 5) {
              errorMsg +=
                "Error at index " + idx + ": Recipe elements are missing.\n";
              continue;
            }
            let newRecipe = {
              target: row[0],
              keyword: row[1],
              kind: row[2],
              url: row[3],
            };
            try {
              checkRecipe(newRecipe);
            } catch (e) {
              errorMsg += "Error at index " + idx + ":" + e + "\n";
            }
            csvRecipes.push(newRecipe);
          }
          csvRecipes.push(...recipes.value);
          csvRecipes = setRecipe(csvRecipes);
          recipes.value = csvRecipes;
          messages.value = "The new recipes have been added!";
          errorMessages.value = errorMsg;
        };
        reader.readAsText(fileName);
      };
      input.click();
    };

    return {
      options,
      messages,
      errorMessages,
      newTarget,
      newKeyword,
      newKind,
      newURL,
      recipes,
      showRecipes,
      resetRecipes,
      removeRecipe,
      addRecipe,
      exportCSV,
      importCSV,
    };
  },
};
</script>

<style>
code {
  @apply bg-gray-200 px-1 rounded;
}
</style>
