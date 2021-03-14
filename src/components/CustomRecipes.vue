<template>
  <MyTable>
    <template v-slot:my-theader>
      <th>Name</th>
      <th>Keywords</th>
      <th>Kind</th>
      <th>URL</th>
      <th>Action</th>
    </template>
    <template v-slot:my-tbody>
      <tr v-for="recipe in custom_recipes" :key="recipe.id">
        <td>{{ recipe.name }}</td>
        <td>{{ recipe.keywords }}</td>
        <td>{{ recipe.kind }}</td>
        <td>{{ recipe.URL }}</td>
        <td>
          <div class="flex space-x-3">
            <img
              class="cursor-pointer"
              v-if="recipe.active"
              :src="iconEye"
              width="20"
              height="20"
            />
            <img
              class="cursor-pointer"
              v-else
              :src="iconEyeOff"
              width="20"
              height="20"
            />
            <img
              class="cursor-pointer"
              :src="iconTrash"
              width="20"
              height="20"
            />
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <input type="text" placeholder="Name" />
        </td>
        <td>
          <input type="text" placeholder="Keywords" />
        </td>
        <td>
          <input type="text" placeholder="kind" />
        </td>
        <td>
          <input type="url" placeholder="recipe URL" />
        </td>
        <td>
          <img
            class="cursor-pointer"
            :src="iconUpload"
            width="20"
            height="20"
          />
        </td>
      </tr>
    </template>
  </MyTable>
</template>

<script>
import { ref } from "vue";
import MyTable from "@/components/MyTable.vue";
export default {
  components: {
    MyTable,
  },
  setup() {
    const custom_recipes = [
      {
        id: 0,
        name: "hoge",
        keywords: "python|pyてょn",
        kind: "homepage",
        URL: "https://example.com",
        active: true,
      },
      {
        id: 1,
        name: "hoge",
        keywords: "python|pyてょn",
        kind: "document",
        URL: "https://example.com",
        active: true,
      },
      {
        id: 2,
        name: "hoge",
        keywords: "python|pyてょn",
        kind: "d_search",
        URL: "https://example.com",
        active: false,
      },
      {
        id: 3,
        name: "hoge",
        keywords: "python|pyてょn",
        kind: "g_search",
        URL: "https://example.com",
        active: true,
      },
    ];
    const iconEye = ref(chrome.runtime.getURL("imgs/eye.svg"));
    const iconEyeOff = ref(chrome.runtime.getURL("imgs/eye-off.svg"));
    const iconTrash = ref(chrome.runtime.getURL("imgs/trash.svg"));
    const iconUpload = ref(chrome.runtime.getURL("imgs/upload.svg"));
    return { custom_recipes, iconEye, iconEyeOff, iconTrash, iconUpload };
  },
};
</script>
