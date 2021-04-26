<template>
  <MyTable>
    <template v-slot:my-theader>
      <th class="w-2/12">Name</th>
      <th class="w-3/12">Keywords</th>
      <th class="w-2/12">Kind</th>
      <th class="w-4/12">URL</th>
      <th class="w-1/12">Action</th>
    </template>
    <template v-slot:my-tbody>
      <tr v-for="recipe in custom_recipes" :key="recipe.id">
        <td class="truncate">{{ recipe.name }}</td>
        <td>{{ recipe.keywords }}</td>
        <td>{{ recipe.kind }}</td>
        <td class="truncate">{{ recipe.URL }}</td>
        <td>
          <div class="flex space-x-3">
            <iconEye
              class="cursor-pointer"
              v-if="recipe.active"
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
      <input class="w-2/12" type="text" placeholder="Name" />
      <input class="w-3/12" type="text" placeholder="Keywords" />
      <input class="w-2/12" type="text" placeholder="kind" />
      <input class="w-4/12" type="url" placeholder="recipe URL" />
      <div class="w-1/12 cursor-pointer">
        <iconUpload class="mx-auto" :width="20" :height="20"></iconUpload>
      </div>
    </template>
  </MyTable>
</template>

<script>
import { ref } from "vue";
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
    return { custom_recipes };
  },
};
</script>
