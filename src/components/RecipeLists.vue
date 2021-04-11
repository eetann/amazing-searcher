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
            <iconEye
              class="cursor-pointer"
              v-if="recipe_list.active"
              :width="20"
              :height="20"
            ></iconEye>
            <iconEyeOff
              class="cursor-pointer"
              v-else
              :width="20"
              :height="20"
            ></iconEyeOff>
            <iconTrash
              class="cursor-pointer"
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
import MyTable from "@/components/MyTable.vue";
import iconEye from "@/components/icons/iconEye.vue";
import iconEyeOff from "@/components/icons/iconEyeOff.vue";
import iconTrash from "@/components/icons/iconTrash.vue";
import iconUpload from "@/components/icons/iconUpload.vue";
export default {
  components: {
    MyTable,
    iconEye,
    iconEyeOff,
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
      let listUrl = inputUrl.value;
      const regex = new RegExp("^https?://.*json$");
      if (!regex.test(listUrl)) {
        return false;
      }
      let resjson = null;
      try {
        const res = await fetch(listUrl);
        resjson = await res.json();
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
    return { inputUrl, recipeList, setRecipeList, showRecipeList };
  },
};
</script>
