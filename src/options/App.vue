<template>
  <div class="text-base text-black">Amazing Searcher Setting Page</div>
  <MyTab
    v-for="tab in tabs"
    :key="tab.id"
    v-bind="tab"
    v-model="currentId"
  ></MyTab>
</template>

<script>
import { ref } from "vue";
import MyTab from "@/components/MyTab.vue";
export default {
  components: {
    MyTab,
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
