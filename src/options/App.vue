<template>
  <div class="m-5">
    <div class="text-2xl text-black">Amazing Searcher Setting Page</div>
    <MyTab
      class="m-5"
      v-for="tab in tabs"
      :key="tab.id"
      v-bind="tab"
      v-model="currentId"
    ></MyTab>
    <RecipeLists v-if="currentId == 0"></RecipeLists>
    <CustomRecipes v-else-if="currentId == 1"></CustomRecipes>
    <ToggleRecipes v-else-if="currentId == 2"></ToggleRecipes>
  </div>
</template>

<script>
import { ref } from "vue";
import MyTab from "@/components/MyTab.vue";
import RecipeLists from "@/components/RecipeLists.vue";
import CustomRecipes from "@/components/CustomRecipes.vue";
import ToggleRecipes from "@/components/ToggleRecipes.vue";
export default {
  components: {
    MyTab,
    RecipeLists,
    CustomRecipes,
    ToggleRecipes,
  },
  setup() {
    const currentId = ref(0);
    const tabs = ref([
      { id: 0, label: "Recipe lists" },
      { id: 1, label: "Custom recipes" },
      { id: 2, label: "Toggle recipes" },
    ]);
    return { currentId, tabs };
  },
};
</script>
