<template>
  <MyTable>
    <template v-slot:my-theader>
      <th>Name</th>
      <th>URL</th>
      <th>Action</th>
    </template>
    <template v-slot:my-tbody>
      <tr v-for="recipe_list in showRecipeList" :key="recipe_list.id">
        <td>{{ recipe_list.name }}</td>
        <td>{{ recipe_list.URL }}</td>
        <td>
          <div class="flex space-x-3">
            <iconTrash
              class="cursor-pointer"
              @click="removeRecipeList(recipe_list.name)"
              :width="20"
              :height="20"
            ></iconTrash>
          </div>
        </td>
      </tr>
    </template>
    <template v-slot:my-footer>
      <div
        class="flex justify-between table-footer-div border-t-2 border-gray-200"
      >
        <input
          type="url"
          placeholder="Input new recipe list URL"
          class="table-footer-input"
          v-model="inputUrl"
        />
        <iconUpload
          class="cursor-pointer"
          :width="20"
          :height="20"
          @click="setRecipeList"
        ></iconUpload>
      </div>
    </template>
  </MyTable>
</template>

<script>
import { ref, computed } from "vue";
import { checkRecipeList } from "@/composables/checkRecipeList.js";
import MyTable from "@/components/MyTable.vue";
import iconTrash from "@/components/icons/iconTrash.vue";
import iconUpload from "@/components/icons/iconUpload.vue";
export default {
  components: {
    MyTable,
    iconTrash,
    iconUpload,
  },
  setup() {
    const inputUrl = ref("");
    let recipeList = ref([]);
    chrome.storage.local.get("recipe_list", (result) => {
      if (typeof result.recipe_list !== "undefined") {
        recipeList.value.push(...JSON.parse(result.recipe_list));
      }
    });
    const setRecipeList = async () => {
      // check input url
      let listUrl = inputUrl.value;
      const regex = new RegExp("^https?://.*json$");
      if (!regex.test(listUrl)) {
        return false;
      }

      let resjson = null;
      try {
        // get recipe list
        const res = await fetch(listUrl);
        resjson = await res.json();

        // register recipe from recipe list
        let recipes = checkRecipeList(resjson);
        chrome.storage.local.get("recipes", (result) => {
          // join recipes
          if (typeof result.recipes !== "undefined") {
            recipes.push(...JSON.parse(result.recipes));
          }
        });
        chrome.storage.local.set({
          recipes: JSON.stringify(recipes),
        });

        // register recipe list
        let nextId = recipeList.value.length;
        recipeList.value.push({
          id: nextId,
          name: resjson.name,
          URL: listUrl,
          active: true,
        });
        chrome.storage.local.set({
          recipe_list: JSON.stringify(recipeList.value),
        });
      } catch (err) {
        console.log(err);
        return false;
      }
      inputUrl.value = "";
      return true;
    };
    const showRecipeList = computed(() => {
      return recipeList.value;
    });
    const removeRecipeList = (listName) => {
      let removeIndex = recipeList.value.findIndex(
        (item) => item.name == listName
      );
      recipeList.value.splice(removeIndex, 1);
      console.log(recipeList.value);
      chrome.storage.local.set({
        recipe_list: JSON.stringify(recipeList.value),
      });
    };
    return {
      inputUrl,
      recipeList,
      setRecipeList,
      showRecipeList,
      removeRecipeList,
    };
  },
};
</script>
