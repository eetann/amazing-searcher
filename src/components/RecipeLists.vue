<template>
  <div class="my-5 shadow rounded-lg max-w-min">
    <table class="divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr class="text-left text-base">
          <th class="table-header-th">Name</th>
          <th class="table-header-th">URL</th>
          <th class="table-header-th">Action</th>
        </tr>
      </thead>
      <tbody class="text-base divide-y divide-gray-200">
        <tr v-for="recipe_list in recipe_lists" :key="recipe_list.id">
          <td class="table-body-td">{{ recipe_list.name }}</td>
          <td class="table-body-td">{{ recipe_list.URL }}</td>
          <td class="table-body-td">
            <div class="flex">
              <img :src="iconEye" width="20" height="20" />
              <img :src="iconTrash" width="20" height="20" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="table-body-td text-gray-500 border-t-2 border-gray-200">
      <input
        type="url"
        placeholder="Input new recipe list URL"
        class="w-full"
      />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const recipe_lists = [
      { id: 0, name: "hoge", URL: "https://example.com" },
      { id: 1, name: "fugaaa", URL: "https://example.com" },
      { id: 2, name: "momo", URL: "https://example.com" },
      { id: 3, name: "gagagagaga", URL: "https://example.com" },
    ];
    const iconEye = ref(chrome.runtime.getURL("imgs/eye.svg"));
    const iconEyeOff = ref(chrome.runtime.getURL("imgs/eye-off.svg"));
    const iconTrash = ref(chrome.runtime.getURL("imgs/trash.svg"));
    return { recipe_lists, iconEye, iconEyeOff, iconTrash };
  },
};
</script>

<style>
.table-header-th {
  @apply px-5 py-2 font-medium;
}
.table-body-td {
  @apply px-5 py-1 text-left text-base;
}
</style>
