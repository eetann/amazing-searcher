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
      <tr v-for="recipe in showRecipes" :key="recipe.id">
        <td class="truncate">{{ recipe.name }}</td>
        <td>{{ recipe.keyword }}</td>
        <td>{{ recipe.kind }}</td>
        <td class="truncate">{{ recipe.url }}</td>
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
import { ref, computed } from "vue";
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
    return { recipes, showRecipes };
  },
};
</script>
