<template>
  <div class="text-2xl text-black">Amazing Searcher Setting Page</div>
  <MyTab
    class="mt-5"
    v-for="tab in tabs"
    :key="tab.id"
    v-bind="tab"
    v-model="currentId"
  ></MyTab>
  <RecipeLists></RecipeLists>
</template>

<script>
import { ref } from "vue";
import MyTab from "@/components/MyTab.vue";
import RecipeLists from "@/components/RecipeLists.vue";
export default {
  components: {
    MyTab,
    RecipeLists,
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
