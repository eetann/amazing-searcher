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
          <iconUpload
            class="cursor-pointer"
            :width="20"
            :height="20"
          ></iconUpload>
        </td>
      </tr>
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
