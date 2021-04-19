<template>
  <MyTable>
    <template v-slot:my-theader>
      <th class="w-2/12">Name</th>
      <th class="w-3/12">Keywords</th>
      <th class="w-1/12">Kind</th>
      <th class="w-4/12">URL</th>
      <th class="w-1/12">From</th>
      <th class="w-1/12">Toggle</th>
    </template>
    <template v-slot:my-tbody>
      <tr v-for="recipe in recipes" :key="recipe.id">
        <td class="truncate">{{ recipe.name }}</td>
        <td>{{ recipe.keywords }}</td>
        <td>{{ recipe.kind }}</td>
        <td class="truncate">{{ recipe.URL }}</td>
        <td>{{ recipe.from }}</td>
        <td>
          <iconEye
            class="cursor-pointer mx-auto"
            v-if="recipe.active"
            :width="20"
            :height="20"
          ></iconEye>
          <iconEyeOff
            class="cursor-pointer mx-auto"
            v-else
            :width="20"
            :height="20"
          ></iconEyeOff>
        </td>
      </tr>
    </template>
    <template v-slot:my-footer><p>Thank you.</p></template>
  </MyTable>
</template>

<script>
import { ref } from "vue";
import iconEye from "@/components/icons/iconEye.vue";
import iconEyeOff from "@/components/icons/iconEyeOff.vue";
import MyTable from "@/components/MyTable.vue";
export default {
  components: {
    MyTable,
    iconEye,
    iconEyeOff,
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
    return { recipes };
  },
};
</script>
