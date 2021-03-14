<template>
  <MyTable>
    <template v-slot:my-theader>
      <th>Name</th>
      <th>Keywords</th>
      <th>Kind</th>
      <th>URL</th>
      <th>From</th>
      <th>Toggle</th>
    </template>
    <template v-slot:my-tbody>
      <tr v-for="recipe in recipes" :key="recipe.id">
        <td>{{ recipe.name }}</td>
        <td>{{ recipe.keywords }}</td>
        <td>{{ recipe.kind }}</td>
        <td>{{ recipe.URL }}</td>
        <td>{{ recipe.from }}</td>
        <td>
          <img
            class="mx-auto"
            v-if="recipe.active"
            :src="iconEye"
            width="20"
            height="20"
          />
          <img
            class="mx-auto"
            v-else
            :src="iconEyeOff"
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
    const recipes = [
      {
        id: 0,
        name: "hoge",
        keywords: "python|pyてょn",
        kind: "homepage",
        URL: "https://example.com",
        from: "eetann",
        active: true,
      },
      {
        id: 1,
        name: "hoge",
        keywords: "python|pyてょn",
        kind: "document",
        URL: "https://example.com",
        from: "eetann",
        active: true,
      },
      {
        id: 2,
        name: "hoge",
        keywords: "python|pyてょn",
        kind: "d_search",
        URL: "https://example.com",
        from: "eetann",
        active: false,
      },
      {
        id: 3,
        name: "hoge",
        keywords: "python|pyてょn",
        kind: "g_search",
        URL: "https://example.com",
        from: "eetann",
        active: true,
      },
    ];
    const iconEye = ref(chrome.runtime.getURL("imgs/eye.svg"));
    const iconEyeOff = ref(chrome.runtime.getURL("imgs/eye-off.svg"));
    return { recipes, iconEye, iconEyeOff };
  },
};
</script>
