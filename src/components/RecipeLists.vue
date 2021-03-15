<template>
  <MyTable>
    <template v-slot:my-theader>
      <th>Name</th>
      <th>URL</th>
      <th>Action</th>
    </template>
    <template v-slot:my-tbody>
      <tr v-for="recipe_list in recipe_lists" :key="recipe_list.id">
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
      <div class="table-footer-div border-t-2 border-gray-200">
        <input
          type="url"
          placeholder="Input new recipe list URL"
          class="w-full text-gray-500 focus:text-gray-900 focus:outline-none"
        />
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
export default {
  components: {
    MyTable,
    iconEye,
    iconEyeOff,
    iconTrash,
  },
  setup() {
    const recipe_lists = [
      { id: 0, name: "hoge", URL: "https://example.com", active: true },
      { id: 1, name: "fugaaa", URL: "https://example.com", active: true },
      { id: 2, name: "momo", URL: "https://example.com", active: false },
      { id: 3, name: "gagagagaga", URL: "https://example.com", active: true },
    ];
    return { recipe_lists };
  },
};
</script>
